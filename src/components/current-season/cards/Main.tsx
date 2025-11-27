import styled from "styled-components";
import { JoinDiscordButton } from "@components/common/JoinDiscordButton";
import { CURRENT_SEASON_COLORS } from "../../../constants/season-colors";

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

  @media (max-width: 1024px) and (min-width: 721px) {
    padding: 40px 16px 32px 16px;
    justify-content: flex-start;
    min-height: fit-content;
  }

  @media (max-width: 768px) {
    padding: 16px 32px;
    gap: 46px;
    justify-content: flex-start;
  }

  /* iPhone SE */
  @media (max-width: 375px) {
    padding: 28px 16px 16px 16px;
    gap: 12px;
    justify-content: flex-start;
    overflow: visible;
  }

  /* iPhone XR */
  @media (max-width: 414px) and (max-height: 896px) {
    padding: 16px 32px 32px 32px;
    gap: 22px;
  }



  /* iPhone 14 Pro Max */
  @media (max-width: 430px)  {
    padding: 16px 32px 32px 32px;
    gap: 16px;
  }
`;

const SeasonTitle = styled.p`
  color: ${CURRENT_SEASON_COLORS.primary};
  font-family: Outfit, sans-serif;
  font-weight: 700;
  font-size: 36px;
  text-align: center;
  margin: 0;

  @media (max-width: 1024px) and (min-width: 721px) {
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 375px) {
    font-size: 24px;
    line-height: 1.2;
    padding-bottom: 4px;
  }

  /* iPhone SE - Season 6 más arriba */
  @media (max-width: 375px) and (max-height: 812px) {
    margin-top: 0px;
  }

  /* iPhone 14 Pro Max - Season 6 más arriba */
  @media (max-width: 430px) and (max-height: 932px) {
    margin-top: -12px;
  }
`;

const MainTextGroup = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 375px) {
    gap: 4px;
  }
`;

const ChampionLogo = styled.img`
  width: 120px;
  height: auto;

  @media (max-width: 768px) {
    width: 60px;
  }

  @media (max-width: 375px) {
    width: 70px;
    margin-top: 0px;
  }

  /* iPhone XR - logo más chico */
  @media (max-width: 414px) and (max-height: 896px) {
    width: 60px;
  }
`;

const ChampionTeam = styled.h1`
  font-size: 32px;
  font-family: Outfit, sans-serif;
  font-weight: 600;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 375px) {
    font-size: 20px;
  }
`;

const ChampionTitle = styled.p`
  font-size: 20px;
  font-family: Rethink Sans, sans-serif;
  font-weight: 400;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const DiscordButtonContainer = styled.div`
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }

  @media (max-width: 375px) {
    margin-bottom: 80px;
    display: none;
  }
`;

export const MainCard = () => {
  return (
    <MainGridBoxContent>
      <SeasonTitle> Season 6 </SeasonTitle>
      <MainTextGroup>
        <ChampionLogo
          src={"/images/teams/season-6/the-royals.png"}
          alt="The Royals logo"
        />
        <ChampionTeam>The Royals</ChampionTeam>
        <ChampionTitle>Campeones</ChampionTitle>
      </MainTextGroup>
      {/* <Button
        to="https://tally.so/r/mD9dPj"
        target="_blank"
        backgroundColor={"#FF611D"}
      >
        Inscribirme
      </Button> */}
			<DiscordButtonContainer>
        <JoinDiscordButton 
          color={CURRENT_SEASON_COLORS.primary} 
          backgroundColor={CURRENT_SEASON_COLORS.secondary}
        />
      </DiscordButtonContainer>
    </MainGridBoxContent>
  );
};
