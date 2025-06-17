import styled from "styled-components";
import { DiscordButton } from "../../home/cards/News";
import { StyledSvg } from "../../common/StyledSVG";
import discordIcon from "../../../assets/social-media-icons/discord.svg";

const LookingForTeamBox = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid #fabf4a;
  border-radius: 12px;
  background-color: #00000033;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
`;

const LookingForTeamTitle = styled.p`
  color: white;
  font-family: Outfit, sans-serif;
  font-weight: 700;
  font-size: 28px;
  text-align: center;
`;

const LookingForTeamDescription = styled.p`
  color: white;
  font-family: Rethink Sans, sans-serif;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
`;

export const LookingForTeamCard = () => {
  return (
    <LookingForTeamBox>
      <div>
        <LookingForTeamTitle>ESTÁS BUSCANDO EQUIPO?</LookingForTeamTitle>
        <LookingForTeamDescription>
          Unite a nuestra comunidad para completar o crear tu equipo
        </LookingForTeamDescription>
      </div>
      <DiscordButton>
        {" "}
        <StyledSvg src={discordIcon} color="#fabf4a"></StyledSvg>{" "}
        <span>Unirme a Discord</span>
      </DiscordButton>
    </LookingForTeamBox>
  );
};
