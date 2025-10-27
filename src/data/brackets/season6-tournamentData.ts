// Season 6 Tournament bracket data
// Based on current Season 6 teams from teams.json

export interface Participant {
  id: number;
  tournament_id: number;
  name: string;
}

export interface Stage {
  id: number;
  tournament_id: number;
  name: string;
  type: string;
  number: number;
  settings: {
    size: number;
    grandFinal: string;
    matchesChildCount: number;
    seedOrdering: string[];
  };
}

export interface Group {
  id: number;
  stage_id: number;
  number: number;
}

export interface Round {
  id: number;
  number: number;
  stage_id: number;
  group_id: number;
}

export interface Match {
  id: number;
  number: number;
  stage_id: number;
  group_id: number;
  round_id: number;
  child_count: number;
  status: number;
  opponent1: {
    id: number | null;
    position?: number | string;
    score?: number;
    result?: "win" | "loss";
  };
  opponent2: {
    id: number | null;
    position?: number | string;
    score?: number;
    result?: "win" | "loss";
  };
}

// SEASON 6 PARTICIPANTS (24 teams)
export const SEASON6_PARTICIPANTS: Participant[] = [
  // Upper Bracket Teams (16 teams) - Top teams from groups
  { id: 0, tournament_id: 6, name: "Las divinas" },
  { id: 1, tournament_id: 6, name: "The Royals" },
  { id: 2, tournament_id: 6, name: "La Manada" },
  { id: 3, tournament_id: 6, name: "Team Mafia" },
  { id: 4, tournament_id: 6, name: "Epicenter" },
  { id: 5, tournament_id: 6, name: "Ravage Gaming" },
  { id: 6, tournament_id: 6, name: "THE RATS" },
  { id: 7, tournament_id: 6, name: "Miro TikTok y Webeo" },
  { id: 8, tournament_id: 6, name: "Las Joyas del Abuelo" },
  { id: 9, tournament_id: 6, name: "The Real Server" },
  { id: 10, tournament_id: 6, name: "Ezio Doggies" },
  { id: 11, tournament_id: 6, name: "La guardería de sgg" },
  { id: 12, tournament_id: 6, name: "TEAM HORROR FOX" },
  { id: 13, tournament_id: 6, name: "Brasil Prime" },
  { id: 14, tournament_id: 6, name: "Los Chinwenwenchas" },
  { id: 15, tournament_id: 6, name: "Falta Envido" },

  // Lower Bracket Teams (8 teams) - Remaining teams
  { id: 16, tournament_id: 6, name: "La Plaga" },
  { id: 17, tournament_id: 6, name: "Veritas Gaming" },
  { id: 18, tournament_id: 6, name: "Lemuria" },
  { id: 19, tournament_id: 6, name: "La falopa de Ehkar" },
  { id: 20, tournament_id: 6, name: "Team Mafia" },
  { id: 21, tournament_id: 6, name: "THE RATS" },
  { id: 22, tournament_id: 6, name: "Ravage Gaming" },
  { id: 23, tournament_id: 6, name: "Ezio Doggies" },
];

// STAGES
export const SEASON6_STAGES: Stage[] = [
  {
    id: 0,
    tournament_id: 6,
    name: "Evento Principal Season 6",
    type: "double_elimination",
    number: 1,
    settings: {
      size: 16,
      grandFinal: "double",
      matchesChildCount: 0,
      seedOrdering: ["inner_outer", "natural", "reverse_half_shift", "reverse"],
    },
  },
];

// GROUPS
export const SEASON6_GROUPS: Group[] = [
  { id: 0, stage_id: 0, number: 1 }, // Upper Bracket
  { id: 1, stage_id: 0, number: 2 }, // Lower Bracket
  { id: 2, stage_id: 0, number: 3 }, // Grand Final
];

// ROUNDS
export const SEASON6_ROUNDS: Round[] = [
  // Upper Bracket Rounds - Only 3 rounds for 8 teams (4->2->1)
  { id: 0, number: 1, stage_id: 0, group_id: 0 }, // Upper R1 (4 games)
  { id: 1, number: 2, stage_id: 0, group_id: 0 }, // Upper R2 (2 games)
  { id: 2, number: 3, stage_id: 0, group_id: 0 }, // Upper R3 (1 game) - Final

  // Lower Bracket Rounds
  { id: 3, number: 1, stage_id: 0, group_id: 1 }, // Lower R1 (4 games)
  { id: 4, number: 2, stage_id: 0, group_id: 1 }, // Lower R2 (4 games)
  { id: 5, number: 3, stage_id: 0, group_id: 1 }, // Lower R3 (2 games)
  { id: 6, number: 4, stage_id: 0, group_id: 1 }, // Lower R4 (2 games)
  { id: 7, number: 5, stage_id: 0, group_id: 1 }, // Lower R5 (1 game)
  { id: 8, number: 6, stage_id: 0, group_id: 1 }, // Lower R6 (1 game)
  { id: 9, number: 7, stage_id: 0, group_id: 1 }, // Lower R7 (1 game) - Final

  // Grand Final Rounds
  { id: 10, number: 1, stage_id: 0, group_id: 2 },
  { id: 11, number: 2, stage_id: 0, group_id: 2 },
];

