import styled from "styled-components";
import { StyledSvg } from "../../common/StyledSVG";
import argentoLogo from "../../../assets/l-argento-main.svg";

const MainCardContainer = styled.div`
  gap: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Outfit", sans-serif;
  font-weight: 600;

  @media (max-width: 720px) {
    align-items: center;
  }
`;

const MainCardTitle = styled.h1`
  font-size: 44px;
  color: white;
  margin-top: 16px;
  letter-spacing: 0;
  font-family: "Outfit", sans-serif;
  white-space: pre-line;

  @media (max-width: 720px) {
    font-size: 32px;
    text-align: center;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 16px;
  padding-bottom: 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const MainCard = () => {
  return (
    <CardContainer>
      <MainCardContainer>
        <img
          src="/images/l-argento-main.png"
          alt="Argento Logo"
          width={"200px"}
        />
        
        <MainCardTitle>
          {"Liga Argentina de Dota 2 \n para todo LATAM."}
        </MainCardTitle>
      </MainCardContainer>
    </CardContainer>
  );
};
