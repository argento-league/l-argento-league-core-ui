import {
  DoubleEliminationBracket,
  Match,
  MatchType,
  SVGViewer,
  createTheme,
} from "react-tournament-brackets";
import { ReactElement } from "react";
import { doubleEliminationMatches } from "../../data/brackets/doubleEliminationMatches";

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
  canvasBackground: "#000000",
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
    <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
      <DoubleEliminationBracket
        matches={
          doubleEliminationMatches as unknown as {
            upper: MatchType[];
            lower: MatchType[];
          }
        }
        matchComponent={Match}
        theme={GlootTheme}
        options={{
          style: {
            canvasPadding: 24,
            roundHeader: {
              isShown: false,
              backgroundColor: GlootTheme.roundHeaders.background,
            },

            width: 250,
            connectorColor: GlootTheme.border.color,
            connectorColorHighlight: GlootTheme.border.highlightedColor,
          },
        }}
        svgWrapper={({
          children,
          bracketWidth,
          bracketHeight,
          ...props
        }: SVGWrapperProps) => (
          <SVGViewer
            {...props}
            bracketWidth={bracketWidth}
            bracketHeight={bracketHeight}
            backgroundColor={GlootTheme.canvasBackground}
            SVGBackground={GlootTheme.canvasBackground}
            width={1280}
            startAt={[0, 0]}
            scaleFactor={1.25}
            height={720}
          >
            {children}
          </SVGViewer>
        )}
      />
    </div>
  );
}
