import styled from "styled-components";
import { DiscordButton } from "../../home/cards/News";
import { StyledSvg } from "../../common/StyledSVG";
import discordIcon from "../../../assets/social-media-icons/discord.svg";
import { useIsMobile } from "../../../hooks/useIsMobile";

type LookingForTeamBoxProps = {
  color?: string;
  backgroundColor?: string;
};

const LookingForTeamBox = styled.div<LookingForTeamBoxProps>`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid ${(props) => props.color || "#ff611d"};
  background-color: ${(props) => props.backgroundColor || "#00000033"};
  border-radius: 12px;
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

type JoinDiscordButton = {
  color?: string;
  backgroundColor?: string;
};

export const JoinDiscordButton = ({
  color,
  backgroundColor,
}: JoinDiscordButton) => {
  console.log(color, backgroundColor);
  return (
    <DiscordButton backgroundColor={backgroundColor} to={"https://discord.com/invite/hYcW9P2keq"} target="_blank">
      <StyledSvg src={discordIcon} color={color || "#fabf4a"} />
      <span style={{ color: color || "#fabf4a" }}>Unirme a Discord</span>
    </DiscordButton>
  );
};

export const LookingForTeamCard = () => {
  const isMobile = useIsMobile(720);
  return (
    <LookingForTeamBox>
      <div>
        <LookingForTeamTitle>ESTÁS BUSCANDO EQUIPO?</LookingForTeamTitle>
        <LookingForTeamDescription>
          Unite a nuestra comunidad para completar o crear tu equipo
        </LookingForTeamDescription>
      </div>
      <JoinDiscordButton
        color={isMobile ? "black" : "#FF611D"}
        backgroundColor={isMobile ? "#FF611D" : "black"}
      />
    </LookingForTeamBox>
  );
};
