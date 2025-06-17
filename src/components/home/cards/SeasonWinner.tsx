import styled from "styled-components";

const SeasonWinnerContainer = styled.section`
  height: 100%;
  background-color: #321156;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  font-family: "Outfit", sans-serif;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;

const WinnerInfoContainer = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const WinnerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const WinnerTeam = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const WinnerSeason = styled.p`
  font-size: 16px;
  margin: 0;
`;

const ViewMore = styled.a`
  font-size: 16px;
  color: #fabf4a;
  text-decoration: none;
  cursor: pointer;
`;

const SeasonWinnerImage = styled.img`
  height: 64px;
  @media (max-width: 1024px) {
    height: 120px;
  }
`;

export const SeasonWinner = () => {
  return (
    <SeasonWinnerContainer>
      <WinnerInfoContainer id="contenedor">
        <SeasonWinnerImage
          src={"/images/teams/fantasmas.png"}
          aria-label="fastasmas-logo"
        />
        <WinnerTextContainer>
          <WinnerTeam>Team FANTASMAS</WinnerTeam>
          <WinnerSeason>Campeones Season 4</WinnerSeason>
        </WinnerTextContainer>
      </WinnerInfoContainer>
      <ViewMore id="ver-mas" href="#">
        Ver season
      </ViewMore>
    </SeasonWinnerContainer>
  );
};
