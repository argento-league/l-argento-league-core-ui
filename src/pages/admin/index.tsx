import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ADMIN_EDITABLE_SEASON, ADMIN_SEASONS } from "@constants/admin";
import { CURRENT_SEASON_COLORS } from "@constants/season-colors";
import type { TeamJsonType } from "../../types/teams";
import type { EventoPrincipalData, JornadasData, Match } from "../../admin/types";
import { formatJson } from "../../admin/formatJson";
import {
  canPush,
  clearStoredToken,
  commitFiles,
  consumeLoginRedirect,
  getStoredToken,
  getUser,
  GitHubError,
  isLoginConfigured,
  readJsonFile,
  startLogin,
  type FileChange,
  type GitHubUser,
  type RepoFile,
} from "../../admin/github";
import { TeamsEditor } from "@components/admin/TeamsEditor";
import { JornadasEditor } from "@components/admin/JornadasEditor";
import { MainEventEditor } from "@components/admin/MainEventEditor";
import { Button, GhostButton, Hint, Panel, Select } from "@components/admin/styles";

type Tab = "equipos" | "jornadas" | "evento";
const TABS: { id: Tab; label: string }[] = [
  { id: "equipos", label: "Equipos" },
  { id: "jornadas", label: "Jornadas y resultados" },
  { id: "evento", label: "Evento principal" },
];

const seasonPaths = (season: number) => ({
  teams: `src/data/season-${season}/teams.json`,
  jornadas: `src/data/season-${season}/jornadas.json`,
  evento: `src/data/season-${season}/evento-principal.json`,
  logos: `public/images/teams/season-${season}`,
});

export const AdminPage = () => {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [loginError, setLoginError] = useState<string | null>(null);
  const consumed = useRef(false);

  useEffect(() => {
    if (consumed.current) return;
    consumed.current = true;
    const result = consumeLoginRedirect();
    if (result?.token) setToken(result.token);
    if (result?.error) setLoginError(result.error);
  }, []);

  const logout = useCallback(() => {
    clearStoredToken();
    setToken(null);
  }, []);

  return (
    <Page style={{ "--season-primary": CURRENT_SEASON_COLORS.primary } as React.CSSProperties}>
      {token ? <AdminSession token={token} onLogout={logout} /> : <LoginScreen error={loginError} />}
    </Page>
  );
};

const LoginScreen = ({ error }: { error: string | null }) => (
  <Centered>
    <Panel style={{ maxWidth: 420, textAlign: "center" }}>
      <h1 style={{ marginTop: 0 }}>Panel de administración</h1>
      {isLoginConfigured() ? (
        <>
          <Hint style={{ marginBottom: 16 }}>
            Entrá con tu cuenta de GitHub. Pueden editar los que tienen permiso de escritura en el repo.
          </Hint>
          <Button type="button" onClick={startLogin}>
            Entrar con GitHub
          </Button>
        </>
      ) : (
        <Hint>
          Falta configurar el login: definí VITE_GITHUB_CLIENT_ID (y GITHUB_CLIENT_SECRET para la Netlify Function).
        </Hint>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </Panel>
  </Centered>
);

type SessionState =
  | { status: "loading" }
  | { status: "denied"; user: GitHubUser }
  | { status: "ready"; user: GitHubUser }
  | { status: "error"; message: string };

const AdminSession = ({ token, onLogout }: { token: string; onLogout: () => void }) => {
  const [session, setSession] = useState<SessionState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    Promise.all([getUser(token), canPush(token)])
      .then(([user, allowed]) => {
        if (!cancelled) setSession(allowed ? { status: "ready", user } : { status: "denied", user });
      })
      .catch((err) => {
        if (cancelled) return;
        // Token vencido o revocado: volver al login
        if (err instanceof GitHubError && err.status === 401) return onLogout();
        setSession({ status: "error", message: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [token, onLogout]);

  if (session.status === "loading") return <Centered>Verificando permisos…</Centered>;
  if (session.status === "error") return <Centered><ErrorText>{session.message}</ErrorText></Centered>;
  if (session.status === "denied") {
    return (
      <Centered>
        <Panel style={{ maxWidth: 420, textAlign: "center" }}>
          <p>
            <strong>@{session.user.login}</strong> no tiene permiso de escritura en el repo. Pedile a un admin
            que te agregue como colaborador.
          </p>
          <GhostButton type="button" onClick={onLogout}>
            Salir
          </GhostButton>
        </Panel>
      </Centered>
    );
  }
  return <SeasonAdmin token={token} user={session.user} onLogout={onLogout} />;
};

type Loaded = {
  teams: RepoFile<TeamJsonType>;
  jornadas: RepoFile<JornadasData>;
  evento: RepoFile<EventoPrincipalData>;
};

/** Reemplaza nombres de equipo renombrados en todos los partidos */
const renameInMatches = <T,>(data: T, renames: Map<string, string>): T => {
  if (renames.size === 0) return data;
  const rename = (m: Match) => ({
    ...m,
    team1: renames.get(m.team1) ?? m.team1,
    team2: renames.get(m.team2) ?? m.team2,
  });
  const walk = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === "object") {
      if ("team1" in value && "team2" in value) return rename(value as Match);
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, walk(v)]));
    }
    return value;
  };
  return walk(data) as T;
};

