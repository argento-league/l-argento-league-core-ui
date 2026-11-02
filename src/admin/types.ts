export type Match = {
  team1: string;
  score1: string | null;
  team2: string;
  score2: string | null;
};

export type BracketMatch = Match & { match: number };

/** jornadas.json: { "Jornada-1": { "grupo-a": [...], "grupo-b": [...] } } */
export type JornadasData = Record<string, Record<string, Match[]>>;

/** evento-principal.json */
export type EventoPrincipalData = {
  "upper-bracket": Record<string, BracketMatch[]>;
  "lower-bracket": Record<string, BracketMatch[]>;
  "grand-final": BracketMatch[];
};
