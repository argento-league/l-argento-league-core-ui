import style from "styled-components";
import { Badge } from "../badge/badge";
import season5Teams from "../../../../data/season-5/teams.json";

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

// Helper function to find team logo - using same logic as other components
const findTeamLogo = (teamName: string): string => {
  // Try to find the team by exact name match first
  for (const [, team] of Object.entries(season5Teams)) {
    if (team.name === teamName) {
      return team.logo;
    }
  }
  
  // Try to find by partial match (for cases like "E. ANTI-TONKAS" matching "Escuadrón Anti-Tonkas")
  const normalizedTeamName = teamName.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [, team] of Object.entries(season5Teams)) {
    const normalizedTeamDataName = team.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedTeamDataName.includes(normalizedTeamName) || normalizedTeamName.includes(normalizedTeamDataName)) {
      return team.logo;
    }
  }
  
  // Special cases for known mismatches
  const specialCases: { [key: string]: string } = {
    'E. Anti-tonkas': 'escuadron-anti-tonkas.png',
    'E. ANTI-TONKAS': 'escuadron-anti-tonkas.png',
    'Hydra': 'hydra-reborn.png',
    'HYDRA': 'hydra-reborn.png',
    'Obesho + 4': 'obesho.png',
    'OBESHO + 4': 'obesho.png',
    'Miro Tik Tok': 'miro-tiktok.png',
    'MIRO TIK TOK': 'miro-tiktok.png',
    'The Tether': 'the-tether.png',
    'THE TETHER': 'the-tether.png',
    'Pure Team': 'pure-team.png',
    'PURE TEAM': 'pure-team.png',
    'Racson Disciples': 'racson-disciples.png',
    'RACSON DISCIPLES': 'racson-disciples.png',
    'Guerreros Z': 'guerreros-z.png',
    'GUERREROS Z': 'guerreros-z.png',
    '3Fecto Divine': '3fecto-divine.png',
    '3FECTO DIVINE': '3fecto-divine.png',
    'Fantasmas': 'fantasmas.png',
    'FANTASMAS': 'fantasmas.png',
    'Sudamerica V': 'sudamerica.png',
    'SUDAMERICA V': 'sudamerica.png',
    'La Manada': 'la-manada.png',
    'LA MANADA': 'la-manada.png',
    'Nymeria': 'nymeria.png',
    'NYMERIA': 'nymeria.png',
    'Circo Jujeño': 'circo-jujeno.png',
    'CIRCO JUJEÑO': 'circo-jujeno.png',
    'Epicenter': 'epicenter.png',
    'EPICENTER': 'epicenter.png',
    'Gordo Squad': 'gordo-squad.png',
    'GORDO SQUAD': 'gordo-squad.png'
  };
  
  if (specialCases[teamName]) {
    return specialCases[teamName];
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
};

export const Team = ({
  teamName,
  score,
  result,
  isWinner,
  isGamePlayed,
}: TeamProps) => {
  return (
    <TeamContainer id="team-1">
      <ScoreAndNameContainer id="score-and-name-container">
        {isGamePlayed && <Score id="score">{score}</Score>}
        <TeamLogo 
          src={`/images/teams/season-5/${findTeamLogo(teamName)}`}
          alt={teamName}
        />
        <TeamName id="team-1-name">{teamName}</TeamName>
      </ScoreAndNameContainer>
      {isGamePlayed && <Badge text={result} isWinner={isWinner} />}
    </TeamContainer>
  );
};
