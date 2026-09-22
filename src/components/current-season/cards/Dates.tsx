import styled from "styled-components";
import { useSeasonTheme } from "../../../context/SeasonThemeContext";

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
`;

const SEASON_8_DATES = [
  { label: "Inscripción de equipos", date: "13 julio" },
  { label: "Presentación", date: "02 agosto" },
  { label: "Fase de grupos", date: "03 agosto" },
  { label: "Evento principal", date: "24 agosto" },
  { label: "Gran final", date: "06 septiembre" },
];

const UPCOMING_DATES = [
  { label: "Inscripción de equipos", date: "Próximamente" },
  { label: "Presentación", date: "Próximamente" },
  { label: "Fase de grupos", date: "Próximamente" },
  { label: "Evento principal", date: "Próximamente" },
  { label: "Gran final", date: "Próximamente" },
];

export const DateCard = () => {
  const theme = useSeasonTheme();
  const dates = theme.seasonNumber === 9 ? UPCOMING_DATES : SEASON_8_DATES;

  return (
    <DatesBox>
      <DatesTitle>Calendario</DatesTitle>
      {dates.map((row) => (
        <DatesRow key={row.label}>
          <DateText>{row.label}</DateText>
          <DateText style={{ textAlign: "end" }}>{row.date}</DateText>
        </DatesRow>
      ))}
    </DatesBox>
  );
};
