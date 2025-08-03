// Tournament bracket data with organized constants for debugging

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

// PARTICIPANTS
export const PARTICIPANTS: Participant[] = [
  // Upper Bracket Teams (16 teams)
  { id: 0, tournament_id: 3, name: "Upper Team 1" },
  { id: 1, tournament_id: 3, name: "Upper Team 2" },
  { id: 2, tournament_id: 3, name: "Upper Team 3" },
  { id: 3, tournament_id: 3, name: "Upper Team 4" },
  { id: 4, tournament_id: 3, name: "Upper Team 5" },
  { id: 5, tournament_id: 3, name: "Upper Team 6" },
  { id: 6, tournament_id: 3, name: "Upper Team 7" },
  { id: 7, tournament_id: 3, name: "Upper Team 8" },
  { id: 8, tournament_id: 3, name: "Upper Team 9" },
  { id: 9, tournament_id: 3, name: "Upper Team 10" },
  { id: 10, tournament_id: 3, name: "Upper Team 11" },
  { id: 11, tournament_id: 3, name: "Upper Team 12" },
  { id: 12, tournament_id: 3, name: "Upper Team 13" },
  { id: 13, tournament_id: 3, name: "Upper Team 14" },
  { id: 14, tournament_id: 3, name: "Upper Team 15" },
  { id: 15, tournament_id: 3, name: "Upper Team 16" },

  // Lower Bracket Teams (8 teams)
  { id: 16, tournament_id: 3, name: "Lower Team 1" },
  { id: 17, tournament_id: 3, name: "Lower Team 2" },
  { id: 18, tournament_id: 3, name: "Lower Team 3" },
  { id: 19, tournament_id: 3, name: "Lower Team 4" },
  { id: 20, tournament_id: 3, name: "Lower Team 5" },
  { id: 21, tournament_id: 3, name: "Lower Team 6" },
  { id: 22, tournament_id: 3, name: "Lower Team 7" },
  { id: 23, tournament_id: 3, name: "Lower Team 8" },
];

// STAGES
export const STAGES: Stage[] = [
  {
    id: 0,
    tournament_id: 3,
    name: "Evento Principal",
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
export const GROUPS: Group[] = [
  { id: 0, stage_id: 0, number: 1 }, // Upper Bracket
  { id: 1, stage_id: 0, number: 2 }, // Lower Bracket
  { id: 2, stage_id: 0, number: 3 }, // Grand Final
];

// ROUNDS
export const ROUNDS: Round[] = [
  // Upper Bracket Rounds
  { id: 0, number: 1, stage_id: 0, group_id: 0 }, // Upper R1 (8 games)
  { id: 1, number: 2, stage_id: 0, group_id: 0 }, // Upper R2 (4 games)
  { id: 2, number: 3, stage_id: 0, group_id: 0 }, // Upper R3 (2 games)
  { id: 3, number: 4, stage_id: 0, group_id: 0 }, // Upper R4 (1 game)

  // Lower Bracket Rounds
  { id: 4, number: 1, stage_id: 0, group_id: 1 }, // Lower R1 (8 games)
  { id: 5, number: 2, stage_id: 0, group_id: 1 }, // Lower R2 (4 games)
  { id: 6, number: 3, stage_id: 0, group_id: 1 }, // Lower R3 (4 games)
  { id: 7, number: 4, stage_id: 0, group_id: 1 }, // Lower R4 (2 games)
  { id: 8, number: 5, stage_id: 0, group_id: 1 }, // Lower R5 (2 games)
  { id: 9, number: 6, stage_id: 0, group_id: 1 }, // Lower R6 (1 game)
  { id: 10, number: 7, stage_id: 0, group_id: 1 }, // Lower R7 (1 game)

  // Grand Final Rounds
  { id: 11, number: 1, stage_id: 0, group_id: 2 },
  { id: 12, number: 2, stage_id: 0, group_id: 2 },
];

// UPPER BRACKET MATCHES
export const UPPER_BRACKET_R1_MATCHES: Match[] = [
  {
    id: 0,
    number: 1,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 0, position: 1 },
    opponent2: { id: 15, position: 16 },
  },
  {
    id: 1,
    number: 2,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 7, position: 8 },
    opponent2: { id: 8, position: 9 },
  },
  {
    id: 2,
    number: 3,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 3, position: 4 },
    opponent2: { id: 12, position: 13 },
  },
  {
    id: 3,
    number: 4,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 4, position: 5 },
    opponent2: { id: 11, position: 12 },
  },
  {
    id: 4,
    number: 5,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 1, position: 2 },
    opponent2: { id: 14, position: 15 },
  },
  {
    id: 5,
    number: 6,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 6, position: 7 },
    opponent2: { id: 9, position: 10 },
  },
  {
    id: 6,
    number: 7,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 2, position: 3 },
    opponent2: { id: 13, position: 14 },
  },
  {
    id: 7,
    number: 8,
    stage_id: 0,
    group_id: 0,
    round_id: 0,
    child_count: 0,
    status: 2,
    opponent1: { id: 5, position: 6 },
    opponent2: { id: 10, position: 11 },
  },
];

