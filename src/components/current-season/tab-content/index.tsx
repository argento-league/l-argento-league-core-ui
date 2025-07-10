import { ReactNode, useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { InfoTabContentMobile } from "./mobile/Info";
import { InfoTabContent } from "./Info";
import { TeamsTabContent } from "./Team";
import { Container } from "../../common/Container";
import { TabsEnum } from "../../../constants/current-season/information";
import styled from "styled-components";
import teamJson from "@data/season-5/teams.json";

type TabContentProps = {
  selectedTab: TabsEnum;
};

export const TabContent = ({ selectedTab }: TabContentProps) => {
  const isMobile = useIsMobile(720);
  let children: ReactNode | null = null;
  switch (selectedTab) {
    case TabsEnum.InfoGeneral:
      children = isMobile ? <InfoTabContentMobile /> : <InfoTabContent />;
      break;
    case TabsEnum.Equipos:
      children = <TeamsTabContent />;
      break;
    case TabsEnum.FaseDeGrupos:
      children = <FaseDeGrupos />;
      break;
    default:
      children = null;
  }
  return <Container>{children}</Container>;
};

const teams = Object.keys(teamJson);

const FaseDeGrupos = () => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  return (
    <FaseDeGruposContainer>
      <TeamLogoContainer>
        {teams.map((teamName) => (
          <TeamLogoCard key={teamName}>
            <TeamLogo
              src={`/images/teams/season-5/${teamJson[teamName].logo}`}
              alt={teamName}
              onClick={() => setSelectedTeam(teamName)}
            />
          </TeamLogoCard>
        ))}
      </TeamLogoContainer>
      <TeamInformationContainer>
        <TeamHeader>
          <ArrowButton 
          onClick={() => {
            const currentIndex = teams.indexOf(selectedTeam);
            const prevIndex = (currentIndex - 1 + teams.length) % teams.length;
            setSelectedTeam(teams[prevIndex]);
          }}
          >{"<"}</ArrowButton>
          <TeamName>{teamJson[selectedTeam as string]?.name}</TeamName>
          <ArrowButton
          onClick={() => {
            const currentIndex = teams.indexOf(selectedTeam);
            const nextIndex = (currentIndex + 1) % teams.length;
            setSelectedTeam(teams[nextIndex]);
          }}
          >{">"}</ArrowButton>
        </TeamHeader>
        <TeamLogo
          src={`/images/teams/season-5/${teamJson[selectedTeam as string]?.logo}`}
          alt="Team Logo"
          style={{ width: "120px", height: "120px" }}
        />
        <PlayersList>
          {teamJson[selectedTeam as string]?.players.map((player) => (
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

const FaseDeGruposContainer = styled.div`
  padding: 0px 64px;
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
  padding-top: 16px;
`;

const TeamLogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TeamLogoCard = styled.div`
  padding: 16px 16px 8px 16px;
  border-radius: 8px;
  border: 1px solid #ff611d;
  min-width: 200px;
  height: 124px;
  text-align: center;
`;

const TeamInformationContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
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
  font-size: 24px;
  font-weight: 600;
  margin: 0;
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
  padding: 8px 0;
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
  font-size: 16px;
  font-weight: 400;
`;
