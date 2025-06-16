import styled from "styled-components";
import { SeasonWinner } from "./cards/season-winner";
import { MainCard } from "./cards/main";
import { FeatureCard } from "./cards/features";
import { NewsCard } from "./cards/news";
import { SocialCard } from "./cards/socials";

const MainRootContainer = styled.div`
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  gap: 16px;
  background: #3b6377;
  background-image: url("/home-background.jpg");

  background-blend-mode: multiply;
  @media (max-width: 720px) {
    padding: 16px;
  }
`;

const MainContentGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(5, 120px);
  gap: 16px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(11, 150px);
  }
`;

interface BoxProps {
  backgroundColor?: string;
  col?: string;
  row?: string;
  colTablet?: string;
  rowTablet?: string;
  colMobile?: string;
  rowMobile?: string;
}

const GridBox = styled.div<BoxProps>`
  background-color: ${(props) => props.backgroundColor || "black"};
  color: white;
  border-radius: 8px;

  /* Desktop */
  grid-column: ${(props) => props.col || "1 / 6"};
  grid-row: ${(props) => props.row || "1 / 3"};

  /* Tablet */
  @media (max-width: 1024px) {
    grid-column: ${(props) => props.colTablet || "1 / 6"};
    grid-row: ${(props) => props.rowTablet || "1 / 3"};
  }
`;

export const MainContent = () => {
  return (
    <MainRootContainer>
      <MainContentGroup>
        <GridBox
          col="1 / 13"
          row="1 / 4"
          colTablet="1 / 13"
          rowTablet="1 / 4"
          colMobile="1 / -1"
          backgroundColor="#00000080"
        >
          <MainCard />
        </GridBox>
        <GridBox
          col="13 / 21"
          row="1 / 1"
          colTablet="1 / 13"
          rowTablet="6 / 8"
          backgroundColor="transparent"
        >
          <SeasonWinner />
        </GridBox>
        <GridBox
          col="13 / 21"
          row="2 / 2"
          colTablet="1 / 13"
          rowTablet="11 / 12"
        >
          <SocialCard />
        </GridBox>
        <GridBox
          col="1 / 7"
          row="4 / 5"
          colTablet="1 / 7"
          rowTablet="4 / 5"
          colMobile="1 / -1"
        >
          <FeatureCard
            title={"🏆"}
            description={"Liga tier 4 abierta \n para todos"}
          />
        </GridBox>
        <GridBox
          col="7 / 13"
          row="4 / 5"
          colTablet="7 / 13"
          rowTablet="4 / 5"
          colMobile="1 / -1"
        >
          <FeatureCard
            title="🌎"
            description={"Jugadores de toda \n Latinoamérica"}
          />
        </GridBox>
        <GridBox
          col="1 / 7"
          row="5 / 6"
          colTablet="1 / 7"
          rowTablet="5 / 6"
          colMobile="1 / -1"
        >
          <FeatureCard
            title="📝"
            description={
              "Inscríbete con tu equipo o únete como jugador disponible"
            }
          />
        </GridBox>
        <GridBox
          col="7 / 13"
          row="5 / 6"
          colTablet="7 / 13"
          rowTablet="5 / 6"
          colMobile="1 / -1"
        >
          <FeatureCard
            title="⚔️"
            description={"¡Demuestra tu nivel y \n sube en la escena!"}
          />
        </GridBox>
        <GridBox
          col="13 / 21"
          row="3 / 6"
          colTablet="1 / 13"
          rowTablet="8 / 11"
        >
          <NewsCard />
        </GridBox>
      </MainContentGroup>
    </MainRootContainer>
  );
};
