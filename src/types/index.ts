export type TeamStanding = {
  name: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  logo: string;
};

export type MatchType = {
  id: string;
  name: string;
  nextMatchId: string;
  nextLooserMatchId: string | undefined;
  tournamentRoundText: string;
  startTime: string;
  state: string;
  participants: Participant[] | ParticipantTBD[];
};

export type Participant = {
  id: string;
  resultText: string;
  isWinner: boolean;
  status: string | null;
  name: string;
};

export type ParticipantTBD = {
  name: "TBD";
  status: "NO_PARTY";
};
