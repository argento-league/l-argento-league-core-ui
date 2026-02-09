import { createContext, useContext, ReactNode } from "react";
import {
  SEASON_COLORS,
  CURRENT_SEASON_COLORS,
  type SeasonKey,
} from "../constants/season-colors";

export type SeasonTheme = {
  colors: { primary: string; secondary: string };
  seasonLabel: string;
  seasonKey: SeasonKey;
  seasonNumber: number;
};

const defaultTheme: SeasonTheme = {
  colors: CURRENT_SEASON_COLORS,
  seasonLabel: "Season 7",
  seasonKey: "season7",
  seasonNumber: 7,
};

const SeasonThemeContext = createContext<SeasonTheme>(defaultTheme);

export function SeasonThemeProvider({
  theme,
  children,
}: {
  theme: SeasonTheme;
  children: ReactNode;
}) {
  return (
    <div
      style={
        {
          "--season-primary": theme.colors.primary,
          "--season-secondary": theme.colors.secondary,
        } as React.CSSProperties
      }
    >
      <SeasonThemeContext.Provider value={theme}>
        {children}
      </SeasonThemeContext.Provider>
    </div>
  );
}

export function useSeasonTheme(): SeasonTheme {
  return useContext(SeasonThemeContext);
}

export const SEASON_6_THEME: SeasonTheme = {
  colors: SEASON_COLORS.season6,
  seasonLabel: "Season 6",
  seasonKey: "season6",
  seasonNumber: 6,
};

export const SEASON_7_THEME: SeasonTheme = defaultTheme;
