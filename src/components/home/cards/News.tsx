import styled from "styled-components";
import { JoinDiscordButton } from "@components/common/JoinDiscordButton";
import { Button } from "@components/common/Button";

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
  background-image: url("/images/NewsCardBackgroundImage.png");
  background-size: cover;
  border: 1px solid rgba(80, 255, 16, 1);
  background-blend-mode: multiply;
  background-color: rgba(0, 0, 0, 0.65);
  background-position: center;
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
  color: rgba(80, 255, 16, 1);
  margin: 0;
`;

const NewsSeason = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  color: rgba(80, 255, 16, 1);
  margin: 0;
`;

const NewsDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


const NewsSubDescription = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  font-family: "Outfit", sans-serif;
  line-height: 24px;
  letter-spacing: 0%;
  margin: 0;
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
  background-color: rgba(80, 255, 16, 1);
  color: #000000;
`;

export const NewsCard = () => {
  return (
    <NewsCardContainer>
      <NewsTitleContainer id="container-title">
        <NewsTitle>Comienza pronto</NewsTitle>
        <NewsSeason>SEASON 6</NewsSeason>
      </NewsTitleContainer>
      <NewsDescriptionContainer id="container-description">
        {/*<NewsDescription>Inscripciones de equipos abiertas.</NewsDescription>*/}
        <NewsSubDescription>
          Enterate de cuáles son los equipos, sus jornadas
          y resultados de juegos.
        </NewsSubDescription>
      </NewsDescriptionContainer>

      <NewsButtonsContainer id="container-buttons">
        <JoinDiscordButton 
          color="rgba(80, 255, 16, 1)" 
          backgroundColor="#000000"
        />
        <RegisterButton to="/current-season" target="_self">
          Ver Season
        </RegisterButton>
      </NewsButtonsContainer>
    </NewsCardContainer>
  );
};
