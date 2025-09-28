import { ReactNode } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Container } from "../common/Container";
import { SocialCard } from "../home/cards/Socials";
import { MainRootContainer } from "../home/MainContent";
import { DateCard } from "./cards/Dates";
import { MainCard } from "./cards/Main";
import { BoxProps, GridBox } from "../common/GridBox";
import styled from "styled-components";
import { CURRENT_SEASON_COLORS } from "../../constants/season-colors";

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
  // {
  //   card: "LookingForTeamCard",
  //   gridProps: {
  //     col: "13 / 21",
  //     row: "3 / 5",
  //     colTablet: "1 / 13",
  //     rowTablet: "5 / 7",
  //     backgroundColor: "inherit",
  //   },
  //   component: <LookingForTeamCard />,
  // },
  {
    card: "SocialCard",
    gridProps: {
      col: "13 / 21",
      row: "4 / 5",
      colTablet: "1 / 13",
      rowTablet: "6 / 7",
      backgroundColor: "inherit",
    },
    component: <SocialCard iconColor={CURRENT_SEASON_COLORS.primary} />,
  },
  {
    card: "DateCard",
    gridProps: {
      col: "13 / 21",
      row: "1 / 4",
      colTablet: "1 / 13",
      rowTablet: "3 / 6",
      backgroundColor: "inherit",
    },
    component: <DateCard />,
  },
];

const MainContentGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(5, 90px);
  gap: 8px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(7, 90px);
  }
`;

export const CurrentSeasonGrid = () => {
  const isMobile = useIsMobile(720);
  const backgroundImage = isMobile
    ? "/mobile-season-5-background.png"
    : "/images/NewsCardBackgroundImage.png";

  return (
    <MainRootContainer
      backgroundImage={backgroundImage}
      backgroundBlendMode="normal"
      background="rgba(0, 0, 0, 0.3)"
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
  );
};
