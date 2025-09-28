import styled from "styled-components";
import discord from "../../../assets/social-media-icons/discord.svg";
import facebook from "../../../assets/social-media-icons/facebook.svg";
import instagram from "../../../assets/social-media-icons/instagram.svg";
import youtube from "../../../assets/social-media-icons/youtube.svg";
import whatsapp from "../../../assets/social-media-icons/whatsapp.svg";
import { Link } from "react-router-dom";
import { StyledSvg } from "../../common/StyledSVG";
import { CURRENT_SEASON_COLORS } from "../../../constants/season-colors";

const SocialCardContainer = styled.div`
  height: 100%;
  min-height: 120px;
  background-color: #000000;
  border-radius: 16px;

  @media (max-width: 768px) {
    background-color: #101010;
    min-height: 100px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  gap: 16px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const IconText = styled.h1`
  font-size: 18px;
  font-family: "Outfit", sans-serif;
  font-weight: 500;
  color: #ffffff;
  line-height: 120%;
`;

const IconLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const defaultIconColor = CURRENT_SEASON_COLORS.primary;

type SocialCardProps = {
  iconColor?: string;
};

export const SocialCard = ({ iconColor }: SocialCardProps) => {
  const DISCORD_INVITATION_URL: string = import.meta.env
    .VITE_DISCORD_INVITATION_URL;
  return (
    <SocialCardContainer>
      <ContentContainer>
        <IconContainer>
          <IconText>Enterate de todo</IconText>
          <IconLogoContainer>
            <Link to={DISCORD_INVITATION_URL} target="_blank">
              <StyledSvg
                src={discord}
                color={iconColor || defaultIconColor}
                width="32px"
                height="32px"
              />
            </Link>
            <Link to="https://www.youtube.com/@Largentoleague" target="_blank">
              <StyledSvg
                src={youtube}
                color={iconColor || defaultIconColor}
                width="32px"
                height="32px"
              />
            </Link>
            <Link
              to="https://www.facebook.com/profile.php?id=61565646000198"
              target="_blank"
            >
              <StyledSvg
                src={facebook}
                color={iconColor || defaultIconColor}
                width="32px"
                height="32px"
              />
            </Link>
            <Link
              to="https://www.instagram.com/largentoleague/"
              target="_blank"
            >
              <StyledSvg
                src={instagram}
                color={iconColor || defaultIconColor}
                width="32px"
                height="32px"
              />
            </Link>
            <Link
              to="https://wa.me/1234567890"
              target="_blank"
            >
              <StyledSvg
                src={whatsapp}
                color={iconColor || defaultIconColor}
                width="32px"
                height="32px"
              />
            </Link>
          </IconLogoContainer>
        </IconContainer>
      </ContentContainer>
    </SocialCardContainer>
  );
};
