/**
 * Login con GitHub para el panel /admin.
 *
 * GitHub redirige acá con ?code=...&state=... La función cambia el code por un token
 * (para eso necesita el client secret, que no puede estar en el navegador) y devuelve
 * al usuario a /admin#token=...&state=... en el mismo sitio.
 *
 * Variables de entorno (Netlify → Site configuration → Environment variables):
 *   VITE_GITHUB_CLIENT_ID  -> Client ID de la GitHub App (también lo usa la web)
 *   GITHUB_CLIENT_SECRET   -> Client secret de la GitHub App
 */
export default async (request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const params = new URLSearchParams({ state: url.searchParams.get("state") ?? "" });

  if (!code) {
    params.set("error", url.searchParams.get("error_description") ?? "Login cancelado");
  } else {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.VITE_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const data = await res.json();
    if (data.access_token) {
      params.set("token", data.access_token);
    } else {
      params.set("error", data.error_description ?? data.error ?? "No se pudo completar el login");
    }
  }

  // Siempre vuelve al mismo sitio que recibió el callback (prod, deploy preview o netlify dev)
  const back = new URL("/admin", url.origin);
  back.hash = params.toString();
  return Response.redirect(back.toString(), 302);
};
