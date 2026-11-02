// Panel de administración: repo donde se guardan los JSON y config del login con GitHub
export const ADMIN_REPO = {
  owner: "argento-league",
  name: "l-argento-league-core-ui",
  branch: "main",
} as const;

// Seasons visibles en /admin (la primera es la que se abre por defecto)
export const ADMIN_SEASONS = [9, 8, 7, 6] as const;

// Solo la season en curso se puede editar; las anteriores quedan en solo lectura
export const ADMIN_EDITABLE_SEASON = 9;

export const GITHUB_CLIENT_ID: string = import.meta.env.VITE_GITHUB_CLIENT_ID ?? "";

// Netlify Function que completa el login (netlify/functions/auth-callback.mjs)
export const AUTH_CALLBACK_PATH = "/.netlify/functions/auth-callback";

export const MAX_LOGO_BYTES = 1024 * 1024;
