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

type TabContentProps = {
  selectedTab: TabsEnum;
};

export const TabContent = ({ selectedTab }: TabContentProps) => {
  const isMobile = useIsMobile(1000);
  let children: ReactNode | null = null;
  
  // Verificar si la pestaña está habilitada
  const isTabEnabled = TABS_CONFIG[selectedTab]?.enabled ?? true;
  
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
      children = <TeamSelectionContent />;
      break;
    case TabsEnum.FaseDeGrupos:
      children = <GroupStageContent season={6} />;
      break;
    case TabsEnum.EventoPrincipal:
      children = (
        <MainEventContainer>
          {isMobile ? (
            <MainEventMobile season={6} />
          ) : (
            <MainEventComponent season={6} />
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
    color: rgba(80, 255, 16, 1);
  }
  
  p {
    font-size: 16px;
    font-family: "Rethink Sans", sans-serif;
    margin: 0;
    opacity: 0.8;
  }
`;

