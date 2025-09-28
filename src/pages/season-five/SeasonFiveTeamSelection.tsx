import { useState } from "react";
import styled from "styled-components";
import { useIsMobile } from "../../hooks/useIsMobile";
import teamJson from "../../data/season-5/teams.json";
import { TeamJsonType } from "../../types/teams";

const FaseDeGruposContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px;
  width: 100%;
`;

const TeamLogoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
`;

const TeamLogoCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: ${({ isSelected }) => (isSelected ? "#321156" : "#1a1a1a")};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: ${({ isSelected }) => (isSelected ? "2px solid #fabf4a" : "2px solid transparent")};

  &:hover {
    background-color: #2a2a2a;
  }
`;

const TeamLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const TeamName = styled.span`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const TeamInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 600px;
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const ArrowButton = styled.button`
  background-color: #fabf4a;
  color: #000;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e6a942;
  }
`;

const TeamNameLarge = styled.h2`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  flex: 1;
  text-align: center;
`;

const TeamLogoLarge = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  margin: 16px 0;
`;

const PlayersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #1a1a1a;
  border-radius: 8px;
`;

const CountryFlag = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const PlayerName = styled.span`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: white;
`;

const ComingSoonTitle = styled.h3`
  font-size: 24px;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #fabf4a;
`;

const ComingSoonText = styled.p`
  font-size: 16px;
  font-family: "Rethink Sans", sans-serif;
  margin: 0;
  opacity: 0.8;
`;

export const SeasonFiveTeamSelection = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const isMobile = useIsMobile(768);
  
  const typedTeamJson = teamJson as TeamJsonType;
  const teams = Object.keys(typedTeamJson);
  
  console.log("Season 5 teams:", teams);
  console.log("Selected team:", selectedTeam);
  
  // Initialize selectedTeam if not set
  if (!selectedTeam && teams.length > 0) {
    setSelectedTeam(teams[0]);
    return null; // Re-render will happen with the new state
  }

  const goToPreviousTeam = () => {
    const currentIndex = teams.indexOf(selectedTeam);
    const prevIndex = (currentIndex - 1 + teams.length) % teams.length;
    setSelectedTeam(teams[prevIndex]);
  };

  const goToNextTeam = () => {
    const currentIndex = teams.indexOf(selectedTeam);
    const nextIndex = (currentIndex + 1) % teams.length;
    setSelectedTeam(teams[nextIndex]);
  };

  // Show mobile message for now
  if (isMobile) {
    return (
      <ComingSoonContainer>
        <ComingSoonTitle>Próximamente</ComingSoonTitle>
        <ComingSoonText>Vista móvil de equipos estará disponible pronto.</ComingSoonText>
      </ComingSoonContainer>
    );
  }

  return (
    <FaseDeGruposContainer>
      <TeamLogoContainer>
        {teams.map((teamName: string) => {
          const teamData = typedTeamJson[teamName];
          if (!teamData) {
            console.warn(`Team data not found for: ${teamName}`);
            return null;
          }
          return (
            <TeamLogoCard key={teamName} isSelected={teamName === selectedTeam}>
              <TeamLogo
                src={`/images/teams/season-5/${teamData.logo}`}
                alt={teamName}
                onClick={() => setSelectedTeam(teamName)}
              />
              <TeamName>{teamData.name}</TeamName>
            </TeamLogoCard>
          );
        })}
      </TeamLogoContainer>
      <TeamInformationContainer>
        <TeamHeader>
          <ArrowButton onClick={goToPreviousTeam}>{"<"}</ArrowButton>
          <TeamNameLarge>{typedTeamJson[selectedTeam]?.name || selectedTeam}</TeamNameLarge>
          <ArrowButton onClick={goToNextTeam}>{">"}</ArrowButton>
        </TeamHeader>
        <TeamLogoLarge
          src={`/images/teams/season-5/${typedTeamJson[selectedTeam]?.logo}`}
          alt="Team Logo"
        />
        <PlayersList>
          {typedTeamJson[selectedTeam]?.players?.map((player) => (
            <PlayerItem key={player.nick}>
              <CountryFlag
                src={`/images/countries/${player.nationality}.svg`}
                alt={player.nationality.toUpperCase()}
              />
              <PlayerName>{player.nick}</PlayerName>
            </PlayerItem>
          ))}
        </PlayersList>
      </TeamInformationContainer>
    </FaseDeGruposContainer>
  );
};
