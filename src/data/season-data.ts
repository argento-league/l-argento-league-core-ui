/**
 * Carga de datos por temporada.
 * Season 6, 7, 8 y 9 tienen sus propios JSON; editar una no altera las otras.
 */

import season6Teams from "./season-6/teams.json";
import season7Teams from "./season-7/teams.json";
import season8Teams from "./season-8/teams.json";
import season9Teams from "./season-9/teams.json";
import season6EventoPrincipal from "./season-6/evento-principal.json";
import season7EventoPrincipal from "./season-7/evento-principal.json";
import season8EventoPrincipal from "./season-8/evento-principal.json";
import season9EventoPrincipal from "./season-9/evento-principal.json";
import season6Jornadas from "./season-6/jornadas.json";
import season7Jornadas from "./season-7/jornadas.json";
import season8Jornadas from "./season-8/jornadas.json";
import season9Jornadas from "./season-9/jornadas.json";
import season6FantasyData from "./season-6/fantasy-data.json";
import season7FantasyData from "./season-7/fantasy-data.json";
import season8FantasyData from "./season-8/fantasy-data.json";
import season9FantasyData from "./season-9/fantasy-data.json";
import season6FantasyMainData from "./season-6/fantasy-main-data.json";
import season7FantasyMainData from "./season-7/fantasy-main-data.json";
import season8FantasyMainData from "./season-8/fantasy-main-data.json";
import season9FantasyMainData from "./season-9/fantasy-main-data.json";

export type SeasonNumber = 6 | 7 | 8 | 9;

export function getSeasonTeams(season: SeasonNumber) {
  if (season === 6) return season6Teams;
  if (season === 7) return season7Teams;
  if (season === 8) return season8Teams;
  return season9Teams;
}

/** Evento Principal por temporada */
export function getSeasonEventoPrincipal(season: SeasonNumber) {
  if (season === 6) return season6EventoPrincipal;
  if (season === 7) return season7EventoPrincipal;
  if (season === 8) return season8EventoPrincipal;
  return season9EventoPrincipal;
}

export function getSeasonJornadas(season: SeasonNumber) {
  if (season === 6) return season6Jornadas;
  if (season === 7) return season7Jornadas;
  if (season === 8) return season8Jornadas;
  return season9Jornadas;
}

export function getSeasonFantasyData(season: SeasonNumber) {
  if (season === 6) return season6FantasyData;
  if (season === 7) return season7FantasyData;
  if (season === 8) return season8FantasyData;
  return season9FantasyData;
}

export function getSeasonFantasyMainData(season: SeasonNumber) {
  if (season === 6) return season6FantasyMainData;
  if (season === 7) return season7FantasyMainData;
  if (season === 8) return season8FantasyMainData;
  return season9FantasyMainData;
}
