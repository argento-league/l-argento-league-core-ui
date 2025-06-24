import styled from "styled-components";

const DatesBox = styled.div`
  padding: 24px 32px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  background-color: #101010;
  height: 100%;
  border-radius: 12px;
  box-sizing: border-box;
  justify-content: space-around;
  font-size: 18px;
  font-family: Outfit, sans-serif;
  font-weight: 500;
`;

const DatesTitle = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid #ff611d;
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
      <DatesTitle>Fechas</DatesTitle>
      <DatesRow>
        <DateText
        >
          Pre-inscripción individual
        </DateText>
        <DateText style={{ textAlign: "end" }}>hasta el 01/07</DateText>
      </DatesRow>
      <DatesRow>
        <DateText>
          Inscripción por equipo
        </DateText>
        <DateText style={{ textAlign: "end" }}>del 23/06 al 1/07</DateText>
      </DatesRow>
      <DatesRow>
        <DateText>
          Inicio Season 5
        </DateText>
        <DateText style={{ textAlign: "end" }}>Domingo 06/07</DateText>
      </DatesRow>
    </DatesBox>
  );
};
