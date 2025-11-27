import { Link } from "react-router-dom";
import styled from "styled-components";
import { CURRENT_SEASON_COLORS } from "../../../constants/season-colors";

const SeasonWinnerContainer = styled.section`
  height: 100%;
  background: rgba(80, 255, 16, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  font-family: "Outfit", sans-serif;
  border: 1px solid ${CURRENT_SEASON_COLORS.primary};

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const WinnerInfoContainer = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const WinnerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const WinnerTeam = styled.h2`
  font-size: 18px;
  margin: 0;
  font-family: "Rethink Sans", sans-serif;
`;

const WinnerSeason = styled.p`
  font-size: 16px;
  margin: 0;
  font-family: "Rethink Sans", sans-serif;
`;

const ViewMore = styled(Link)`
  font-size: 16px;
  color: ${CURRENT_SEASON_COLORS.primary};
  text-decoration: none;
  cursor: pointer;
  padding: 8px 16px;
  font-family: "Rethink Sans", sans-serif;
`;

const SeasonWinnerImage = styled.img`
  width: 84px;
`;

export const SeasonWinner = () => {
  return (
    <SeasonWinnerContainer>
      <WinnerInfoContainer id="contenedor">
        <SeasonWinnerImage
          src={"/images/teams/season-6/the-royals.png"}
          aria-label="the-royals-logo"
        />
        <WinnerTextContainer>
          <WinnerTeam>The Royals</WinnerTeam>
          <WinnerSeason>Campeones Season 6</WinnerSeason>
        </WinnerTextContainer>
      </WinnerInfoContainer>
      <ViewMore id="ver-mas" to="/current-season">
        Ver season
      </ViewMore>
    </SeasonWinnerContainer>
  );
};
