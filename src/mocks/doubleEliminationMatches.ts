import { TEAM_PARTICIPANTS } from "../pages/teams";

type MatchType = {
  id: string;
  name: string;
  nextMatchId: string;
  nextLooserMatchId: string | undefined;
  tournamentRoundText: string;
  startTime: string;
  state: string;
  participants: {
    id: string;
    resultText: string;
    isWinner: boolean;
    status: null;
    name: string;
  }[];
};

// Upper Bracket Rounds
const UPPER_BRACKET_ROUND_1: MatchType[] = [
  {
    id: "UB R1 M1",
    name: "Upper Bracket Round 1 - Match 1",
    nextMatchId: "UB R2 M1",
    nextLooserMatchId: "LB R2 M1",
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_1.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_1.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_2.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_2.name,
      },
    ],
  },
  {
    id: "UB R1 M2",
    name: "Upper Bracket Round 1 - Match 2",
    nextMatchId: "UB R2 M1",
    nextLooserMatchId: "LB R2 M2",
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_3.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_3.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_4.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_4.name,
      },
    ],
  },
  {
    id: "UB R1 M3",
    name: "Upper Bracket Round 1 - Match 3",
    nextMatchId: "UB R2 M2",
    nextLooserMatchId: "LB R2 M3",
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_5.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_5.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_6.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_6.name,
      },
    ],
  },
  {
    id: "UB R1 M4",
    name: "Upper Bracket Round 1 - Match 4",
    nextMatchId: "UB R2 M2",
    nextLooserMatchId: "LB R2 M4",
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_7.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_7.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_8.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_8.name,
      },
    ],
  },
];

const UPPER_BRACKET_ROUND_2: MatchType[] = [
  {
    id: "UB R2 M1",
    name: "Upper Bracket Round 2 - Match 1",
    nextMatchId: "UB R3 M1",
    nextLooserMatchId: "LB R4 M1",
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_1.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_1.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_3.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_3.name,
      },
    ],
  },
  {
    id: "UB R2 M2",
    name: "Upper Bracket Round 2 - Match 2",
    nextMatchId: "UB R3 M1",
    nextLooserMatchId: "LB R4 M2",
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_5.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_5.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_7.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_7.name,
      },
    ],
  },
];

const UPPER_BRACKET_FINAL: MatchType[] = [
  {
    id: "UB R3 M1",
    name: "Upper Bracket Final",
    nextMatchId: "GRAND FINAL",
    nextLooserMatchId: "LB R6 M1",
    tournamentRoundText: "3",
    startTime: "2021-06-01",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_1.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_1.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_5.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_5.name,
      },
    ],
  },
];

const GRAND_FINAL: MatchType[] = [
  {
    id: "GRAND FINAL",
    name: "Grand Final",
    nextMatchId: "",
    nextLooserMatchId: "",
    tournamentRoundText: "Grand Final",
    startTime: "2021-06-02",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_1.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_1.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_9.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_9.name,
      },
    ],
  },
];

// Lower Bracket Rounds
const LOWER_BRACKET_ROUND_1: MatchType[] = [
  {
    id: "LB R1 M1",
    name: "Lower Bracket Round 1 - Match 1",
    nextMatchId: "LB R2 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_9.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_9.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_10.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_10.name,
      },
    ],
  },
  {
    id: "LB R1 M2",
    name: "Lower Bracket Round 1 - Match 2",
    nextMatchId: "LB R2 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_11.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_11.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_12.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_12.name,
      },
    ],
  },
  {
    id: "LB R1 M3",
    name: "Lower Bracket Round 1 - Match 3",
    nextMatchId: "LB R2 M3",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_13.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_13.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_14.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_14.name,
      },
    ],
  },
  {
    id: "LB R1 M4",
    name: "Lower Bracket Round 1 - Match 4",
    nextMatchId: "LB R2 M4",
    nextLooserMatchId: undefined,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_15.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_15.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_16.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_16.name,
      },
    ],
  },
];

const LOWER_BRACKET_ROUND_2: MatchType[] = [
  {
    id: "LB R2 M1",
    name: "Lower Bracket Round 2 - Match 1",
    nextMatchId: "LB R3 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_9.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_9.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_2.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_2.name,
      },
    ],
  },
  {
    id: "LB R2 M2",
    name: "Lower Bracket Round 2 - Match 2",
    nextMatchId: "LB R3 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_11.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_11.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_4.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_4.name,
      },
    ],
  },
  {
    id: "LB R2 M3",
    name: "Lower Bracket Round 2 - Match 3",
    nextMatchId: "LB R3 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_13.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_13.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_6.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_6.name,
      },
    ],
  },
  {
    id: "LB R2 M4",
    name: "Lower Bracket Round 2 - Match 4",
    nextMatchId: "LB R3 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_15.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_15.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_8.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_8.name,
      },
    ],
  },
];

const LOWER_BRACKET_ROUND_3: MatchType[] = [
  {
    id: "LB R3 M1",
    name: "Lower Bracket Round 3 - Match 1",
    nextMatchId: "LB R4 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "3",
    startTime: "2021-06-01",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_9.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_9.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_11.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_11.name,
      },
    ],
  },
  {
    id: "LB R3 M2",
    name: "Lower Bracket Round 3 - Match 2",
    nextMatchId: "LB R4 M2",
    nextLooserMatchId: undefined,
    tournamentRoundText: "3",
    startTime: "2021-06-01",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_13.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_13.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_15.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_15.name,
      },
    ],
  },
];

const LOWER_BRACKET_ROUND_4: MatchType[] = [
  {
    id: "LB R4 M1",
    name: "Lower Bracket Round 4 - Match 1",
    nextMatchId: "LB R5 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "4",
    startTime: "2021-06-01",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_9.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_9.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_3.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_3.name,
      },
    ],
  },
  {
    id: "LB R4 M2",
    name: "Lower Bracket Round 4 - Match 2",
    nextMatchId: "LB R5 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "4",
    startTime: "2021-06-01",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_13.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_13.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_7.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_7.name,
      },
    ],
  },
];

const LOWER_BRACKET_ROUND_5: MatchType[] = [
  {
    id: "LB R5 M1",
    name: "Lower Bracket Round 5",
    nextMatchId: "LB R6 M1",
    nextLooserMatchId: undefined,
    tournamentRoundText: "5",
    startTime: "2021-06-02",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_9.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_9.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_13.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_13.name,
      },
    ],
  },
];

const LOWER_BRACKET_FINAL: MatchType[] = [
  {
    id: "LB R6 M1",
    name: "Lower Bracket Final",
    nextMatchId: "GRAND FINAL",
    nextLooserMatchId: "",
    tournamentRoundText: "6",
    startTime: "2021-06-02",
    state: "DONE",
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_9.id,
        resultText: "WON",
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_9.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_5.id,
        resultText: "LOST",
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_5.name,
      },
    ],
  },
];

export const doubleEliminationMatches = {
  upper: [
    ...UPPER_BRACKET_ROUND_1,
    ...UPPER_BRACKET_ROUND_2,
    ...UPPER_BRACKET_FINAL,
    ...GRAND_FINAL,
  ],
  lower: [
    ...LOWER_BRACKET_ROUND_1,
    ...LOWER_BRACKET_ROUND_2,
    ...LOWER_BRACKET_ROUND_3,
    ...LOWER_BRACKET_ROUND_4,
    ...LOWER_BRACKET_ROUND_5,
    ...LOWER_BRACKET_FINAL,
  ],
};