import discordIcon from "@assets/social-media-icons/discord.svg";
import { StyledSvg } from "./StyledSVG";
import { Button, ButtonProps } from "./Button";
import styled from "styled-components";

type DiscordButtonProps = ButtonProps & {
  hasBorder?: boolean;
};
export const DiscordButton = styled(Button)<DiscordButtonProps>`
  border: ${(props) => (props.hasBorder ? `1px solid ${props.color}` : "none")};
  color: #fabf4a;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
`;

type JoinDiscordButton = {
  color?: string;
  backgroundColor?: string;
  hasBorder?: boolean;
};

export const JoinDiscordButton = ({
  color,
  backgroundColor,
  hasBorder = false,
}: JoinDiscordButton) => {
  const DISCORD_INVITATION_URL: string = import.meta.env
    .VITE_DISCORD_INVITATION_URL;
  return (
    <DiscordButton
      color={color}
      backgroundColor={backgroundColor}
      hasBorder={hasBorder}
      to={DISCORD_INVITATION_URL}
      target="_blank"
    >
      <StyledSvg src={discordIcon} color={color || "#fabf4a"} />
      <span style={{ color: color || "#fabf4a" }}>Unirme a Discord</span>
    </DiscordButton>
  );
};
