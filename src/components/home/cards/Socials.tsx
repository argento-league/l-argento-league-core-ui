import styled from "styled-components";
import discord from "../../../assets/social-media-icons/discord.svg";
import facebook from "../../../assets/social-media-icons/facebook.svg";
import instagram from "../../../assets/social-media-icons/instagram.svg";
import youtube from "../../../assets/social-media-icons/youtube.svg";
import { Link } from "react-router-dom";
import { StyledSvg } from "../../common/StyledSVG";

const SocialCardContainer = styled.div`
  height: 100%;
  background-color: #101010;
  border-radius: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
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

const IconColor = "#fabf4a";

export const SocialCard = () => {
  return (
    <SocialCardContainer>
      <ContentContainer>
        <IconContainer>
          <IconText>Enterate de todo</IconText>
          <IconLogoContainer>
            <Link to="https://discord.gg/hYcW9P2keq">
              <StyledSvg
                src={discord}
                color={IconColor}
                width="32px"
                height="32px"
              />
            </Link>
            <Link to="https://www.youtube.com/@Largentoleague">
              <StyledSvg
                src={youtube}
                color={IconColor}
                width="32px"
                height="32px"
              />
            </Link>
            <Link to="https://www.facebook.com/profile.php?id=61565646000198">
              <StyledSvg
                src={facebook}
                color={IconColor}
                width="32px"
                height="32px"
              />
            </Link>
            <Link to="https://www.instagram.com/largentoleague/">
              <StyledSvg
                src={instagram}
                color={IconColor}
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
