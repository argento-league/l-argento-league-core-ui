import { Container } from "../../components/common/Container";
import { BoxProps, GridBox } from "../../components/common/GridBox";
import { SocialCard } from "../../components/home/cards/Socials";
import { MainRootContainer } from "../../components/home/MainContent";
import styled from "styled-components";
import { DateCard } from "../../components/current-season/cards/Dates";
import { MainCard } from "../../components/current-season/cards/Main";
import { LookingForTeamCard } from "../../components/current-season/cards/LookingForTeam";
import { ReactNode, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { InfoGeneralMobile } from "./mobile/GeneralInfo";

export const ContentContainer = styled.div`
  padding: 24px;
  border: 1px solid #fabf4a;
  border-radius: 16px;
  font-family: Rethink Sans, sans-serif;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const MainContentGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(5, 120px);
  gap: 16px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(7, 150px);
  }
`;

const TabsContainer = styled.div`
  background-color: #090909;
  padding-top: 16px;
  box-sizing: border-box;
  color: white;
  font-family: Outfit, sans-serif;
  display: flex;
  overflow-x: auto;
`;

const TabsWrapper = styled.div`
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  gap: 16px;
  width: 100%;
`;

const InfoGeneralContainer = styled.div`
  min-height: 300px;
  padding: 64px;
  gap: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
`;

const MenuContainer = styled.div`
  max-width: 384px;
  width: 100%;
`;

export const ContentTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

export const ContentText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

export const ContentListItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

type GridElementProps = {
  card: string;
  gridProps: BoxProps;
  component: ReactNode;
};

const bentoElements: GridElementProps[] = [
  {
    card: "MainCard",
    gridProps: {
      col: "1 / 13",
      row: "1 / 6",
      colTablet: "1 / 13",
      rowTablet: "1 / 3",
      backgroundColor: "inherit",
    },
    component: <MainCard />,
  },
  {
    card: "LookingForTeamCard",
    gridProps: {
      col: "13 / 21",
      row: "3 / 5",
      colTablet: "1 / 13",
      rowTablet: "5 / 7",
      backgroundColor: "inherit",
    },
    component: <LookingForTeamCard />,
  },
  {
    card: "SocialCard",
    gridProps: {
      col: "13 / 21",
      row: "5 / 6",
      colTablet: "1 / 13",
      rowTablet: "7 / 8",
      backgroundColor: "inherit",
    },
    component: <SocialCard iconColor="#FF611D" />,
  },
  {
    card: "DateCard",
    gridProps: {
      col: "13 / 21",
      row: "1 / 3",
      colTablet: "1 / 13",
      rowTablet: "3 / 5",
      backgroundColor: "inherit",
    },
    component: <DateCard />,
  },
];

export const CurrentSeasonPage = () => {
  const isMobile = useIsMobile(720);
  const backgroundImage = isMobile
    ? "/mobile-season-5-background.png"
    : "/current-season-background.jpg";

  return (
    <div>
      <MainRootContainer
        backgroundImage={backgroundImage}
        backgroundBlendMode="lighten"
        background="#000000"
        backgroundPosition="center"
      >
        <Container>
          <MainContentGroup>
            {bentoElements.map((element) => (
              <GridBox key={element.card} {...element.gridProps}>
                {element.component}
              </GridBox>
            ))}
          </MainContentGroup>
        </Container>
      </MainRootContainer>
      <Container>
        <CurrentSeasonDetails />
      </Container>
    </div>
  );
};

type TabsProps = {
  selected?: boolean;
};

const MobileTabsWrapper = styled(TabsWrapper)`
  padding: 0px;
`;

const Tabs = styled.div<TabsProps>`
  display: flex;
  fontsize: 14px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  width: 100%;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-weight: ${(props) => (props.selected ? "600" : "300")};
  ${(props) => (props.selected ? "border-bottom: 1px solid #FF611D;" : "")};
`;

const MobileTabs = styled(Tabs)`
  padding: 16px;
`;

enum TabsEnum {
  InfoGeneral = "Info General",
  Equipos = "Equipos",
  FaseDeGrupos = "Fase de grupos",
  EventoPrincipal = "Evento Principal",
}

const CurrentSeasonDetails = () => {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(
    TabsEnum.InfoGeneral
  );
  const isMobile = useIsMobile(720);

  return (
    <div>
      <TabsContainer>
        {isMobile ? (
          <MobileTabsWrapper>
            {Object.values(TabsEnum).map((tab) => (
              <MobileTabs
                key={tab}
                selected={selectedTab === tab}
                onClick={() => setSelectedTab(tab as TabsEnum)}
              >
                {tab}
              </MobileTabs>
            ))}
          </MobileTabsWrapper>
        ) : (
          <TabsWrapper>
            {Object.values(TabsEnum).map((tab) => (
              <Tabs
                key={tab}
                selected={selectedTab === tab}
                onClick={() => setSelectedTab(tab as TabsEnum)}
              >
                {tab}
              </Tabs>
            ))}
          </TabsWrapper>
        )}
      </TabsContainer>

      {!isMobile ? <InfoGeneral /> : <InfoGeneralMobile />}
    </div>
  );
};

export const AnswerText = styled.div<{ open: boolean }>`
  opacity: ${({ open }) => (open ? 1 : 0)};
  max-height: ${({ open }) => (open ? "800px" : "0px")};
  overflow: hidden;
  font-size: 16px;
  background-color: black;
`;

type MenuItemContainerProps = {
  isSelected: boolean;
  hasBorder?: boolean;
};

const MenuItemContainer = styled.div<MenuItemContainerProps>`
  padding: 16px;
  background-color: ${(props) => (props.isSelected ? "#FABF4A33" : "black")};
  border: ${(props) => (props.hasBorder ? "1px solid #FF611D" : "none")};
  color: "white";
  border-radius: 16px;
  cursor: pointer;
  font-family: Outfit, sans-serif;
  font-size: 18px;
  font-weight: 600;
`;

export const MobileMenuItemContainer = styled(
  MenuItemContainer
)<MenuItemContainerProps>`
  border-radius: ${(props) =>
    props.isSelected ? "16px 16px 0px 0px" : "16px"};
  background-color: ${(props) => (props.isSelected ? "#FF611D" : "black")};
  color: ${(props) => (props.isSelected ? "black" : "#FF611D")};
`;

const InfoGeneral = () => {
  const [selectedSubject, setSelectedSubject] = useState<INFORMATION_ENUM>(
    INFORMATION_ENUM.ARMADO_DE_EQUIPO
  );

  return (
    <InfoGeneralContainer>
      <MenuContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.ARMADO_DE_EQUIPO}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.ARMADO_DE_EQUIPO)}
        >
          <span>Armado de equipos</span>
        </MenuItemContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.CAPITANES}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.CAPITANES)}
        >
          <span>Capitanes</span>
        </MenuItemContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.CUENTAS_DE_STEAM}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.CUENTAS_DE_STEAM)}
        >
          <span>Cuentas de Steam</span>
        </MenuItemContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.FECHAS_DE_JUEGO}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.FECHAS_DE_JUEGO)}
        >
          <span>Fechas de juego</span>
        </MenuItemContainer>
      </MenuContainer>
      <div style={{ width: "100%" }}>
        <ContentContainer>
          <ContentTitle>{information[selectedSubject].title}</ContentTitle>
          {information[selectedSubject].description?.length > 1 ? (
            information[selectedSubject].description.map((el) => (
              <ContentListItem key={el}>{el}</ContentListItem>
            ))
          ) : (
            <ContentText>
              {information[selectedSubject].description}
            </ContentText>
          )}
        </ContentContainer>
      </div>
    </InfoGeneralContainer>
  );
};

