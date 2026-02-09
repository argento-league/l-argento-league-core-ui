import { useMemo } from "react";
import { 
  createTheme, 
  DoubleEliminationBracket, 
  MatchType, 
  SVGViewer 
} from "@g-loot/react-tournament-brackets";
import { getSeasonEventoPrincipal, getSeasonTeams, type SeasonNumber } from "../../../data/season-data";
import styled from "styled-components";

// Custom Match component to show team logos
const CustomMatch = ({ match }: any) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      padding: '10px',
      maxWidth: '200px',
      width: '100%',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }}>
      {match.participants?.map((participant: any, index: number) => (
        <div 
          key={participant.id} 
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            color: participant.isWinner ? '#ffffff' : 'rgba(255,255,255,0.6)',
            fontWeight: participant.isWinner ? 'bold' : 'normal',
            padding: '8px 12px',
            borderBottom: index === 0 ? '2px solid #50ff10' : 'none',
            borderRadius: index === 0 ? '0' : '0'
          }}
        >
          {participant.image && (
            <img 
              src={participant.image} 
              alt={participant.name}
              style={{ width: '30px', height: '30px', marginRight: '8px' }}
            />
          )}
          <span style={{ flex: 1 }}>{participant.name}</span>
          {participant.score !== null && (
            <span style={{ 
              marginLeft: '8px', 
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              color: participant.isWinner ? '#50ff10' : 'rgba(255,255,255,0.6)'
            }}>{participant.score}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const BackgroundWrapper = styled.div`
  background-image: url('/bracketsSectionBackground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 20px;
  min-height: 100vh;
`;

const Container = styled.div`
  position: relative;
  color: white;
  overflow: auto;

  /* Prevent zoom on scroll when hovering over bracket */
  svg {
    pointer-events: none;
  }
  
  /* Allow pointer events on children but prevent wheel zoom */
  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Show team logos */
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-right: 8px;
  }

  /* Force transparency on all child elements */
  & > * {
    background: transparent !important;
  }

  /* Specific overrides for common wrapper classes */
  div[class*="wrapper"],
  div[class*="container"],
  div[class*="svg-wrapper"] {
    background: transparent !important;
  }
`;

const GlootTheme = createTheme({
  textColor: { main: "#FFFFFF", highlighted: "#FFFFFF", dark: "#FFFFFF" },
  matchBackground: { wonColor: "transparent", lostColor: "transparent" },
  score: {
    background: {
      wonColor: `transparent`,
      lostColor: "transparent",
    },
    text: { highlightedWonColor: "#FFFFFF", highlightedLostColor: "#FFFFFF" },
  },
  border: {
    color: "transparent",
    highlightedColor: "RGBA(80,255,16,0.6)",
  },
  roundHeaders: { background: "#3B3F73", fontColor: "#FFFFFF" },
  connectorColor: "#50FF10",
  connectorColorHighlight: "RGBA(80,255,16,0.8)",
  canvasBackground: "transparent",
});

type MainEventGlootProps = {
  season?: number;
};

// Helper to find team logo (por temporada)
const getTeamLogo = (teamName: string, season: number): string => {
  if (teamName === 'TBD' || teamName === 'tbd') return '';
  if (season !== 6 && season !== 7) return '';
  const seasonTeams = getSeasonTeams(season as SeasonNumber);
  const teamEntry = Object.entries(seasonTeams).find(([_, team]: [string, any]) =>
    team.name.toLowerCase() === teamName.toLowerCase()
  );
  if (teamEntry) {
    return `/images/teams/season-${season}/${(teamEntry[1] as { logo: string }).logo}`;
  }
  return '';
};

// Exact flow as specified by user:
// Upper: 1+2 -> 5, 3+4 -> 6, 5+6 -> 7, 7 -> 8
// Lower: 9->13, 10->14, 11->15, 12->16, 13+14->17, 15+16->18, 17->19, 18->20, 19+20->21, 21->22, 22 -> 8
const convertToGlootFormat = (data: any, season: number): { upper: MatchType[]; lower: MatchType[] } => {
  const upperMatches: MatchType[] = [];
  const lowerMatches: MatchType[] = [];
  
  // Helper to create match ID
  const createMatchId = (type: 'upper' | 'lower', matchNum: number) => {
    return `${type.toUpperCase()}_M${matchNum}`;
  };
  
  // Get all matches from data
  const upperR1 = data['upper-bracket']['round-1'] || [];
  const m1 = upperR1.find((m: any) => m.match === 1);
  const m2 = upperR1.find((m: any) => m.match === 2);
  const m3 = upperR1.find((m: any) => m.match === 3);
  const m4 = upperR1.find((m: any) => m.match === 4);
  
  const upperR2 = data['upper-bracket']['round-2'] || [];
  const m5 = upperR2.find((m: any) => m.match === 5);
  const m6 = upperR2.find((m: any) => m.match === 6);
  
  const upperR3 = data['upper-bracket']['round-3'] || [];
  const m7 = upperR3.find((m: any) => m.match === 7);
  
  const upperGranFinal = data['upper-bracket']['Gran Final'] || [];
  const m8 = upperGranFinal.find((m: any) => m.match === 8);
  
  const lowerR1 = data['lower-bracket']['round-1'] || [];
  const m9 = lowerR1.find((m: any) => m.match === 9);
  const m10 = lowerR1.find((m: any) => m.match === 10);
  const m11 = lowerR1.find((m: any) => m.match === 11);
  const m12 = lowerR1.find((m: any) => m.match === 12);
  
  const lowerR2 = data['lower-bracket']['round-2'] || [];
  const m13 = lowerR2.find((m: any) => m.match === 13);
  const m14 = lowerR2.find((m: any) => m.match === 14);
  const m15 = lowerR2.find((m: any) => m.match === 15);
  const m16 = lowerR2.find((m: any) => m.match === 16);
  
  const lowerR3 = data['lower-bracket']['round-3'] || [];
  const m17 = lowerR3.find((m: any) => m.match === 17);
  const m18 = lowerR3.find((m: any) => m.match === 18);
  
  const lowerR4 = data['lower-bracket']['round-4'] || [];
  const m19 = lowerR4.find((m: any) => m.match === 19);
  const m20 = lowerR4.find((m: any) => m.match === 20);
  
  const lowerR5 = data['lower-bracket']['round-5'] || [];
  const m21 = lowerR5.find((m: any) => m.match === 21);
  
  const lowerR6 = data['lower-bracket']['round-6'] || [];
  const m22 = lowerR6.find((m: any) => m.match === 22);
  
  // Helper to create a match
  const createMatch = (matchData: any, id: string, nextMatchId: string, nextLooserMatchId: string | null, roundText: string): MatchType => {
    const hasScores = matchData.score1 !== null && matchData.score2 !== null;
    const team1Wins = hasScores && matchData.score1 > matchData.score2;
    const team2Wins = hasScores && matchData.score2 > matchData.score1;
    
    return {
      id,
      name: `Match ${matchData.match}`,
      nextMatchId,
      nextLooserMatchId,
      tournamentRoundText: roundText,
      startTime: '',
      state: hasScores ? 'DONE' : 'NO_SHOW',
      participants: [
        {
          id: `team_${matchData.team1}`,
          resultText: '',
          isWinner: team1Wins,
          status: hasScores ? 'DONE' : 'NO_PARTY',
          name: matchData.team1,
          score: matchData.score1,
          image: getTeamLogo(matchData.team1, season),
        },
        {
          id: `team_${matchData.team2}`,
          resultText: '',
          isWinner: team2Wins,
          status: hasScores ? 'DONE' : 'NO_PARTY',
          name: matchData.team2,
          score: matchData.score2,
          image: getTeamLogo(matchData.team2, season),
        },
      ],
    };
  };
  
  // Upper bracket: 1,2 -> 5; 3,4 -> 6; 5,6 -> 7; 7 -> 8
  if (m1) upperMatches.push(createMatch(m1, createMatchId('upper', 1), 'UPPER_M5', null, 'Primera Ronda'));
  if (m2) upperMatches.push(createMatch(m2, createMatchId('upper', 2), 'UPPER_M5', null, 'Primera Ronda'));
  if (m3) upperMatches.push(createMatch(m3, createMatchId('upper', 3), 'UPPER_M6', null, 'Primera Ronda'));
  if (m4) upperMatches.push(createMatch(m4, createMatchId('upper', 4), 'UPPER_M6', null, 'Primera Ronda'));
  
  if (m5) upperMatches.push(createMatch(m5, createMatchId('upper', 5), 'UPPER_M7', null, 'Segunda Ronda'));
  if (m6) upperMatches.push(createMatch(m6, createMatchId('upper', 6), 'UPPER_M7', null, 'Segunda Ronda'));
  
  if (m7) upperMatches.push(createMatch(m7, createMatchId('upper', 7), 'UPPER_M8', 'LOWER_M22', 'Tercera Ronda'));
  if (m8) upperMatches.push(createMatch(m8, createMatchId('upper', 8), '', null, 'Gran Final'));
  
  // Lower bracket: 9->13, 10->14, 11->15, 12->16; 13+14->17, 15+16->18; 17->19, 18->20; 19+20->21; 21->22; 22->8
  if (m9) lowerMatches.push(createMatch(m9, createMatchId('lower', 9), 'LOWER_M13', null, 'Primera Ronda'));
  if (m10) lowerMatches.push(createMatch(m10, createMatchId('lower', 10), 'LOWER_M14', null, 'Primera Ronda'));
  if (m11) lowerMatches.push(createMatch(m11, createMatchId('lower', 11), 'LOWER_M15', null, 'Primera Ronda'));
  if (m12) lowerMatches.push(createMatch(m12, createMatchId('lower', 12), 'LOWER_M16', null, 'Primera Ronda'));
  
  if (m13) lowerMatches.push(createMatch(m13, createMatchId('lower', 13), 'LOWER_M17', null, 'Segunda Ronda'));
  if (m14) lowerMatches.push(createMatch(m14, createMatchId('lower', 14), 'LOWER_M17', null, 'Segunda Ronda'));
  if (m15) lowerMatches.push(createMatch(m15, createMatchId('lower', 15), 'LOWER_M18', null, 'Segunda Ronda'));
  if (m16) lowerMatches.push(createMatch(m16, createMatchId('lower', 16), 'LOWER_M18', null, 'Segunda Ronda'));
  
  if (m17) lowerMatches.push(createMatch(m17, createMatchId('lower', 17), 'LOWER_M19', null, 'Tercera Ronda'));
  if (m18) lowerMatches.push(createMatch(m18, createMatchId('lower', 18), 'LOWER_M20', null, 'Tercera Ronda'));
  
  if (m19) lowerMatches.push(createMatch(m19, createMatchId('lower', 19), 'LOWER_M21', null, 'Cuarta Ronda'));
  if (m20) lowerMatches.push(createMatch(m20, createMatchId('lower', 20), 'LOWER_M21', null, 'Cuarta Ronda'));
  
  if (m21) lowerMatches.push(createMatch(m21, createMatchId('lower', 21), 'LOWER_M22', null, 'Quinta Ronda'));
  if (m22) lowerMatches.push(createMatch(m22, createMatchId('lower', 22), 'UPPER_M8', null, 'Sexta Ronda'));
  
  return { upper: upperMatches, lower: lowerMatches };
};

const MainEventGloot = ({ season = 6 }: MainEventGlootProps) => {
  const eventoPrincipal = season === 6 || season === 7 ? getSeasonEventoPrincipal(season as SeasonNumber) : null;
  const matches = useMemo(
    () => (eventoPrincipal ? convertToGlootFormat(eventoPrincipal, season) : { upper: [], lower: [] }),
    [eventoPrincipal, season]
  );
  
  const canvasWidth = window.innerWidth - 100;
  const canvasHeight = (canvasWidth * 1.5);
  
  return (
    <BackgroundWrapper>
      <Container>
        <style>{`
          /* Global override to ensure transparency */
          .react-brackets,
          .react-brackets > div,
          .react-brackets > div > div {
            background: transparent !important;
          }
        `}</style>
        <DoubleEliminationBracket
        matches={matches}
        matchComponent={CustomMatch}
        theme={GlootTheme}
        options={{
          style: {
            canvasPadding: 24,
            roundHeader: {
              isShown: true,
              backgroundColor: GlootTheme.roundHeaders.background,
            },
            width: 250,
          },
        }}
         svgWrapper={({ children, bracketWidth, bracketHeight, ...props }: any) => (
           <div style={{ background: 'transparent !important' }}>
             <SVGViewer
               {...props}
               bracketWidth={bracketWidth}
               bracketHeight={bracketHeight}
               backgroundColor="transparent"
               SVGBackground="transparent"
               width={canvasWidth}
               startAt={[0, 0]}
               scaleFactor={1.0}
               height={canvasHeight}
               allowPan={false}
               allowZoom={false}
             >
               {children}
             </SVGViewer>
           </div>
         )}
        />
      </Container>
    </BackgroundWrapper>
  );
};

export default MainEventGloot;
