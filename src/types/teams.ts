export interface TeamData {
  name: string;
  logo: string;
  players: {
    nick: string;
    nationality: string;
    mmr?: number;
    id_dota?: string;
    /** Veces campeón de L'Argento (muestra trofeo + número en UI) */
    championships?: number;
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
