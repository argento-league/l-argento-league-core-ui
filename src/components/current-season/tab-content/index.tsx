import { ReactNode } from "react";

// Add this declaration to extend the Window interface
declare global {
  interface Window {
    bracketsViewer: any;
  }
}
import { useIsMobile } from "../../../hooks/useIsMobile";
import { InfoTabContentMobile } from "./mobile/Info";
import { InfoTabContent } from "./Info";
import { Container } from "../../common/Container";
import { TabsEnum, TABS_CONFIG } from "../../../constants/current-season/information";
import { GroupStageContent } from "./GroupStage";
import { TeamSelectionContent } from "./TeamSelection";
import styled from "styled-components";
import MainEventMobile from "../../seasons/season-five/MainEventMobile";
import MainEventComponent from "./MainEvent";
import { useSeasonTheme } from "../../../context/SeasonThemeContext";

type TabContentProps = {
  selectedTab: TabsEnum;
};

export const TabContent = ({ selectedTab }: TabContentProps) => {
  const isMobile = useIsMobile(1000);
  const theme = useSeasonTheme();
  // Season 7 usa datos de season-7; Season 6 usa datos de season-6 (no se alteran entre sí)
  const dataSeason = theme.seasonNumber;
  let children: ReactNode | null = null;

  // Evento Principal deshabilitado solo en current-season (Season 7)
  const isEventoPrincipalDisabledForSeason7 =
    dataSeason === 7 && selectedTab === TabsEnum.EventoPrincipal;
  const isTabEnabled =
    (TABS_CONFIG[selectedTab]?.enabled ?? true) && !isEventoPrincipalDisabledForSeason7;

  if (!isTabEnabled) {
    return (
      <Container>
        <DisabledTabMessage>
          <h3>Próximamente</h3>
          <p>Esta sección estará disponible pronto.</p>
        </DisabledTabMessage>
      </Container>
    );
  }

  switch (selectedTab) {
    case TabsEnum.InfoGeneral:
      children = isMobile ? <InfoTabContentMobile /> : <InfoTabContent />;
      break;
    case TabsEnum.Equipos:
      children = <TeamSelectionContent season={dataSeason} />;
      break;
    case TabsEnum.FaseDeGrupos:
      children = <GroupStageContent season={dataSeason} />;
      break;
    case TabsEnum.EventoPrincipal:
      children = (
        <MainEventContainer>
          {isMobile ? (
            <MainEventMobile season={dataSeason} />
          ) : (
            <MainEventComponent season={dataSeason} />
          )}
        </MainEventContainer>
      );
      break;
    default:
      children = null;
  }
  return <Container>{children}</Container>;
};

const MainEventContainer = styled.div`
  color: white;
`;

const DisabledTabMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: white;
  
  h3 {
    font-size: 24px;
    font-family: "Outfit", sans-serif;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: var(--season-primary);
  }
  
  p {
    font-size: 16px;
    font-family: "Rethink Sans", sans-serif;
    margin: 0;
    opacity: 0.8;
  }
`;

