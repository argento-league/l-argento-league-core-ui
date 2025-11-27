import styled from "styled-components";
import { JoinDiscordButton } from "@components/common/JoinDiscordButton";
import { Button } from "@components/common/Button";
import { SEASON_COLORS } from "../../../constants/season-colors";

const NewsCardContainer = styled.section`
  padding-top: 32px;
  padding-right: 48px;
  padding-bottom: 32px;
  padding-left: 48px;
  gap: 32px;
  border-radius: 16px;
  border-width: 1px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  background: rgba(252, 167, 223, 0.1);
  border: 1px solid ${SEASON_COLORS.season7.primary};
`;

const NewsTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NewsTitle = styled.h2`
  font-size: 22px;
  font-weight: 500;
  font-family: "Outfit", sans-serif;
  text-align: center;
  color: ${SEASON_COLORS.season7.primary};
  margin: 0;
`;

const NewsSeason = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  color: ${SEASON_COLORS.season7.primary};
  margin: 0;
`;

const NewsDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NewsButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const RegisterButton = styled(Button)`
  background-color: ${SEASON_COLORS.season7.primary};
  color: #000000;
`;

export const NewsCard = () => {
  return (
    <NewsCardContainer>
      <NewsTitleContainer id="container-title">
        <NewsTitle>Proximamente</NewsTitle>
        <NewsSeason>SEASON 7</NewsSeason>
      </NewsTitleContainer>
      <NewsDescriptionContainer id="container-description">
        {/*<NewsDescription>Inscripciones de equipos abiertas.</NewsDescription>
        <NewsSubDescription>
          Enterate de cuáles son los equipos, sus jornadas
          y resultados de juegos.
        </NewsSubDescription>*/}
      </NewsDescriptionContainer>

      <NewsButtonsContainer id="container-buttons">
        <JoinDiscordButton 
          color={SEASON_COLORS.season7.primary}
          backgroundColor="#000000"
        />
        <RegisterButton to="/current-season" target="_self">
          Ver Season
        </RegisterButton>
      </NewsButtonsContainer>
    </NewsCardContainer>
  );
};
