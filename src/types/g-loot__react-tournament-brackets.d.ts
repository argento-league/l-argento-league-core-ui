declare module '@g-loot/react-tournament-brackets' {
  import { ReactElement } from 'react';

  export type ParticipantType = {
    id: string | number | null;
    isWinner?: boolean;
    name?: string;
    status?: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string | null;
    resultText?: string | null;
    [key: string]: any;
  };

  export type MatchType = {
    id: number | string;
    href?: string;
    name?: string;
    nextMatchId: number | string | null;
    nextLooserMatchId?: number | string | null;
    tournamentRoundText?: string;
    startTime: string | null;
    state: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'SCHEDULED' | string;
    participants: ParticipantType[];
    [key: string]: any;
  };

  export type ThemeType = {
    fontFamily: string;
    transitionTimingFunction: string;
    disabledColor: string;
    roundHeaders: {
      background: string;
    };
    matchBackground: {
      wonColor: string;
      lostColor: string;
    };
    border: {
      color: string;
      highlightedColor: string;
    };
    textColor: {
      highlighted: string;
      main: string;
      dark: string;
      disabled: string;
    };
    score: {
      text: {
        highlightedWonColor: string;
        highlightedLostColor: string;
      };
      background: {
        wonColor: string;
        lostColor: string;
      };
    };
    canvasBackground: string;
  };

  export type SingleElimLeaderboardProps = {
    matches: MatchType[];
    matchComponent: React.ComponentType;
    svgWrapper?: (props: {
      bracketWidth: number;
      bracketHeight: number;
      startAt: number[];
      children: ReactElement;
    }) => ReactElement;
    theme?: ThemeType;
    options?: {
      style: {
        width?: number;
        boxHeight?: number;
        canvasPadding?: number;
        spaceBetweenColumns?: number;
        spaceBetweenRows?: number;
        connectorColor?: string;
        connectorColorHighlight?: string;
        roundHeader?: {
          isShown?: boolean;
          height?: number;
          marginBottom?: number;
          fontSize?: number;
          fontColor?: string;
          backgroundColor?: string;
          fontFamily?: string;
          roundTextGenerator?: (currentRoundNumber: number, roundsTotalNumber: number) => string | undefined;
        };
        roundSeparatorWidth?: number;
        lineInfo?: {
          separation?: number;
          homeVisitorSpread?: number;
        };
        horizontalOffset?: number;
        wonBywalkOverText?: string;
        lostByNoShowText?: string;
      };
    };
  };

  export type DoubleElimLeaderboardProps = {
    matches: {
      upper: MatchType[];
      lower: MatchType[];
    };
    matchComponent: React.ComponentType;
    svgWrapper?: (props: {
      bracketWidth: number;
      bracketHeight: number;
      startAt: number[];
      children: ReactElement;
    }) => ReactElement;
    theme?: ThemeType;
    options?: {
      style: {
        width?: number;
        boxHeight?: number;
        canvasPadding?: number;
        spaceBetweenColumns?: number;
        spaceBetweenRows?: number;
        connectorColor?: string;
        connectorColorHighlight?: string;
        roundHeader?: {
          isShown?: boolean;
          height?: number;
          marginBottom?: number;
          fontSize?: number;
          fontColor?: string;
          backgroundColor?: string;
          fontFamily?: string;
          roundTextGenerator?: (currentRoundNumber: number, roundsTotalNumber: number) => string | undefined;
        };
        roundSeparatorWidth?: number;
        lineInfo?: {
          separation?: number;
          homeVisitorSpread?: number;
        };
        horizontalOffset?: number;
        wonBywalkOverText?: string;
        lostByNoShowText?: string;
      };
    };
  };

  export const SingleEliminationBracket: React.FC<SingleElimLeaderboardProps>;
  export const DoubleEliminationBracket: React.FC<DoubleElimLeaderboardProps>;
  export const Match: React.ComponentType;
  export const SVGViewer: React.ComponentType<{
    height: number;
    width: number;
    bracketWidth: number;
    bracketHeight: number;
    children: ReactElement;
    startAt: number[];
    scaleFactor: number;
  }>;
  export const MATCH_STATES: {
    PLAYED: 'PLAYED';
    NO_SHOW: 'NO_SHOW';
    WALK_OVER: 'WALK_OVER';
    NO_PARTY: 'NO_PARTY';
  };
  export function createTheme(customTheme?: Partial<ThemeType>): ThemeType;
} 