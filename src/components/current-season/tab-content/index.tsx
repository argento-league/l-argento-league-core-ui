import { ReactNode, useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { InfoTabContentMobile } from "./mobile/Info";
import { InfoTabContent } from "./Info";
import { Container } from "../../common/Container";
import { TabsEnum } from "../../../constants/current-season/information";
import styled from "styled-components";
import teamJson from "@data/season-5/teams.json";

// Define the type for the team data structure
type TeamData = {
  name: string;
  logo: string;
  players: {
    nick: string;
    nationality: string;
  }[];
};

// Create an index signature for the teamJson
type TeamJsonType = {
  [key: string]: TeamData;
};

type TabContentProps = {
  selectedTab: TabsEnum;
};

export const TabContent = ({ selectedTab }: TabContentProps) => {
  const isMobile = useIsMobile(768); // Consistent breakpoint
  let children: ReactNode | null = null;
  switch (selectedTab) {
    case TabsEnum.InfoGeneral:
      children = isMobile ? <InfoTabContentMobile /> : <InfoTabContent />;
      break;
    case TabsEnum.Equipos:
      children = <NewFaseDeGrupos />;
      break;
    default:
      children = null;
  }
  return <Container>{children}</Container>;
};

const teams = Object.keys(teamJson);

// Shared hook for team navigation logic
const useTeamNavigation = (selectedTeam: string, setSelectedTeam: (team: string) => void) => {
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

  return { goToPreviousTeam, goToNextTeam };
};

const NewFaseDeGrupos = () => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const { goToPreviousTeam, goToNextTeam } = useTeamNavigation(selectedTeam, setSelectedTeam);
  const typedTeamJson = teamJson as TeamJsonType;
  const isMobile = useIsMobile(768);
  
  if (isMobile) {
    return <FaseDeGruposMobile selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />;
  }
  
  return (
    <FaseDeGruposContainer>
      <TeamLogoContainer>
        {teams.map((teamName: string) => (
          <TeamLogoCard key={teamName} isSelected={teamName === selectedTeam}>
            <TeamLogo
              src={`/images/teams/season-5/${typedTeamJson[teamName].logo}`}
              alt={teamName}
              onClick={() => setSelectedTeam(teamName)}
            />
          </TeamLogoCard>
        ))}
      </TeamLogoContainer>
      <TeamInformationContainer>
        <TeamHeader>
          <ArrowButton onClick={goToPreviousTeam}>{"<"}</ArrowButton>
          <TeamName>{typedTeamJson[selectedTeam]?.name}</TeamName>
          <ArrowButton onClick={goToNextTeam}>{">"}</ArrowButton>
        </TeamHeader>
        <TeamLogo
          src={`/images/teams/season-5/${typedTeamJson[selectedTeam]?.logo}`}
          alt="Team Logo"
          style={{ width: "120px", height: "120px" }}
        />
        <PlayersList>
          {typedTeamJson[selectedTeam]?.players.map((player) => (
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

type FaseDeGruposMobileProps = {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
};

const FaseDeGruposMobile = ({ selectedTeam, setSelectedTeam }: FaseDeGruposMobileProps) => {
  const { goToPreviousTeam, goToNextTeam } = useTeamNavigation(selectedTeam, setSelectedTeam);
  const typedTeamJson = teamJson as TeamJsonType;
  
  return (
    <MobileContainer>
      <TeamLogoMobileContainer>
        {teams.map((teamName: string) => (
          <TeamLogoMobileCard 
            key={teamName} 
            isSelected={teamName === selectedTeam}
            onClick={() => setSelectedTeam(teamName)}
          >
            <TeamLogoMobile
              src={`/images/teams/season-5/${typedTeamJson[teamName].logo}`}
              alt={teamName}
            />
          </TeamLogoMobileCard>
        ))}
      </TeamLogoMobileContainer>
      
      <TeamInformationMobileContainer>
        <TeamHeader>
          <ArrowButton onClick={goToPreviousTeam}>{"<"}</ArrowButton>
          <TeamName>{typedTeamJson[selectedTeam]?.name}</TeamName>
          <ArrowButton onClick={goToNextTeam}>{">"}</ArrowButton>
        </TeamHeader>
        
        <TeamLogoSelected
          src={`/images/teams/season-5/${typedTeamJson[selectedTeam]?.logo}`}
          alt="Team Logo"
        />
        
        <PlayersListMobile>
          {typedTeamJson[selectedTeam]?.players.map((player) => (
            <PlayerItemMobile key={player.nick}>
              <CountryFlag
                src={`/images/countries/${player.nationality}.svg`}
                alt={player.nationality.toUpperCase()}
              />
              <PlayerName>{player.nick}</PlayerName>
            </PlayerItemMobile>
          ))}
        </PlayersListMobile>
      </TeamInformationMobileContainer>
    </MobileContainer>
  );
};

const FaseDeGruposContainer = styled.div`
  margin: 16px 0px;
	padding-left: 64px;
  gap: 16px;
  display: flex;
  flex-direction: row;
  color: white;
`;

const TeamLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
	cursor: pointer;
`;

const TeamLogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

type TeamLogoCardProps = {
	isSelected?: boolean;
};

const TeamLogoCard = styled.div<TeamLogoCardProps>`
  box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items:center;
  padding: 16px 16px 8px 16px;
  border-radius: 8px;
  border: 1px solid #ff611d;
  min-width: 200px;
  height: 124px;
  text-align: center;
	background-color: ${(props) => (props.isSelected ? "#FF611D1A" : "inherit")};
`;

const TeamInformationContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
	background-color: #131313;
`;

const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const TeamName = styled.h2`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
	text-align: center;
	overflow: hidden;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #ff611d;
  }
`;

const PlayersList = styled.div`
  top: 0;
  gap: 8px;
  width: 100%;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #ff611d;
`;

const CountryFlag = styled.img`
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
`;

const PlayerName = styled.span`
  color: white;
  font-family: "Rethink Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

// Mobile styled components
const MobileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 16px;
  box-sizing: border-box;
  gap: 16px;
`;

const TeamLogoMobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  padding: 12px 8px;
  -webkit-overflow-scrolling: touch;
  
  /* Hide scrollbar while maintaining scroll functionality */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TeamLogoMobileCard = styled.div<TeamLogoCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.isSelected ? "#FF611D" : "#555")};
  padding: 8px;
  min-width: 70px;
  height: 70px;
  flex-shrink: 0;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#FF611D1A" : "transparent")};
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.95);
  }
`;

const TeamLogoMobile = styled.img`
  width: 54px;
  height: 54px;
  object-fit: contain;
  border-radius: 4px;
`;

const TeamInformationMobileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: #131313;
  border-radius: 12px;
	box-sizing: border-box;
`;

const TeamLogoSelected = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  margin: 16px 0;
`;

const PlayersListMobile = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const PlayerItemMobile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #ff611d;
  
  &:last-child {
    border-bottom: none;
  }
`;
