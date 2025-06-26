import styled from "styled-components";
import { Button } from "@components/common/Button";

const MainGridBoxContent = styled.div`
  padding: 16px 0px 32px 0px;
  background: #00000099;
  border-radius: 16px;
  height: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 32px;
  }
`;

const SeasonTitle = styled.p`
  color: #ff611d;
  font-family: Outfit, sans-serif;
  font-weight: 700;
  font-size: 36px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const MainTextGroup = styled.div`
  color: white;
  gap: 16px;
`;

const MainHeading = styled.h1`
  font-size: 44px;
  font-family: Outfit, sans-serif;
  font-weight: 600;
  white-space: pre-line;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const MainDescription = styled.p`
  font-size: 20px;
  font-family: Rethink Sans, sans-serif;
  font-weight: 400;
  text-align: center;
  white-space: pre-line;
  max-width: 30ch;
`;

const MainSubDescription = styled.p`
  font-size: 16px;
  font-family: Rethink Sans, sans-serif;
  font-weight: 500;
  text-align: center;
`;

export const MainCard = () => {
  return (
    <MainGridBoxContent>
      <SeasonTitle> Season 5 </SeasonTitle>
      <MainTextGroup>
        <MainHeading>{"Inscripciones abiertas"}</MainHeading>
        <MainDescription>
          {"Inscribí a tu equipo para formar parte de la Season 5."}
        </MainDescription>
        <MainSubDescription>
          {"5 players + 3 standings permitidos por equipo"}
        </MainSubDescription>
      </MainTextGroup>
      <Button
        to="https://tally.so/r/mD9dPj"
        target="_blank"
        backgroundColor={"#FF611D"}
      >
        Inscribirme
      </Button>
    </MainGridBoxContent>
  );
};
