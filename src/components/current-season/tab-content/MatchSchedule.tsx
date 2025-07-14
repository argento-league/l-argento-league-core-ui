import { useState } from "react";
import styled from "styled-components";
import jornadasData from "../../../data/season-5/jornadas.json";

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
};

export const MatchScheduleContent = ({ currentGroup = "grupo-a" }: MatchScheduleProps) => {
  const [currentJornada, setCurrentJornada] = useState(1);
  
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
        {currentMatches.map((match, index) => (
          <MatchCard key={index}>
            <TeamRow>
              <TeamName>{match.team1}</TeamName>
              <Score isPlayed={match.score1 !== null}>
                {match.score1 ?? "-"}
              </Score>
            </TeamRow>
            <Divider />
            <TeamRow>
              <TeamName>{match.team2}</TeamName>
              <Score isPlayed={match.score2 !== null}>
                {match.score2 ?? "-"}
              </Score>
            </TeamRow>
          </MatchCard>
        ))}
      </MatchesContainer>
    </MatchScheduleContainer>
  );
};

const MatchScheduleContainer = styled.div`
  color: white;
  font-family: "Outfit", sans-serif;
  max-width: 500px;
	width: 100%;
	box-sizing: border-box;  
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
  padding: 16px;
`;

const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const TeamName = styled.span`
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: white;
  flex: 1;
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
