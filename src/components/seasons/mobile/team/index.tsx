import style from "styled-components";
import { Badge } from "../badge/badge";
import season5Teams from "../../../../data/season-5/teams.json";
import { getSeasonTeams, type SeasonNumber } from "../../../../data/season-data";

const TeamContainer = style.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: 6px;
    padding-right: 12px;
    box-sizing: border-box;
`;

const ScoreAndNameContainer = style.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-left: 6px;
    box-sizing: border-box;
`;

const Score = style.span`
    font-size: 16px;
    font-weight: 700;
    font-family: "Montserrat", sans-serif;
`;

const TeamName = style.p`
    font-size: 16px;
    font-weight: 700;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
`;

const TeamLogo = style.img`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    object-fit: cover;
    margin-right: 8px;
`;

// Helper function to find team data with multiple fallbacks (same logic as other components)
const findTeamData = (teamName: string, teams: any) => {
  // First try exact match
  for (const [, team] of Object.entries(teams)) {
    if ((team as any).name === teamName) {
      return team;
    }
  }
  
  // Try case-insensitive match
  for (const [, team] of Object.entries(teams)) {
    if ((team as any).name.toLowerCase() === teamName.toLowerCase()) {
      return team;
    }
  }
  
  // Try partial match (contains)
  for (const [, team] of Object.entries(teams)) {
    if (
      (team as any).name.toLowerCase().includes(teamName.toLowerCase()) ||
      teamName.toLowerCase().includes((team as any).name.toLowerCase())
    ) {
      return team;
    }
  }
  
  // Try removing common words and matching
  const cleanName = (name: string) => name.toLowerCase()
    .replace(/team|gaming|esports|e-sports|squad|clan/g, '')
    .trim();
  
  for (const [, team] of Object.entries(teams)) {
    if (cleanName((team as any).name) === cleanName(teamName)) {
      return team;
    }
  }
  
  return null;
};

// Helper function to find team logo
const findTeamLogo = (teamName: string, season: number = 5): string => {
  const teams = season === 5 ? season5Teams : getSeasonTeams(season as SeasonNumber);
  const teamData = findTeamData(teamName, teams);
  
  if (teamData) {
    return (teamData as any).logo;
  }
  
  // If not found, return default
  return 'player-libre.png';
};

type TeamProps = {
  teamName: string;
  score: number | null | undefined;
  result: string;
  isWinner: boolean;
  isGamePlayed: boolean;
  season?: number;
};

export const Team = ({
  teamName,
  score,
  result,
  isWinner,
  isGamePlayed,
  season = 5,
}: TeamProps) => {
  // Don't show logo for TBD teams
  const shouldShowLogo = teamName !== 'TBD' && teamName !== 'tbd';
  
  return (
    <TeamContainer id="team-1">
      <ScoreAndNameContainer id="score-and-name-container">
        {isGamePlayed && <Score id="score">{score}</Score>}
        {shouldShowLogo && (
          <TeamLogo 
            src={`/images/teams/season-${season}/${findTeamLogo(teamName, season)}`}
            alt={teamName}
          />
        )}
        <TeamName id="team-1-name">{teamName}</TeamName>
      </ScoreAndNameContainer>
      {isGamePlayed && <Badge text={result} isWinner={isWinner} />}
    </TeamContainer>
  );
};
