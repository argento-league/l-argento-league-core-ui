import {
  DoubleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from "react-tournament-brackets";
import { ReactElement } from "react";
import { doubleEliminationMatches } from "../mocks/doubleEliminationMatches";

const GlootTheme = createTheme({
  textColor: { main: "#000000", highlighted: "#F4F2FE", dark: "#707582" },
  matchBackground: { wonColor: "#2D2D59", lostColor: "#1B1D2D" },
  score: {
    background: {
      wonColor: `#10131C`,
      lostColor: "#10131C",
    },
    text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" },
  },
  border: {
    color: "#292B43",
    highlightedColor: "RGBA(152,82,242,0.4)",
  },
  roundHeader: { backgroundColor: "#3B3F73", fontColor: "#F4F2FE" },
  connectorColor: "#3B3F73",
  connectorColorHighlight: "RGBA(152,82,242,0.4)",
  canvasBackground: "#0F121C",
});

type SVGWrapperProps = {
  children: ReactElement;
  bracketWidth: number;
  bracketHeight: number;
  startAt: number[];
  scaleFactor?: number;
  width?: number;
  height?: number;
};

export default function DoubleElimination() {
  return (
    <div>
      <h1>Double Elimination Bracket</h1>
      <DoubleEliminationBracket
        matches={doubleEliminationMatches}
        matchComponent={Match}
        theme={GlootTheme}
        options={{
          style: {
            roundHeader: {
              isShown: false,
              backgroundColor: GlootTheme.roundHeaders.background,
            },
            width: 300,
            connectorColor: GlootTheme.border.color,
            connectorColorHighlight: GlootTheme.border.highlightedColor,
          },
        }}
        svgWrapper={({
          children,
          bracketWidth,
          bracketHeight,
          startAt,
          ...props
        }: SVGWrapperProps) => (
          <SVGViewer
            width={2000}
            height={1000}
            bracketWidth={bracketWidth}
            bracketHeight={bracketHeight}
            backgroundColor={GlootTheme.canvasBackground}
            SVGBackground={GlootTheme.canvasBackground}
            startAt={startAt}
            scaleFactor={1}
            {...props}
          >
            {children}
          </SVGViewer>
        )}
      />
    </div>
  );
}
