import styled from "styled-components";
import { useState } from "react";
import GroupStandings from "../../pages/season-four/GroupStandings";
import DoubleElimination from "../../pages/season-four/DoubleEliminationBracket";
import { Container } from "../common/Container";

const SeasonFourContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SeasonFourBanner = styled.div`
  height: 100px;
  width: 100%;
  background-color: #321156;
  display: flex;
  align-items: center;
  justify-content: center;
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
  line-height: 24px;
  padding: 16px 32px;
`;

enum SEASON_FOUR_TABS {
  FASE = "fase",
  EVENTO = "evento",
}

export const SeasonFour = () => {
  const [activeTab, setActiveTab] = useState<SEASON_FOUR_TABS>(
    SEASON_FOUR_TABS.FASE
  );

  const handleTabClick = (tab: SEASON_FOUR_TABS) => {
    setActiveTab(tab);
  };

  return (
    <SeasonFourContainer>
      <SeasonFourBanner>
        <Container>
          <Title>Season 4</Title>
        </Container>
      </SeasonFourBanner>
      <TabContainer>
        <Container>
          <TabItem
            active={activeTab === SEASON_FOUR_TABS.FASE}
            onClick={() => handleTabClick(SEASON_FOUR_TABS.FASE)}
          >
            Fase de grupos
          </TabItem>
          <TabItem
            active={activeTab === SEASON_FOUR_TABS.EVENTO}
            onClick={() => setActiveTab(SEASON_FOUR_TABS.EVENTO)}
          >
            Evento principal
          </TabItem>
        </Container>
      </TabContainer>
      {activeTab === SEASON_FOUR_TABS.FASE && <GroupStandings />}
      {activeTab === SEASON_FOUR_TABS.EVENTO && <DoubleElimination />}
    </SeasonFourContainer>
  );
};
