import styled from "styled-components";
import { SeasonWinner } from "./cards/SeasonWinner";
import { MainCard } from "./cards/Main";
import { FeatureCard } from "./cards/Features";
import { NewsCard } from "./cards/News";
import { SocialCard } from "./cards/Socials";
import { Container } from "../common/Container";
import { CURRENT_SEASON_COLORS } from "../../constants/season-colors";

type MainRootContainerProps = {
  backgroundImage?: string;
  backgroundBlendMode?: string;
  background?: string;
  backgroundPosition?: string;
}

export const MainRootContainer = styled.div<MainRootContainerProps>`
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  gap: 16px;
  background: ${(props) => props.background || "#3b6377"};
  background-image: url(${(props) => props.backgroundImage || "/home-background.jpg"});
  background-blend-mode: ${(props) => props.backgroundBlendMode || "multiply"};
  background-size: cover;
  ${(props) => props.backgroundPosition ? `background-position: ${props.backgroundPosition};` : ""};

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
    grid-template-rows: repeat(10, 150px);
  }
`;

interface BoxProps {
  backgroundColor?: string;
  col?: string;
  row?: string;
  colTablet?: string;
  rowTablet?: string;
}

const GridBox = styled.div<BoxProps>`
  background-color: ${(props) => props.backgroundColor || "inherit"};
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
    <MainRootContainer background="#3b6377" backgroundImage="/home-background.jpg" backgroundBlendMode="multiply">
      <Container>
        <MainContentGroup>
          <GridBox
            col="1 / 13"
            row="1 / 4"
            colTablet="1 / 13"
            rowTablet="1 / 3"
            backgroundColor="#00000080"
          >
            <MainCard />
          </GridBox>
          <GridBox
            col="13 / 21"
            row="1 / 1"
            colTablet="1 / 13"
            rowTablet="5 / 7"
            backgroundColor="transparent"
          >
            <SeasonWinner />
          </GridBox>
          <GridBox
            col="13 / 21"
            row="2 / 2"
            colTablet="1 / 13"
            rowTablet="10 / 11"
          >
            <SocialCard iconColor={CURRENT_SEASON_COLORS.primary} />
          </GridBox>
          <GridBox
            col="1 / 7"
            row="4 / 5"
            colTablet="1 / 7"
            rowTablet="3 / 4"

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
            rowTablet="3 / 4"
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
            rowTablet="4 / 5"
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
            rowTablet="4 / 5"
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
            rowTablet="7 / 10"
            backgroundColor="inherit"
          >
            <NewsCard />
          </GridBox>
        </MainContentGroup>
      </Container>
    </MainRootContainer>
  );
};