const SeasonAdmin = ({ token, user, onLogout }: { token: string; user: GitHubUser; onLogout: () => void }) => {
  const [season, setSeason] = useState<number>(ADMIN_SEASONS[0]);
  const [tab, setTab] = useState<Tab>("equipos");
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [teams, setTeams] = useState<TeamJsonType>({});
  const [jornadas, setJornadas] = useState<JornadasData>({});
  const [evento, setEvento] = useState<EventoPrincipalData | null>(null);
  const [pendingLogos, setPendingLogos] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<{ ok: boolean; message: string; url?: string } | null>(null);

  const load = useCallback(
    async (ref?: string) => {
      setLoadError(null);
      const paths = seasonPaths(season);
      try {
        const [t, j, e] = await Promise.all([
          readJsonFile<TeamJsonType>(token, paths.teams, ref),
          readJsonFile<JornadasData>(token, paths.jornadas, ref),
          readJsonFile<EventoPrincipalData>(token, paths.evento, ref),
        ]);
        setLoaded({ teams: t, jornadas: j, evento: e });
        setTeams(t.data);
        setJornadas(j.data);
        setEvento(e.data);
        setPendingLogos({});
      } catch (err) {
        setLoadError((err as Error).message);
      }
    },
    [season, token]
  );

  useEffect(() => {
    setLoaded(null);
    setSaveResult(null);
    load();
  }, [load]);

  const changedFiles = (): FileChange[] => {
    if (!loaded || !evento) return [];
    const paths = seasonPaths(season);

    // Si se renombró un equipo, se actualiza también en jornadas y evento principal
    const renames = new Map<string, string>();
    Object.entries(loaded.teams.data).forEach(([key, original]) => {
      const edited = teams[key];
      if (edited && edited.name !== original.name) renames.set(original.name, edited.name);
    });

    const candidates: [RepoFile<unknown>, unknown][] = [
      [loaded.teams, teams],
      [loaded.jornadas, renameInMatches(jornadas, renames)],
      [loaded.evento, renameInMatches(evento, renames)],
    ];
    const jsonChanges = candidates
      .filter(([file, data]) => formatJson(file.data) !== formatJson(data))
      .map(([file, data]) => ({ path: file.path, content: formatJson(data), expectedSha: file.sha }));

    const usedLogos = new Set(Object.values(teams).map((t) => t.logo));
    const logoChanges = Object.entries(pendingLogos)
      .filter(([fileName]) => usedLogos.has(fileName))
      .map(([fileName, dataUrl]) => ({
        path: `${paths.logos}/${fileName}`,
        content: dataUrl.split(",")[1],
        binary: true,
      }));

    return [...jsonChanges, ...logoChanges];
  };

  const changes = changedFiles();
  const isDirty = changes.length > 0;

  useEffect(() => {
    if (!isDirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  const save = async () => {
    setSaving(true);
    setSaveResult(null);
    const what = changes.map((c) => c.path.split("/").pop()).join(", ");
    try {
      const commit = await commitFiles(token, `Admin: actualiza season ${season} (${what})`, changes);
      await load(commit.sha);
      setSaveResult({
        ok: true,
        message: "Guardado. La web se actualiza sola en un par de minutos, cuando termine el deploy.",
        url: commit.html_url,
      });
    } catch (err) {
      if (err instanceof GitHubError && err.status === 401) return onLogout();
      setSaveResult({ ok: false, message: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    if (!loaded || !window.confirm("¿Descartar todos los cambios sin guardar?")) return;
    setTeams(loaded.teams.data);
    setJornadas(loaded.jornadas.data);
    setEvento(loaded.evento.data);
    setPendingLogos({});
  };

  const changeSeason = (next: number) => {
    if (isDirty && !window.confirm("Tenés cambios sin guardar. ¿Cambiar de season igual?")) return;
    setSeason(next);
  };

  const teamNames = Object.values(teams).map((t) => t.name).filter(Boolean);
  const readOnly = season !== ADMIN_EDITABLE_SEASON;

  return (
    <>
      <Header>
        <h1>Admin</h1>
        <Select value={season} onChange={(e) => changeSeason(Number(e.target.value))} aria-label="Season">
          {ADMIN_SEASONS.map((s) => (
            <option key={s} value={s}>
              Season {s}
              {s !== ADMIN_EDITABLE_SEASON ? " (solo lectura)" : ""}
            </option>
          ))}
        </Select>
        <UserBox>
          <img src={user.avatar_url} alt="" />
          <span>@{user.login}</span>
          <GhostButton type="button" onClick={onLogout}>
            Salir
          </GhostButton>
        </UserBox>
      </Header>

      <Tabs role="tablist">
        {TABS.map((t) => (
          <TabButton
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "active" : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </TabButton>
        ))}
      </Tabs>

      {loadError && (
        <Panel>
          <ErrorText>No se pudieron cargar los datos de la season {season}: {loadError}</ErrorText>
        </Panel>
      )}
      {!loaded && !loadError && <Hint>Cargando datos desde GitHub…</Hint>}

      {loaded && evento && (
        <>
          {readOnly && (
            <ReadOnlyBanner>
              Season {season} finalizada: se puede ver pero no editar.
            </ReadOnlyBanner>
          )}
          {tab === "equipos" && (
            <TeamsEditor
              season={season}
              teams={teams}
              readOnly={readOnly}
              pendingLogos={pendingLogos}
              onChange={setTeams}
              onLogoUpload={(fileName, dataUrl) => setPendingLogos((prev) => ({ ...prev, [fileName]: dataUrl }))}
            />
          )}
          {tab === "jornadas" && (
            <JornadasEditor jornadas={jornadas} teamNames={teamNames} readOnly={readOnly} onChange={setJornadas} />
          )}
          {tab === "evento" && (
            <MainEventEditor evento={evento} teamNames={teamNames} readOnly={readOnly} onChange={setEvento} />
          )}

          {!readOnly && (
          <SaveBar>
            <div>
              {isDirty ? (
                <span>
                  Cambios sin guardar en: <strong>{changes.map((c) => c.path.split("/").pop()).join(", ")}</strong>
                </span>
              ) : (
                <Hint>Sin cambios.</Hint>
              )}
              {saveResult && (
                <SaveMessage className={saveResult.ok ? "ok" : "error"}>
                  {saveResult.message}{" "}
                  {saveResult.url && (
                    <a href={saveResult.url} target="_blank" rel="noreferrer">
                      Ver commit
                    </a>
                  )}
                </SaveMessage>
              )}
            </div>
            <SaveActions>
              <GhostButton type="button" onClick={discard} disabled={!isDirty || saving}>
                Descartar
              </GhostButton>
              <Button type="button" onClick={save} disabled={!isDirty || saving}>
                {saving ? "Guardando…" : "Guardar cambios"}
              </Button>
            </SaveActions>
          </SaveBar>
          )}
        </>
      )}
    </>
  );
};

const Page = styled.main`
  color: white;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 120px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  h1 {
    margin: 0;
    font-size: 28px;
  }
`;

const UserBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  overflow-x: auto;
`;

const TabButton = styled.button`
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 14px;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;

  &.active {
    color: white;
    border-bottom-color: var(--season-primary, #ff8a3d);
  }
`;

const SaveBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px max(16px, calc((100vw - 1100px) / 2 + 16px));
  background: rgba(10, 10, 10, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 14px;
`;

const SaveActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SaveMessage = styled.div`
  margin-top: 4px;

  &.ok {
    color: #6be38b;
  }

  &.error {
    color: #ff6b6b;
  }

  a {
    color: inherit;
  }
`;

const ReadOnlyBanner = styled.div`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`;

const ErrorText = styled.p`
  color: #ff6b6b;
  margin: 12px 0 0;
`;
