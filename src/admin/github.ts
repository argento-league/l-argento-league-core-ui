import { ADMIN_REPO, AUTH_CALLBACK_PATH, GITHUB_CLIENT_ID } from "@constants/admin";

const API = "https://api.github.com";
const REPO_PATH = `/repos/${ADMIN_REPO.owner}/${ADMIN_REPO.name}`;

const TOKEN_KEY = "argento-admin-token";
const STATE_KEY = "argento-admin-login-state";

export class GitHubError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function gh<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  if (!res.ok) {
    let message = res.statusText;
    try {
      message = (await res.json()).message ?? message;
    } catch {
      // respuesta sin JSON
    }
    throw new GitHubError(message, res.status);
  }
  return res.json() as Promise<T>;
}

// ---------- Login ----------

export const isLoginConfigured = () => Boolean(GITHUB_CLIENT_ID);

/** Manda al usuario a GitHub; la Netlify Function lo devuelve a /admin#token=...&state=... */
export function startLogin() {
  const nonce = crypto.randomUUID();
  sessionStorage.setItem(STATE_KEY, nonce);
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", GITHUB_CLIENT_ID);
  url.searchParams.set("redirect_uri", `${window.location.origin}${AUTH_CALLBACK_PATH}`);
  url.searchParams.set("state", nonce);
  window.location.assign(url.toString());
}

/** Lee el resultado del login del hash de la URL (y lo borra de la barra de direcciones). */
export function consumeLoginRedirect(): { token?: string; error?: string } | null {
  const params = new URLSearchParams(window.location.hash.slice(1));
  if (!params.has("token") && !params.has("error")) return null;
  window.history.replaceState(null, "", window.location.pathname + window.location.search);

  const expected = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(STATE_KEY);
  if (!expected || params.get("state") !== expected) {
    return { error: "La respuesta del login no coincide con este navegador. Probá de nuevo." };
  }
  const error = params.get("error");
  if (error) return { error };

  const token = params.get("token") ?? "";
  sessionStorage.setItem(TOKEN_KEY, token);
  return { token };
}

export const getStoredToken = () => sessionStorage.getItem(TOKEN_KEY);
export const clearStoredToken = () => sessionStorage.removeItem(TOKEN_KEY);

// ---------- Usuario y permisos ----------

export type GitHubUser = { login: string; avatar_url: string; html_url: string };

export const getUser = (token: string) => gh<GitHubUser>(token, "/user");

/** Admin = cualquiera con permiso de escritura en el repo. */
export async function canPush(token: string) {
  const repo = await gh<{ permissions?: { push?: boolean } }>(token, REPO_PATH);
  return Boolean(repo.permissions?.push);
}

// ---------- Archivos ----------

export type RepoFile<T> = { path: string; sha: string; data: T };

const decodeBase64 = (b64: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\n/g, "")), (c) => c.charCodeAt(0)));

const encodeBase64 = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const contentsPath = (path: string, ref: string) =>
  `${REPO_PATH}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${ref}`;

export async function readJsonFile<T>(
  token: string,
  path: string,
  ref: string = ADMIN_REPO.branch
): Promise<RepoFile<T>> {
  const file = await gh<{ sha: string; content: string }>(token, contentsPath(path, ref));
  return { path, sha: file.sha, data: JSON.parse(decodeBase64(file.content)) as T };
}

export type FileChange = {
  path: string;
  /** Texto (JSON) o base64 si es binario (logos) */
  content: string;
  binary?: boolean;
  /** sha del archivo cuando se abrió; si cambió en GitHub, no se pisa */
  expectedSha?: string;
};

/**
 * Guarda todos los cambios en un único commit sobre la rama principal.
 * El commit queda a nombre del admin logueado.
 */
export async function commitFiles(token: string, message: string, changes: FileChange[]) {
  const ref = await gh<{ object: { sha: string } }>(
    token,
    `${REPO_PATH}/git/ref/heads/${ADMIN_REPO.branch}`
  );
  const head = ref.object.sha;

  for (const change of changes) {
    if (!change.expectedSha) continue;
    const current = await gh<{ sha: string }>(token, contentsPath(change.path, head));
    if (current.sha !== change.expectedSha) {
      throw new GitHubError(
        `Alguien modificó ${change.path} mientras editabas. Recargá la página antes de guardar.`,
        409
      );
    }
  }

  const headCommit = await gh<{ tree: { sha: string } }>(token, `${REPO_PATH}/git/commits/${head}`);
  const tree = await Promise.all(
    changes.map(async (change) => {
      const blob = await gh<{ sha: string }>(token, `${REPO_PATH}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({
          content: change.binary ? change.content : encodeBase64(change.content),
          encoding: "base64",
        }),
      });
      return { path: change.path, mode: "100644", type: "blob", sha: blob.sha };
    })
  );
  const newTree = await gh<{ sha: string }>(token, `${REPO_PATH}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: headCommit.tree.sha, tree }),
  });
  const commit = await gh<{ sha: string; html_url: string }>(token, `${REPO_PATH}/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }),
  });
  // Sin force: si alguien pusheó en el medio, GitHub lo rechaza en vez de pisarlo
  await gh(token, `${REPO_PATH}/git/refs/heads/${ADMIN_REPO.branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });
  return commit;
}
