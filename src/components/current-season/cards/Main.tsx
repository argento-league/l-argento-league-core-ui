import styled from "styled-components";
import { RegisterButton } from "../../home/cards/News";

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
`;

const SeasonTitle = styled.p`
  color: #fabf4a;
  font-family: Outfit, sans-serif;
  font-weight: 700;
  font-size: 36px;
  text-align: center;
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
`;

const MainDescription = styled.p`
  font-size: 16px;
  font-family: Rethink Sans, sans-serif;
  font-weight: 400;
  text-align: center;
  white-space: pre-line;
`;

export const MainCard = () => {
  return (
    <MainGridBoxContent>
      <SeasonTitle> Season 5 </SeasonTitle>
      <MainTextGroup>
        <MainHeading>{"Pre-inscripciones\n abiertas"}</MainHeading>
        <MainDescription>
          {
            "Preinscripción individual para todo aquel que esté \n interesado en participar de la liga, tenga o no \n equipo aún."
          }
        </MainDescription>
      </MainTextGroup>
      <RegisterButton>Inscribirme</RegisterButton>
    </MainGridBoxContent>
  );
};
