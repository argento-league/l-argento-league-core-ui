import { TEAM_PARTICIPANTS_LIST } from "./teamList";

type MatchType = {
  id: string;
  name: string;
  nextMatchId: string;
  nextLooserMatchId: string | undefined;
  tournamentRoundText: string;
  startTime: string;
  state: string;
  participants: (Participant | ParticipantTBD)[];
};

type Participant = {
  id: string;
  resultText: string;
  isWinner: boolean;
  status: string | null;
  name: string;
  score?: number;
};

type ParticipantTBD = {
  name: "TBD";
  status: "NO_PARTY";
};

const NO_PARTICIPANT: ParticipantTBD = {
  name: "TBD",
  status: "NO_PARTY",
};

// Upper Bracket Rounds
export const UPPER_BRACKET_ROUND_1: MatchType[] = [
  {
    id: "UB R1 M1",
    name: "Upper Bracket Round 1 - Match 1",
    nextMatchId: "UB R2 M1",
    nextLooserMatchId: "LB R2 M1",
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        score: 2,
        name: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.name,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.id,
        resultText: "DERROTA",
        isWinner: false,
        status: null,
        score: 0,
        name: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.name,
      },
    ],
  },
  {
    id: "UB R1 M2",
    name: "Upper Bracket Round 1 - Match 2",
    nextMatchId: "UB R2 M1",
    nextLooserMatchId: "LB R2 M2",
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.EFECTO_DIVINE.id,
        resultText: "DERROTA",
        isWinner: false,
        status: null,
        score: 0,
        name: TEAM_PARTICIPANTS_LIST.EFECTO_DIVINE.name,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.PLAYERS_LIBRES.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        score: 2,
        name: TEAM_PARTICIPANTS_LIST.PLAYERS_LIBRES.name,
      },
    ],
  },
  {
    id: "UB R1 M3",
    name: "Upper Bracket Round 1 - Match 3",
    nextMatchId: "UB R2 M2",
    nextLooserMatchId: "LB R2 M3",
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.HYDRA_E_SPORTS.id,
        resultText: "DERROTA",
        isWinner: false,
        status: null,
        score: 0,
        name: TEAM_PARTICIPANTS_LIST.HYDRA_E_SPORTS.name,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.FANTASMAS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        score: 2,
        name: TEAM_PARTICIPANTS_LIST.FANTASMAS.name,
      },
    ],
  },
  {
    id: "UB R1 M4",
    name: "Upper Bracket Round 1 - Match 4",
    nextMatchId: "UB R2 M2",
    nextLooserMatchId: "LB R2 M4",
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.SUSHI_BOYS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.SUSHI_BOYS.name,
        score: 2,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.LA_LAKERS.id,
        resultText: "DERROTA",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.LA_LAKERS.name,
        score: 1,
      },
    ],
  },
];

export const UPPER_BRACKET_ROUND_2: MatchType[] = [
  {
    id: "UB R2 M1",
    name: "Upper Bracket Round 2 - Match 1",
    nextMatchId: "UB R3 M1",
    nextLooserMatchId: "LB R4 M1",
    tournamentRoundText: "2",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.id,
        resultText: "DERROTA",
        isWinner: false,
        status: "DONE",
        score: 1,
        name: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.name,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.PLAYERS_LIBRES.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: "DONE",
        score: 2,
        name: TEAM_PARTICIPANTS_LIST.PLAYERS_LIBRES.name,
      },
    ],
  },
  {
    id: "UB R2 M2",
    name: "Upper Bracket Round 2 - Match 2",
    nextMatchId: "UB R3 M1",
    nextLooserMatchId: "LB R4 M2",
    tournamentRoundText: "2",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.FANTASMAS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.FANTASMAS.name,
        score: 2,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.SUSHI_BOYS.id,
        resultText: "DERROTA",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.SUSHI_BOYS.name,
        score: 0,
      },
    ],
  },
];

export const UPPER_BRACKET_FINAL: MatchType[] = [
  {
    id: "UB R3 M1",
    name: "Upper Bracket Final",
    nextMatchId: "GRAND FINAL",
    nextLooserMatchId: "LB R6 M1",
    tournamentRoundText: "3",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.PLAYERS_LIBRES.id,
        resultText: "",
        isWinner: true,
        status: "DONE",
        name: TEAM_PARTICIPANTS_LIST.PLAYERS_LIBRES.name,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.FANTASMAS.id,
        resultText: "",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.FANTASMAS.name,
      },
    ],
  },
];

export const GRAND_FINAL: MatchType[] = [
  {
    id: "GRAND FINAL",
    name: "Grand Final",
    nextMatchId: "",
    nextLooserMatchId: "",
    tournamentRoundText: "Grand Final",
    startTime: "",
    state: "DONE",
    participants: [NO_PARTICIPANT, NO_PARTICIPANT],
  },
];

