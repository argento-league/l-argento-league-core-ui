/**
 * Carga de datos por temporada.
 * Season 6 y Season 7 tienen sus propios JSON; así lo que se edite en S7 no altera S6.
 */

import season6Teams from "./season-6/teams.json";
import season7Teams from "./season-7/teams.json";
import season6EventoPrincipal from "./season-6/evento-principal.json";
import season7EventoPrincipal from "./season-7/evento-principal.json";
import season6Jornadas from "./season-6/jornadas.json";
import season7Jornadas from "./season-7/jornadas.json";
import season6FantasyData from "./season-6/fantasy-data.json";
import season7FantasyData from "./season-7/fantasy-data.json";
import season6FantasyMainData from "./season-6/fantasy-main-data.json";
import season7FantasyMainData from "./season-7/fantasy-main-data.json";

export type SeasonNumber = 6 | 7;

export function getSeasonTeams(season: SeasonNumber) {
  return season === 6 ? season6Teams : season7Teams;
}

export function getSeasonEventoPrincipal(season: SeasonNumber) {
  return season === 6 ? season6EventoPrincipal : season7EventoPrincipal;
}

export function getSeasonJornadas(season: SeasonNumber) {
  return season === 6 ? season6Jornadas : season7Jornadas;
}

export function getSeasonFantasyData(season: SeasonNumber) {
  return season === 6 ? season6FantasyData : season7FantasyData;
}

export function getSeasonFantasyMainData(season: SeasonNumber) {
  return season === 6 ? season6FantasyMainData : season7FantasyMainData;
}