type Information = {
  subject?: string;
  title: string;
  description: string[];
};

enum INFORMATION_ENUM {
  ARMADO_DE_EQUIPO = "Armado de equipos",
  CAPITANES = "Capitanes",
  CUENTAS_DE_STEAM = "Cuentas de Steam",
  FECHAS_DE_JUEGO = "Fechas de juego",
}

const information: Record<INFORMATION_ENUM, Information> = {
  [INFORMATION_ENUM.ARMADO_DE_EQUIPO]: {
    title: "Medalla libre",
    description: [
      "La medalla de los jugadores es libre. Los equipos pueden conformarse con jugadores de cualquier medalla, el único requisito es que el equipo en juego no debe superar la suma de 36.500 de mmr.",
      "El roster puede contar con 5 titulares y 3 suplentes.",
      "Esta limitado los jugadores peruanos nuevos por equipos a 2.",
    ],
  },
  [INFORMATION_ENUM.CAPITANES]: {
    title: "Capitanes",
    description: [
      "Todos los capitanes de un equipo deben ser hispanohablantes y comunicarse con el staff para poder ser notificados de los eventos de la season.",
    ],
  },
  [INFORMATION_ENUM.CUENTAS_DE_STEAM]: {
    title: "Players en la liga",
    description: [
      "Todas las cuentas tienen que estar calibradas, tener mas de 5k horas y 4k de partidas (cualquier duda consultar con el Staff).",
      "Perfil de dota y steam tienen que ser públicos al momento de la inscripción.",
    ],
  },
  [INFORMATION_ENUM.FECHAS_DE_JUEGO]: {
    title: "Días y horarios",
    description: [
      "El staff definirá las semanas en las que se deba jugar cada instancia de la season.",
      "Los días y horarios serán arreglados por los capitanes de los equipos y notificados al staff.",
      "En caso de no acordar un día y horario entre capitanes, el staff definirá uno por defecto.",
    ],
  },
};
