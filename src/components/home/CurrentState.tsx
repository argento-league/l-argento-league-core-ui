import styled from "styled-components";
import SVG from "react-inlinesvg";

import discord from "../../assets/social-media-icons/discord.svg";
import facebook from "../../assets/social-media-icons/facebook.svg";
import instagram from "../../assets/social-media-icons/instagram.svg";
import youtube from "../../assets/social-media-icons/youtube.svg";
import { Link } from "react-router-dom";

const ActualStateContainer = styled.div`
  height: 280px;
  background-image: linear-gradient(#321156, #191c22);
`;

type SVGProps = {
  color?: string;
  width?: string;
  height?: string;
};

export const StyledSvg = styled(SVG)<SVGProps>`
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};
  & path {
    fill: ${({ color }) => color || "#FFFFFF"};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentTextTitle = styled.h2`
  margin: 0;
  font-size: 26px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: #fff;
`;

const ContentTextSubtitle = styled.h1`
  margin: 0;
  font-size: 26px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: #fabf4a;
`;

const IconText = styled.h1`
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
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

export const CurrentState = () => {
  return (
    <ActualStateContainer>
      <ContentContainer>
        <ContentText>
          <ContentTextTitle>L'ARGENTO ACTUALMENTE</ContentTextTitle>
          <ContentTextSubtitle>
            Mirá como viena el evento principal de la season 4
          </ContentTextSubtitle>
        </ContentText>
        <IconContainer>
          <IconText>Enterate de todo</IconText>
          <IconLogoContainer>
            <Link to="https://discord.gg/hYcW9P2keq">
              <StyledSvg
                src={discord}
                color={IconColor}
                width="24px"
                height="24px"
              />
            </Link>
            <Link to="https://www.youtube.com/@Largentoleague">
              <StyledSvg
                src={youtube}
                color={IconColor}
                width="24px"
                height="24px"
              />
            </Link>
            <Link to="https://www.facebook.com/profile.php?id=61565646000198">
              <StyledSvg
                src={facebook}
                color={IconColor}
                width="24px"
                height="24px"
              />
            </Link>
            <Link to="https://www.instagram.com/largentoleague/">
              <StyledSvg
                src={instagram}
                color={IconColor}
                width="24px"
                height="24px"
              />
            </Link>
          </IconLogoContainer>
        </IconContainer>
      </ContentContainer>
    </ActualStateContainer>
  );
};
