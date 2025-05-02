import "./App.css";
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from "react-tournament-brackets";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DoubleElimination from "./pages/DoubleElimination";
import GroupStandings from "./pages/GroupStandings";
import { TEAM_PARTICIPANTS } from "./pages/teams";

const MATCH_RESULT_TEXT = {
  WON: "WON",
  LOST: "LOST",
  WON_BY_DEFAULT: "WO",
};

const GlootTheme = createTheme({
  textColor: {
    main: "#000000",
    highlighted: "#F4F2FE",
    dark: "#707582",
    disabled: "#707582",
  },
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
  roundHeaders: { background: "#3B3F73" },
  canvasBackground: "#0F121C",
});



const MATCHES_IDS = {
  MAIN_BRACKET: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
  },
  QUARTER_FINAL: {
    1: 9,
    2: 10,
    3: 11,
    4: 12,
  },
  SEMI_FINAL: {
    1: 13,
    2: 14,
  },
  FINAL: {
    1: 15,
  },
};

const SEMI_FINAL_MATCHES = [
  {
    id: MATCHES_IDS.QUARTER_FINAL[1],
    name: "Quarter Final 1",
    nextMatchId: MATCHES_IDS.SEMI_FINAL[1],
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE" as const,
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_1.id,
        resultText: MATCH_RESULT_TEXT.WON,
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_1.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_3.id,
        resultText: MATCH_RESULT_TEXT.LOST,
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_3.name,
      },
    ],
  },
  {
    id: MATCHES_IDS.QUARTER_FINAL[2],
    name: "Quarter Final 2",
    nextMatchId: MATCHES_IDS.SEMI_FINAL[1],
    tournamentRoundText: "2",
    startTime: "2021-05-31",
    state: "DONE" as const,
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_5.id,
        resultText: MATCH_RESULT_TEXT.WON,
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_5.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_7.id,
        resultText: MATCH_RESULT_TEXT.LOST,
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_7.name,
      },
    ],
  },
];

const FINAL_MATCH = [
  {
    id: MATCHES_IDS.SEMI_FINAL[1],
    name: "Final",
    nextMatchId: null,
    tournamentRoundText: "3",
    startTime: "2021-06-01",
    state: "DONE" as const,
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_1.id,
        resultText: MATCH_RESULT_TEXT.WON,
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_1.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_5.id,
        resultText: MATCH_RESULT_TEXT.LOST,
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_5.name,
      },
    ],
  },
];

const matches = [
  {
    id: MATCHES_IDS.MAIN_BRACKET[1],
    name: "Round 1 - Match 1",
    nextMatchId: MATCHES_IDS.QUARTER_FINAL[1],
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE" as const,
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_1.id,
        resultText: MATCH_RESULT_TEXT.WON,
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_1.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_2.id,
        resultText: MATCH_RESULT_TEXT.LOST,
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_2.name,
      },
    ],
  },
  {
    id: MATCHES_IDS.MAIN_BRACKET[2],
    name: "Round 1 - Match 2",
    nextMatchId: MATCHES_IDS.QUARTER_FINAL[1],
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE" as const,
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_3.id,
        resultText: MATCH_RESULT_TEXT.WON,
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_3.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_4.id,
        resultText: MATCH_RESULT_TEXT.LOST,
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_4.name,
      },
    ],
  },
  {
    id: MATCHES_IDS.MAIN_BRACKET[3],
    name: "Round 1 - Match 3",
    nextMatchId: MATCHES_IDS.QUARTER_FINAL[2],
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE" as const,
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_5.id,
        resultText: MATCH_RESULT_TEXT.WON,
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_5.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_6.id,
        resultText: MATCH_RESULT_TEXT.LOST,
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_6.name,
      },
    ],
  },
  {
    id: MATCHES_IDS.MAIN_BRACKET[4],
    name: "Round 1 - Match 4",
    nextMatchId: MATCHES_IDS.QUARTER_FINAL[2],
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "DONE" as const,
    participants: [
      {
        id: TEAM_PARTICIPANTS.TEAM_7.id,
        resultText: MATCH_RESULT_TEXT.WON,
        isWinner: true,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_7.name,
      },
      {
        id: TEAM_PARTICIPANTS.TEAM_8.id,
        resultText: MATCH_RESULT_TEXT.LOST,
        isWinner: false,
        status: null,
        name: TEAM_PARTICIPANTS.TEAM_8.name,
      },
    ],
  },
  ...SEMI_FINAL_MATCHES,
  ...FINAL_MATCH,
];

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end>Single Elimination</NavLink>
            </li>
            <li>
              <NavLink to="/double-elimination">Double Elimination</NavLink>
            </li>
            <li>
              <NavLink to="/group-standings">Group Standings</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <SingleEliminationBracket
                matches={matches}
                matchComponent={Match}
                theme={GlootTheme}
                options={{
                  style: {
                    roundHeader: {
                      backgroundColor: GlootTheme.roundHeaders.background,
                    },
                    connectorColor: "#3B3F73",
                    connectorColorHighlight: "RGBA(152,82,242,0.4)",
                  },
                }}
                svgWrapper={({ children, bracketWidth, bracketHeight, startAt, ...props }) => (
                  <SVGViewer
                    width={2000}
                    height={2000}
                    bracketWidth={bracketWidth}
                    bracketHeight={bracketHeight}
                    startAt={startAt}
                    scaleFactor={1}
                    {...props}
                  >
                    {children}
                  </SVGViewer>
                )}
              />
            }
          />
          <Route path="/double-elimination" element={<DoubleElimination />} />
          <Route path="/group-standings" element={<GroupStandings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