// Lower Bracket Rounds
export const LOWER_BRACKET_ROUND_1: MatchType[] = [
  {
    id: "LB R1 M1",
    name: "Lower Bracket Round 1 - Match 1",
    nextMatchId: "LB R2 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.CHILDREN_OF_THE_CORN.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.CHILDREN_OF_THE_CORN.name,
        score: 2,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.WINDFURY_ENJOYERS.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.WINDFURY_ENJOYERS.name,
        score: 1,
      },
    ],
  },
  {
    id: "LB R1 M2",
    name: "Lower Bracket Round 1 - Match 2",
    nextMatchId: "LB R2 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.ALDEA_GAMING.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.ALDEA_GAMING.name,
        score: 1,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.THE_RATS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.THE_RATS.name,
        score: 2,
      },
    ],
  },
  {
    id: "LB R1 M3",
    name: "Lower Bracket Round 1 - Match 3",
    nextMatchId: "LB R2 M3",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.BRANCA_TEAM.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.BRANCA_TEAM.name,
        score: 2,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.TEAM_SERVER.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.TEAM_SERVER.name,
        score: 1,
      },
    ],
  },
  {
    id: "LB R1 M4",
    name: "Lower Bracket Round 1 - Match 4",
    nextMatchId: "LB R2 M4",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.CARPINCHOS_RAGE.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.CARPINCHOS_RAGE.name,
        score: 1,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.LA_GATONETA.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.LA_GATONETA.name,
        score: 2,
      },
    ],
  },
];

export const LOWER_BRACKET_ROUND_2: MatchType[] = [
  {
    id: "LB R2 M1",
    name: "Lower Bracket Round 2 - Match 1",
    nextMatchId: "LB R3 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.CHILDREN_OF_THE_CORN.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.CHILDREN_OF_THE_CORN.name,
        score: 0,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.name,
        score: 2,
      },
    ],
  },
  {
    id: "LB R2 M2",
    name: "Lower Bracket Round 2 - Match 2",
    nextMatchId: "LB R3 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.THE_RATS.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.THE_RATS.name,
        score: 1,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.EFECTO_DIVINE.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.EFECTO_DIVINE.name,
        score: 2,
      },
    ],
  },
  {
    id: "LB R2 M3",
    name: "Lower Bracket Round 2 - Match 3",
    nextMatchId: "LB R3 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.HYDRA_E_SPORTS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.HYDRA_E_SPORTS.name,
        score: 2,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.BRANCA_TEAM.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.BRANCA_TEAM.name,
        score: 1,
      },
    ],
  },
  {
    id: "LB R2 M4",
    name: "Lower Bracket Round 2 - Match 4",
    nextMatchId: "LB R3 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.LA_GATONETA.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: "DONE",
        name: TEAM_PARTICIPANTS_LIST.LA_GATONETA.name,
        score: 1,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.LA_LAKERS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: "DONE",
        name: TEAM_PARTICIPANTS_LIST.LA_LAKERS.name,
        score: 2,
      },
    ],
  },
];

export const LOWER_BRACKET_ROUND_3: MatchType[] = [
  {
    id: "LB R3 M1",
    name: "Lower Bracket Round 3 - Match 1",
    nextMatchId: "LB R4 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "3",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.name,
        score: 2,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.EFECTO_DIVINE.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.EFECTO_DIVINE.name,
        score: 1,
      },
    ],
  },
  {
    id: "LB R3 M2",
    name: "Lower Bracket Round 3 - Match 2",
    nextMatchId: "LB R4 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "3",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.HYDRA_E_SPORTS.id,
        resultText: "ELIMINADO",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.HYDRA_E_SPORTS.name,
        score: 1,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.LA_LAKERS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: "DONE",
        name: TEAM_PARTICIPANTS_LIST.LA_LAKERS.name,
        score: 2,
      },
    ],
  },
];

export const LOWER_BRACKET_ROUND_4: MatchType[] = [
  {
    id: "LB R4 M1",
    name: "Lower Bracket Round 4 - Match 1",
    nextMatchId: "LB R5 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "4",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.id,
        resultText: "VICTORIA",
        isWinner: true,
        status: "DONE",
        name: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.name,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.id,
        resultText: "DERROTA",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.GUERREROS_Z.name,
      },
    ],
  },
  {
    id: "LB R4 M2",
    name: "Lower Bracket Round 4 - Match 2",
    nextMatchId: "LB R5 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "4",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.SUSHI_BOYS.id,
        resultText: "",
        isWinner: true,
        status: "DONE",
        name: TEAM_PARTICIPANTS_LIST.SUSHI_BOYS.name,
      },
      {
        id: TEAM_PARTICIPANTS_LIST.LA_LAKERS.id,
        resultText: "",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS_LIST.LA_LAKERS.name,
      },
    ],
  },
];

export const LOWER_BRACKET_ROUND_5: MatchType[] = [
  {
    id: "LB R5 M1",
    name: "Lower Bracket Round 5",
    nextMatchId: "LB R6 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "5",
    startTime: "",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.id,
        resultText: "",
        isWinner: true,
        status: "DONE",
        name: TEAM_PARTICIPANTS_LIST.RAW_CHICKENS.name,
      },
      NO_PARTICIPANT,
    ],
  },
];

export const LOWER_BRACKET_FINAL: MatchType[] = [
  {
    id: "LB R6 M1",
    name: "Lower Bracket Final",
    nextMatchId: "GRAND FINAL",
    nextLooserMatchId: "",
    tournamentRoundText: "6",
    startTime: "",
    state: "DONE",
    participants: [NO_PARTICIPANT, NO_PARTICIPANT],
  },
];

export const doubleEliminationMatches = {
  upper: [
    ...UPPER_BRACKET_ROUND_1,
    ...UPPER_BRACKET_ROUND_2,
    ...UPPER_BRACKET_FINAL,
    ...GRAND_FINAL,
  ] as unknown as MatchType[],
  lower: [
    ...LOWER_BRACKET_ROUND_1,
    ...LOWER_BRACKET_ROUND_2,
    ...LOWER_BRACKET_ROUND_3,
    ...LOWER_BRACKET_ROUND_4,
    ...LOWER_BRACKET_ROUND_5,
    ...LOWER_BRACKET_FINAL,
  ] as unknown as MatchType[],
};
