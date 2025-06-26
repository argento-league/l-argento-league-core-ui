import styled from "styled-components";
import { JoinDiscordButton } from "@components/common/JoinDiscordButton";
import { Button } from "@components/common/Button";

const TeamTabContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 64px;
  color: white;

  @media (max-width: 720px) {
    padding: 32px 16px;
  }
`;

const Title = styled.h1`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 24px;
`;

const Description = styled.p`
  font-family: "Rethink Sans", sans-serif;
  font-size: 24px;
  font-weight: 500;
  max-width: 50ch;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const TeamsTabContent = () => {
  return (
    <TeamTabContainer>
      <Title>Inscripciones Abiertas</Title>
      <Description>
        Inscribí a tu equipo para formar parte de la season 5. Unite a nuestro
        Discord si estas buscando equipo o un player que te falta, y enterarte
        de todo.
      </Description>
      <ButtonContainer>
        <Button
          to="https://tally.so/r/mD9dPj"
          target="_blank"
          backgroundColor="#FF611D"
        >
          Inscribir equipo
        </Button>
        <JoinDiscordButton
          backgroundColor="black"
          color="#FF611D"
          hasBorder={true}
        />
      </ButtonContainer>
    </TeamTabContainer>
  );
};