export const UPPER_BRACKET_R2_MATCHES: Match[] = [
  {
    id: 8,
    number: 1,
    stage_id: 0,
    group_id: 0,
    round_id: 1,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 9,
    number: 2,
    stage_id: 0,
    group_id: 0,
    round_id: 1,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 10,
    number: 3,
    stage_id: 0,
    group_id: 0,
    round_id: 1,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 11,
    number: 4,
    stage_id: 0,
    group_id: 0,
    round_id: 1,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

export const UPPER_BRACKET_R3_MATCHES: Match[] = [
  {
    id: 12,
    number: 1,
    stage_id: 0,
    group_id: 0,
    round_id: 2,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 13,
    number: 2,
    stage_id: 0,
    group_id: 0,
    round_id: 2,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

export const UPPER_BRACKET_R4_MATCHES: Match[] = [
  {
    id: 14,
    number: 1,
    stage_id: 0,
    group_id: 0,
    round_id: 3,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

// LOWER BRACKET MATCHES
export const LOWER_BRACKET_R1_MATCHES: Match[] = [
  {
    id: 15,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: 1 },
    opponent2: { id: 2 },
  },
  {
    id: 16,
    number: 2,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: {
      id: null,
      position: "Perdedor WB R.2",
      score: 2,
      result: "win",
    },
    opponent2: { id: null, score: 0, result: "loss" },
  },
  {
    id: 17,
    number: 3,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: "Perdedor WB R.3" },
    opponent2: { id: null },
  },
  {
    id: 18,
    number: 4,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: "Perdedor WB R.4" },
    opponent2: { id: null },
  },
  {
    id: 19,
    number: 5,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: "Perdedor WB R.5" },
    opponent2: { id: null },
  },
  {
    id: 20,
    number: 6,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: "Perdedor WB R.6" },
    opponent2: { id: null },
  },
  {
    id: 21,
    number: 7,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: "Perdedor WB R.7" },
    opponent2: { id: null },
  },
  {
    id: 22,
    number: 8,
    stage_id: 0,
    group_id: 1,
    round_id: 4,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: "Perdedor WB R.8" },
    opponent2: { id: null },
  },
];

