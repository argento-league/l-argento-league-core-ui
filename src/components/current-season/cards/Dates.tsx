import styled from "styled-components";

const DatesBox = styled.div`
  padding: 24px 32px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  height: fit-content;
  border-radius: 16px;
  box-sizing: border-box;
  justify-content: flex-start;
  font-size: 18px;
  font-family: Outfit, sans-serif;
  font-weight: 500;
`;

const DatesTitle = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid var(--season-primary);
  color: #ffffff;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  font-size: 18px;
`;

const DatesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: Rethink Sans, sans-serif;
  font-weight: 500;
  font-size: 16px;
`;

const DateText = styled.p`
  font-family: Outfit, sans-serif;
  font-size: 16px;
  font-weight: 500;
  max-width: 15ch;
`

export const DateCard = () => {
  return (
    <DatesBox>
      <DatesTitle>Calendario</DatesTitle>
      <DatesRow>
        <DateText>
          Inscripción de equipos
        </DateText>
        <DateText style={{ textAlign: "end" }}>13 julio</DateText>
      </DatesRow>
      <DatesRow>
        <DateText>
          Presentación
        </DateText>
        <DateText style={{ textAlign: "end" }}>02 agosto</DateText>
      </DatesRow>
      <DatesRow>
        <DateText>
          Fase de grupos
        </DateText>
        <DateText style={{ textAlign: "end" }}>03 agosto</DateText>
      </DatesRow>
      <DatesRow>
        <DateText>
          Evento principal
        </DateText>
        <DateText style={{ textAlign: "end" }}>24 agosto</DateText>
      </DatesRow>
      <DatesRow>
        <DateText>
          Gran final
        </DateText>
        <DateText style={{ textAlign: "end" }}>06 septiembre</DateText>
      </DatesRow>
    </DatesBox>
  );
};
