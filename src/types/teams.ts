export interface TeamData {
  name: string;
  logo: string;
  players: {
    nick: string;
    nationality: string;
  }[];
}

export type TeamJsonType = {
  [key: string]: TeamData;
};

export interface GroupTeam {
  name: string;
  logo: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
}

export type GroupData = {
  [key: string]: GroupTeam[];
};
