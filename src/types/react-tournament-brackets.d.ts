declare module '@g-loot/react-tournament-brackets' {
  export interface MatchType {
    id: string;
    name: string;
    nextMatchId: string | null;
    nextLooserMatchId: string | null;
    tournamentRoundText: string;
    startTime: string;
    state: 'DONE' | 'NO_SHOW';
    participants: Participant[];
  }

  export interface Participant {
    id: string;
    resultText: string;
    isWinner: boolean;
    status: 'DONE' | 'NO_PARTY';
    name: string;
    score: number | null;
    image?: string;
  }

  export interface ThemeType {
    textColor: {
      main: string;
      highlighted: string;
      dark: string;
    };
    matchBackground: {
      wonColor: string;
      lostColor: string;
    };
    score: {
      background: {
        wonColor: string;
        lostColor: string;
      };
      text: {
        highlightedWonColor: string;
        highlightedLostColor: string;
      };
    };
    border: {
      color: string;
      highlightedColor: string;
    };
    roundHeaders: {
      background: string;
      fontColor: string;
    };
    connectorColor: string;
    connectorColorHighlight: string;
    canvasBackground: string;
  }

  export function createTheme(theme: ThemeType): ThemeType;
  
  export const DoubleEliminationBracket: React.FC<any>;
  export const Match: React.FC<any>;
  export const SVGViewer: React.FC<any>;
}
