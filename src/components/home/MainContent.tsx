import styled from "styled-components";

const MainRootContainer = styled.div`
  width: 100%;
  height: 400px;
  padding-bottom: 64px;
  gap: 16px;
  background-image: linear-gradient(#1096d5, #00334a);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContentContainer = styled.div`
  width: 530px;
  height: 280px;
  padding-top: 32px;
  gap: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainImage = styled.img`
  width: 200px;
  height: 130px;
  object-fit: cover;
  display: block;
`;

const MainContentText = styled.div`
  width: 530px;
  height: 100px;
`;

const MainContentTextTitle = styled.h1`
  font-size: 44px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  line-height: 52px;
  letter-spacing: 0%;
`;

export const MainContent = () => {
  return (
    <MainRootContainer>
      <MainContentContainer>
        <MainImage src="/images/argento-logo.png" />
        <MainContentText>
          <MainContentTextTitle>
            Liga Argentina de Dota 2 para todo LATAM.
          </MainContentTextTitle>
        </MainContentText>
      </MainContentContainer>
    </MainRootContainer>
  );
};


