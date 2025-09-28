import styled from "styled-components";
import { useState } from "react";
import { Container } from "../../components/common/Container";
import { TeamSelectionContent } from "../../components/current-season/tab-content/TeamSelection";
import { GroupStageContent } from "../../components/current-season/tab-content/GroupStage";
import MainEventMobile from "../../components/seasons/season-five/MainEventMobile";
import MainEvent from "../../components/current-season/tab-content/MainEvent";
import { useIsMobile } from "../../hooks/useIsMobile";

const SeasonFiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SeasonFiveBanner = styled.div`
  height: 100px;
  width: 100%;
  background-color: #321156;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainEventContainer = styled.div`
  color: white;
`;

const Title = styled.h2`
  color: #fabf4a;
  font-family: "Montserrat", sans-serif;
  line-height: 42px;
  font-size: 32px;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  background-color: #321156;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const TabItem = styled.div<{ active: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? "#281541" : "#321156")};
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  padding: 16px 8px;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  min-height: 64px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 2px;
    min-height: 64px;
    white-space: normal;
    line-height: 1.1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 8px 1px;
    min-height: 60px;
  }
`;

enum SEASON_FIVE_TABS {
  EQUIPOS = "equipos",
  FASE = "fase",
  EVENTO = "evento",
}

export const SeasonFive = () => {
  const [activeTab, setActiveTab] = useState<SEASON_FIVE_TABS>(
    SEASON_FIVE_TABS.EQUIPOS
  );
  const isMobile = useIsMobile(1000);

  const handleTabClick = (tab: SEASON_FIVE_TABS) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <SeasonFiveContainer id="season-five">
        <SeasonFiveBanner>
          <Title>Season 5</Title>
        </SeasonFiveBanner>
        <TabContainer>
          <TabItem
            active={activeTab === SEASON_FIVE_TABS.EQUIPOS}
            onClick={() => handleTabClick(SEASON_FIVE_TABS.EQUIPOS)}
          >
            Equipos
          </TabItem>
          <TabItem
            active={activeTab === SEASON_FIVE_TABS.FASE}
            onClick={() => handleTabClick(SEASON_FIVE_TABS.FASE)}
          >
            Fase de grupos
          </TabItem>
          <TabItem
            active={activeTab === SEASON_FIVE_TABS.EVENTO}
            onClick={() => handleTabClick(SEASON_FIVE_TABS.EVENTO)}
          >
            Evento principal
          </TabItem>
        </TabContainer>
        {activeTab === SEASON_FIVE_TABS.EQUIPOS && <TeamSelectionContent season={5} />}
        {activeTab === SEASON_FIVE_TABS.FASE && <GroupStageContent season={5} />}
        {activeTab === SEASON_FIVE_TABS.EVENTO && (
          <MainEventContainer>
            {isMobile ? <MainEventMobile /> : <MainEvent />}
          </MainEventContainer>
        )}
      </SeasonFiveContainer>
    </Container>
  );
};
