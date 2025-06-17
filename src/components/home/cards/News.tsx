import styled from "styled-components";
import { StyledSvg } from "../../common/StyledSVG";
import discordIcon from "../../../assets/social-media-icons/discord.svg";

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
  background-image: url("/home-proximamente.jpg");
  background-size: cover;
  border: 1px solid #fabf4a;
  background-blend-mode: multiply;
  background-color: rgba(0, 0, 0, 0.65);
  background-position: bottom;
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
  color: #fabf4a;
  margin: 0;
`;

const NewsSeason = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  color: #fabf4a;
  margin: 0;
`;

const NewsDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NewsDescription = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  line-height: 24px;
  letter-spacing: 0%;
  margin: 0;
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

const NewsButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

export const DiscordButton = styled(NewsButton)`
  background-color: black;
  color: #fabf4a;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
`;

export const RegisterButton = styled(NewsButton)`
  background-color: #fabf4a;
`;

export const NewsCard = () => {
  return (
    <NewsCardContainer>
      <NewsTitleContainer id="container-title">
        <NewsTitle>próximamente</NewsTitle>
        <NewsSeason>SEASON 5</NewsSeason>
      </NewsTitleContainer>
      <NewsDescriptionContainer id="container-description">
        <NewsDescription>Pre-inscripciones individuales abiertas.</NewsDescription>
        <NewsSubDescription>
          Unite a nuestro Discord para anotarte como jugador libre, o enterarte
          cuando comiencen las inscripciones por equipo.
        </NewsSubDescription>
      </NewsDescriptionContainer>
      <NewsButtonsContainer id="container-buttons">
        <DiscordButton> <StyledSvg src={discordIcon} color="#fabf4a"></StyledSvg> <span>Unirme a Discord</span></DiscordButton>
        <RegisterButton>Inscribirme</RegisterButton>
      </NewsButtonsContainer>
    </NewsCardContainer>
  );
};
