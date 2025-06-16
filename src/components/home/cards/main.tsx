import styled from "styled-components";

const MainCardContainer = styled.div`
  padding-top: 16px;
  padding-bottom: 32px;
  gap: 16px;
  padding-left: 60px;
  padding-right: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
`;

const MainCardTitle = styled.h1`
  font-size: 44px;
  color: white;
  margin-top: 16px;
  letter-spacing: 0;
  font-family: "Outfit", sans-serif;
`;

export const MainCard = () => {
  return (
    <MainCardContainer>
      <img src="/images/argento-logo.png" alt="Argento Logo" width={"200px"} />
      <MainCardTitle>Liga Argentina de Dota 2 para todo LATAM.</MainCardTitle>
    </MainCardContainer>
  );
};
