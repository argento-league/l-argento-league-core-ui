import argentoLogo from "@assets/footer/l-argento-text.svg";
import dota2logo from "@assets/footer/dota-2-logo.svg";
import { StyledSvg } from "@components/common/StyledSVG";
import { FooterContainer, LogoContainer } from "./style";

export const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <StyledSvg src={argentoLogo} width="120px" height="20px" />
      </LogoContainer>
      |
      <StyledSvg src={dota2logo} width="105px" />
    </FooterContainer>
  );
};
