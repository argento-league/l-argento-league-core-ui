import { useState } from "react";
import styled from "styled-components";
import season5Jornadas from "../../../data/season-5/jornadas.json";
import season5Teams from "../../../data/season-5/teams.json";
import { getSeasonJornadas, getSeasonTeams, type SeasonNumber } from "../../../data/season-data";

interface MatchResult {
  team1: string;
  score1: string | null;
  team2: string;
  score2: string | null;
}

interface GroupMatches {
  "grupo-a": MatchResult[];
  "grupo-b": MatchResult[];
  "grupo-c": MatchResult[];
  "grupo-d": MatchResult[];
}

interface JornadasData {
  [key: string]: GroupMatches;
}

type MatchScheduleProps = {
  currentGroup?: "grupo-a" | "grupo-b" | "grupo-c" | "grupo-d";
  season?: number;
};

const isTbd = (teamName: string) =>
  teamName === "TBD" || teamName.toUpperCase() === "TBD";

// Helper function to find team logo (returns null if TBD para no mostrar icono)
const findTeamLogo = (teamName: string, teams: any[]): string | null => {
  if (isTbd(teamName)) return null;
  // First try exact match
  let match = teams.find(team => team.name === teamName);
  if (match) return match.logo || 'default-logo.png';
  // Try case-insensitive match
  match = teams.find(team => team.name.toLowerCase() === teamName.toLowerCase());
  if (match) return match.logo || 'default-logo.png';
  // Try partial match (contains)
  match = teams.find(team =>
    team.name.toLowerCase().includes(teamName.toLowerCase()) ||
    teamName.toLowerCase().includes(team.name.toLowerCase())
  );
  if (match) return match.logo || 'default-logo.png';
  return 'default-logo.png';
};

export const MatchScheduleContent = ({ currentGroup = "grupo-a", season = 6 }: MatchScheduleProps) => {
  const [currentJornada, setCurrentJornada] = useState(1);
  
  // Select data based on season (S5 propio; S6/S7 desde season-data)
  const jornadasData = season === 5 ? season5Jornadas : getSeasonJornadas(season as SeasonNumber);
  const teamsData = season === 5 ? season5Teams : getSeasonTeams(season as SeasonNumber);
  
  // Get all jornada keys and sort them
  const jornadaKeys = Object.keys(jornadasData as JornadasData).sort((a, b) => {
    const numA = parseInt(a.split('-')[1]);
    const numB = parseInt(b.split('-')[1]);
    return numA - numB;
  });
  
  const totalJornadas = jornadaKeys.length;
  const currentJornadaKey = `Jornada-${currentJornada}`;
  const currentMatches = (jornadasData as JornadasData)[currentJornadaKey]?.[currentGroup] || [];

  const goToPreviousJornada = () => {
    setCurrentJornada(prev => Math.max(1, prev - 1));
  };

  const goToNextJornada = () => {
    setCurrentJornada(prev => Math.min(totalJornadas, prev + 1));
  };

  return (
    <MatchScheduleContainer>
      {/* <TabContainer>
        <Tab 
          isActive={activeTab === "jornadas"}
          onClick={() => setActiveTab("jornadas")}
        >
          Jornadas
        </Tab>
        <Tab 
          isActive={activeTab === "resultados"}
          onClick={() => setActiveTab("resultados")}
        >
          Resultados
        </Tab>
      </TabContainer> */}

      <NavigationContainer>
        <NavButton 
          onClick={goToPreviousJornada}
          disabled={currentJornada === 1}
        >
          {"<"}
        </NavButton>
        <JornadaTitle>Jornada {currentJornada}</JornadaTitle>
        <NavButton 
          onClick={goToNextJornada}
          disabled={currentJornada === totalJornadas}
        >
          {">"}
        </NavButton>
      </NavigationContainer>

      <MatchesContainer>
        {currentMatches.map((match, index) => {
          const team1Logo = findTeamLogo(match.team1, Object.values(teamsData));
          const team2Logo = findTeamLogo(match.team2, Object.values(teamsData));
          const team1Tbd = isTbd(match.team1);
          const team2Tbd = isTbd(match.team2);

          return (
            <MatchCard key={index}>
              <TeamRow>
                <TeamInfo>
                  {team1Tbd || team1Logo === null ? (
                    <TbdPlaceholder>TBD</TbdPlaceholder>
                  ) : (
                    <TeamLogo
                      src={`/images/teams/season-${season}/${team1Logo}`}
                      alt={match.team1}
                    />
                  )}
                  <TeamName>{match.team1}</TeamName>
                </TeamInfo>
                <Score isPlayed={match.score1 !== null && match.score1 !== "TBD"}>
                  {match.score1 === "TBD" ? "TBD" : (match.score1 ?? "-")}
                </Score>
              </TeamRow>
              <Divider />
              <TeamRow>
                <TeamInfo>
                  {team2Tbd || team2Logo === null ? (
                    <TbdPlaceholder>TBD</TbdPlaceholder>
                  ) : (
                    <TeamLogo
                      src={`/images/teams/season-${season}/${team2Logo}`}
                      alt={match.team2}
                    />
                  )}
                  <TeamName>{match.team2}</TeamName>
                </TeamInfo>
                <Score isPlayed={match.score2 !== null && match.score2 !== "TBD"}>
                  {match.score2 === "TBD" ? "TBD" : (match.score2 ?? "-")}
                </Score>
              </TeamRow>
            </MatchCard>
          );
        })}
      </MatchesContainer>
    </MatchScheduleContainer>
  );
};

const MatchScheduleContainer = styled.div`
  color: white;
  font-family: "Outfit", sans-serif;
  max-width: 400px;
  min-width: 300px;
	width: 100%;
	box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: unset;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: #ff611d;
  }

  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

const JornadaTitle = styled.h2`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  min-width: 100px;
  text-align: center;
`;

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MatchCard = styled.div`
  background-color: #000;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  min-width: 300px;
`;

const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const TeamLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
`;

const TbdPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  color: #888;
  font-size: 10px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
`;

const TeamName = styled.span`
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: white;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 16px;
`;

const Score = styled.span<{ isPlayed: boolean }>`
  font-family: "Outfit", sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.isPlayed ? 'white' : '#666'};
  min-width: 20px;
  text-align: center;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #333;
  margin: 4px 0;
`;
