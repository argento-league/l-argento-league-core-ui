import styled from 'styled-components';

const DatesBox = styled.div`
  padding: 24px 32px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  background-color: #000000;
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
  border-bottom: 1px solid #947A45;
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

export const DateCard = () => {
  return (
    <DatesBox>
      <DatesTitle>Fechas</DatesTitle>
      <DatesRow>
        <p>Pre-inscripción individual</p>
        <p>hasta el 20/06</p>
      </DatesRow>
      <DatesRow>
        <p>Inscripción por equipo</p>
        <p>fecha estimada 20/06</p>
      </DatesRow>
      <DatesRow>
        <p>Inicio Season 5</p>
        <p>TBD</p>
      </DatesRow>
    </DatesBox>
  );
};