export const LOWER_BRACKET_R2_MATCHES: Match[] = [
  {
    id: 23,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 5,
    child_count: 0,
    status: 0,
    opponent1: { id: 1 },
    opponent2: { id: 2 },
  },
  {
    id: 24,
    number: 2,
    stage_id: 0,
    group_id: 1,
    round_id: 5,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 25,
    number: 3,
    stage_id: 0,
    group_id: 1,
    round_id: 5,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 26,
    number: 4,
    stage_id: 0,
    group_id: 1,
    round_id: 5,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

export const LOWER_BRACKET_R3_MATCHES: Match[] = [
  {
    id: 27,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 6,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 28,
    number: 2,
    stage_id: 0,
    group_id: 1,
    round_id: 6,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 29,
    number: 3,
    stage_id: 0,
    group_id: 1,
    round_id: 6,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 30,
    number: 4,
    stage_id: 0,
    group_id: 1,
    round_id: 6,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

export const LOWER_BRACKET_R4_MATCHES: Match[] = [
  {
    id: 31,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 7,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 32,
    number: 2,
    stage_id: 0,
    group_id: 1,
    round_id: 7,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

export const LOWER_BRACKET_R5_MATCHES: Match[] = [
  {
    id: 33,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 8,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: 2 },
    opponent2: { id: null },
  },
  {
    id: 34,
    number: 2,
    stage_id: 0,
    group_id: 1,
    round_id: 8,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: 1 },
    opponent2: { id: null },
  },
];

export const LOWER_BRACKET_R6_MATCHES: Match[] = [
  {
    id: 35,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 9,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

export const LOWER_BRACKET_R7_MATCHES: Match[] = [
  {
    id: 36,
    number: 1,
    stage_id: 0,
    group_id: 1,
    round_id: 10,
    child_count: 0,
    status: 0,
    opponent1: { id: null, position: 1 },
    opponent2: { id: null },
  },
];

// GRAND FINAL MATCHES
export const GRAND_FINAL_MATCHES: Match[] = [
  {
    id: 37,
    number: 1,
    stage_id: 0,
    group_id: 2,
    round_id: 11,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
  {
    id: 38,
    number: 1,
    stage_id: 0,
    group_id: 2,
    round_id: 12,
    child_count: 0,
    status: 0,
    opponent1: { id: null },
    opponent2: { id: null },
  },
];

// ALL MATCHES COMBINED
export const ALL_MATCHES: Match[] = [
  ...UPPER_BRACKET_R1_MATCHES,
  ...UPPER_BRACKET_R2_MATCHES,
  ...UPPER_BRACKET_R3_MATCHES,
  ...UPPER_BRACKET_R4_MATCHES,
  ...LOWER_BRACKET_R1_MATCHES,
  ...LOWER_BRACKET_R2_MATCHES,
  ...LOWER_BRACKET_R3_MATCHES,
  ...LOWER_BRACKET_R4_MATCHES,
  ...LOWER_BRACKET_R5_MATCHES,
  ...LOWER_BRACKET_R6_MATCHES,
  ...LOWER_BRACKET_R7_MATCHES,
  ...GRAND_FINAL_MATCHES,
];

// TOURNAMENT DATA OBJECT (compatible with brackets-viewer)
export const TOURNAMENT_DATA = {
  participant: PARTICIPANTS,
  stage: STAGES,
  group: GROUPS,
  round: ROUNDS,
  match: ALL_MATCHES,
  match_game: [],
};

// DEBUGGING HELPERS
export const BRACKET_STRUCTURE = {
  upperBracket: {
    round1: { games: 8, matches: UPPER_BRACKET_R1_MATCHES },
    round2: { games: 4, matches: UPPER_BRACKET_R2_MATCHES },
    round3: { games: 2, matches: UPPER_BRACKET_R3_MATCHES },
    round4: { games: 1, matches: UPPER_BRACKET_R4_MATCHES },
  },
  lowerBracket: {
    round1: { games: 8, matches: LOWER_BRACKET_R1_MATCHES }, // Initial lower bracket teams
    round2: { games: 4, matches: LOWER_BRACKET_R2_MATCHES }, // vs Upper R1 losers
    round3: { games: 4, matches: LOWER_BRACKET_R3_MATCHES }, // vs Upper R2 losers
    round4: { games: 2, matches: LOWER_BRACKET_R4_MATCHES }, // vs Upper R3 losers
    round5: { games: 2, matches: LOWER_BRACKET_R5_MATCHES }, // vs Upper R4 loser
    round6: { games: 1, matches: LOWER_BRACKET_R6_MATCHES }, // Lower bracket semi
    round7: { games: 1, matches: LOWER_BRACKET_R7_MATCHES }, // Lower bracket final
  },
  grandFinal: {
    matches: GRAND_FINAL_MATCHES,
  },
};

export default TOURNAMENT_DATA;
