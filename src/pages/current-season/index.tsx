import { Container } from "../../components/common/Container";
import { BoxProps, GridBox } from "../../components/common/GridBox";
import { SocialCard } from "../../components/home/cards/Socials";
import { MainRootContainer } from "../../components/home/MainContent";
import styled from "styled-components";
import { DateCard } from "../../components/current-season/cards/Dates";
import { MainCard } from "../../components/current-season/cards/Main";
import { LookingForTeamCard } from "../../components/current-season/cards/LookingForTeam";
import { ReactNode } from "react";

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
    component: <SocialCard />,
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
  }
];

export const CurrentSeasonPage = () => {
  return (
    <MainRootContainer
      backgroundImage="/current-season-background.jpg"
      backgroundBlendMode="lighten"
      background="#000000"
      backgroundPosition="bottom"
    >
      <Container>
        <MainContentGroup>
          {bentoElements.map((element) => (
            <GridBox
              key={element.card}
              {...element.gridProps}
            >
              {element.component}
            </GridBox>
          ))}
        </MainContentGroup>
      </Container>
    </MainRootContainer>
  );
};