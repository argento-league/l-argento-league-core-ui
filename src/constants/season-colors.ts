// Season color system
export const SEASON_COLORS = {
  season4: {
    primary: "#fabf4a", // Amarillo dorado
    secondary: "#321156", // Morado
  },
  season5: {
    primary: "#fabf4a", // Amarillo dorado
    secondary: "#321156", // Morado
  },
  season6: {
    primary: "rgba(80, 255, 16, 1)", // Verde brillante
    secondary: "#000000", // Negro
  },
} as const;

export type SeasonKey = keyof typeof SEASON_COLORS;

// Helper function to get season colors
export const getSeasonColors = (season: SeasonKey) => SEASON_COLORS[season];

// Current season colors (Season 6)
export const CURRENT_SEASON_COLORS = SEASON_COLORS.season6;