// UPPER BRACKET MATCHES - Season 6
export const SEASON6_UPPER_BRACKET_R1_MATCHES: Match[] = [
  {
    id: 0,
    number: 1,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0, // Not started
    opponent1: { id: 0 }, // Las divinas
    opponent2: { id: 1 }, // The Royals
  },
  {
    id: 1,
    number: 2,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0,
    opponent1: { id: 2 }, // La Manada
    opponent2: { id: 3 }, // Team Mafia
  },
  {
    id: 2,
    number: 3,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0,
    opponent1: { id: 4 }, // Epicenter
    opponent2: { id: 5 }, // Ravage Gaming
  },
  {
    id: 3,
    number: 4,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0,
    opponent1: { id: 6 }, // THE RATS
    opponent2: { id: 7 }, // Miro TikTok y Webeo
  },
  {
    id: 4,
    number: 5,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0,
    opponent1: { id: 8 }, // Las Joyas del Abuelo
    opponent2: { id: 9 }, // The Real Server
  },
  {
    id: 5,
    number: 6,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0,
    opponent1: { id: 10 }, // Ezio Doggies
    opponent2: { id: 11 }, // La guardería de sgg
  },
  {
    id: 6,
    number: 7,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0,
    opponent1: { id: 12 }, // TEAM HORROR FOX
    opponent2: { id: 13 }, // Brasil Prime
  },
  {
    id: 7,
    number: 8,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 0,
    opponent1: { id: 14 }, // Los Chinwenwenchas
    opponent2: { id: 15 }, // Falta Envido
  },
];

// Additional rounds will be added as tournament progresses
export const SEASON6_UPPER_BRACKET_R2_MATCHES: Match[] = [];
export const SEASON6_UPPER_BRACKET_R3_MATCHES: Match[] = [];
export const SEASON6_UPPER_BRACKET_R4_MATCHES: Match[] = [];

// LOWER BRACKET MATCHES - Season 6
export const SEASON6_LOWER_BRACKET_R1_MATCHES: Match[] = [
  {
    id: 15,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 16 }, // La Plaga
    opponent2: { id: null }, // TBD
  },
  {
    id: 16,
    number: 2,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 17 }, // Veritas Gaming
    opponent2: { id: null }, // TBD
  },
  {
    id: 17,
    number: 3,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 18 }, // Lemuria
    opponent2: { id: null }, // TBD
  },
  {
    id: 18,
    number: 4,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 19 }, // La falopa de Ehkar
    opponent2: { id: null }, // TBD
  },
  {
    id: 19,
    number: 5,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 20 }, // Team Mafia
    opponent2: { id: null }, // TBD
  },
  {
    id: 20,
    number: 6,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 21 }, // THE RATS
    opponent2: { id: null }, // TBD
  },
  {
    id: 21,
    number: 7,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 22 }, // Ravage Gaming
    opponent2: { id: null }, // TBD
  },
  {
    id: 22,
    number: 8,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 23 }, // Ezio Doggies
    opponent2: { id: null }, // TBD
  },
];

// Additional lower bracket rounds
export const SEASON6_LOWER_BRACKET_R2_MATCHES: Match[] = [];
export const SEASON6_LOWER_BRACKET_R3_MATCHES: Match[] = [];
export const SEASON6_LOWER_BRACKET_R4_MATCHES: Match[] = [];
export const SEASON6_LOWER_BRACKET_R5_MATCHES: Match[] = [];
export const SEASON6_LOWER_BRACKET_R6_MATCHES: Match[] = [];
export const SEASON6_LOWER_BRACKET_R7_MATCHES: Match[] = [];

// GRAND FINAL MATCHES - Season 6
export const SEASON6_GRAND_FINAL_MATCHES: Match[] = [
  {
    id: 37,
    number: 1,
    stage_id: 0,
    group_id: 2,
    round_id: 11,
    child_count: 0,
    status: 0,
    opponent1: { id: null }, // TBD
    opponent2: { id: null }, // TBD
  },
];

// ALL MATCHES COMBINED - Season 6
export const SEASON6_ALL_MATCHES: Match[] = [
  ...SEASON6_UPPER_BRACKET_R1_MATCHES,
  ...SEASON6_UPPER_BRACKET_R2_MATCHES,
  ...SEASON6_UPPER_BRACKET_R3_MATCHES,
  ...SEASON6_UPPER_BRACKET_R4_MATCHES,
  ...SEASON6_LOWER_BRACKET_R1_MATCHES,
  ...SEASON6_LOWER_BRACKET_R2_MATCHES,
  ...SEASON6_LOWER_BRACKET_R3_MATCHES,
  ...SEASON6_LOWER_BRACKET_R4_MATCHES,
  ...SEASON6_LOWER_BRACKET_R5_MATCHES,
  ...SEASON6_LOWER_BRACKET_R6_MATCHES,
  ...SEASON6_LOWER_BRACKET_R7_MATCHES,
  ...SEASON6_GRAND_FINAL_MATCHES,
];

// TOURNAMENT DATA OBJECT (compatible with brackets-viewer) - Season 6
export const SEASON6_TOURNAMENT_DATA = {
  participant: SEASON6_PARTICIPANTS,
  stage: SEASON6_STAGES,
  group: SEASON6_GROUPS,
  round: SEASON6_ROUNDS,
  match: SEASON6_ALL_MATCHES,
  match_game: [],
};

export default SEASON6_TOURNAMENT_DATA;
