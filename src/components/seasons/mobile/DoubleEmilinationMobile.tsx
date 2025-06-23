import style from "styled-components";
import arrowLeft from "../../../assets/common/icons/arrow-left.svg";
import arrowRight from "../../../assets/common/icons/arrow-right.svg";
import { useState } from "react";
import {
  GRAND_FINAL,
  LOWER_BRACKET_FINAL,
  LOWER_BRACKET_ROUND_2,
  LOWER_BRACKET_ROUND_3,
  LOWER_BRACKET_ROUND_4,
  LOWER_BRACKET_ROUND_5,
  UPPER_BRACKET_FINAL,
  UPPER_BRACKET_ROUND_1,
  UPPER_BRACKET_ROUND_2,
} from "../../../data/brackets/doubleEliminationMatches";
import { LOWER_BRACKET_ROUND_1 } from "../../../data/brackets/doubleEliminationMatches";
import { Match } from "./match";
import { MatchType } from "react-tournament-brackets";
import { StyledSvg } from "../../common/StyledSVG";

const MainContainer = style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const BracketIndicator = style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const BracketIndicatorContainer = style.div`    display: flex;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 16px;
    width: 100%;
`;

const TextContainer = style.div<{ bracketName: BracketName }>`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ bracketName }) =>
      bracketName === BracketName.UPPER_BRACKET ? "#445936" : "#6C5137"};
    box-sizing: border-box;
    width: 100%;
`;

const BracketTitle = style.h2`
    padding-bottom: 6px;
    padding-top: 6px;
    margin: 0;
    text-align: center;
    color: #FFFFFF;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
`;
const RoundIndicatorContainer = style.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #FFFFFF;
`;

const BracketContainer = style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
`;

const MatchesContainer = style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    color: #FFFFFF;
    font-family: "Montserrat", sans-serif;
    gap: 16px;
`;

enum BracketName {
  UPPER_BRACKET = "UPPER BRACKET",
  LOWER_BRACKET = "LOWER BRACKET",
}

const DoubleEliminationMobile = () => {
  return (
    <>
      <Bracket
        bracketName={BracketName.UPPER_BRACKET}
        bracketStages={UPPER_BRACKET_TITLES}
        //@ts-expect-error - TODO: fix this
        bracketMatches={upperBracketMatches}
        winnerText={"VICTORIA"}
        loserText={"DERROTA"}
      />
      <Bracket
        bracketName={BracketName.LOWER_BRACKET}
        bracketStages={LOWER_BRACKET_TITLES}
        //@ts-expect-error - TODO: fix this
        bracketMatches={lowerBracketMatches}
        winnerText={"VICTORIA"}
        loserText={"ELIMINADO"}
      />
    </>
  );
};

type BracketProps = {
  bracketName: BracketName;
  bracketStages: Record<string, string>;
  bracketMatches: { [key: string]: MatchType[] };
  winnerText: string;
  loserText: string;
};

const LOWER_BRACKET_TITLES = {
  round_1: "Ronda 1",
  round_2: "Ronda 2",
  round_3: "Ronda 3",
  quarter_final: "Cuartos de final",
  semifinal: "Semi final",
  final: "Final",
};

const UPPER_BRACKET_TITLES = {
  quarter_final: "Cuartos de final",
  semifinal: "Semi final",
  final: "Final",
  "Gran Final": "Gran Final",
};

export const lowerBracketMatches = {
  round_1: LOWER_BRACKET_ROUND_1,
  round_2: LOWER_BRACKET_ROUND_2,
  round_3: LOWER_BRACKET_ROUND_3,
  quarter_final: LOWER_BRACKET_ROUND_4,
  semifinal: LOWER_BRACKET_ROUND_5,
  final: LOWER_BRACKET_FINAL,
};

export const upperBracketMatches = {
  quarter_final: UPPER_BRACKET_ROUND_1,
  semifinal: UPPER_BRACKET_ROUND_2,
  final: UPPER_BRACKET_FINAL,
  "Gran Final": GRAND_FINAL,
};

const StageTitle = style.span`
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    color: #FFFFFF;
`;

const Bracket = ({
  bracketName,
  bracketStages,
  bracketMatches,
  winnerText,
  loserText,
}: BracketProps) => {
  const bracketStagesKeys = Object.keys(bracketStages);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  console.log(bracketStages[bracketStagesKeys[currentIndex]]);

  const handleSelectNextBracketStage = (index: number) => {
    setCurrentIndex(index % bracketStagesKeys.length);
  };

  const handleSelectPreviousBracketStage = (index: number) => {
    setCurrentIndex(
      (index + bracketStagesKeys.length) % bracketStagesKeys.length
    );
  };

  return (
    <MainContainer id="main-bracket-container">
      <BracketIndicator id="bracket-indicator">
        <BracketIndicatorContainer id="bracket-indicator-container">
          <TextContainer bracketName={bracketName} id="text-container">
            <BracketTitle id="bracket-title">{bracketName}</BracketTitle>
          </TextContainer>
        </BracketIndicatorContainer>
      </BracketIndicator>
      <BracketContainer id="bracket-container">
        <RoundIndicatorContainer id="round-indicator-container">
          <StyledSvg
            id="left-arrow"
            src={arrowLeft}
            fill="#FFFFFF"
            height="20px"
            width="20px"
            onClick={() => handleSelectPreviousBracketStage(currentIndex - 1)}
          />
          <StageTitle>
            {bracketStages[bracketStagesKeys[currentIndex]] || ""}
          </StageTitle>
          <StyledSvg
            id="right-arrow"
            src={arrowRight}
            fill="#FFFFFF"
            height="20px"
            width="20px"
            onClick={() => handleSelectNextBracketStage(currentIndex + 1)}
          />
        </RoundIndicatorContainer>
        <MatchesContainer id="matchs-container">
          {bracketMatches[bracketStagesKeys[currentIndex]].map((match) => (
            <Match
              team1={match.participants[0].name as string}
              team2={match.participants[1].name as string}
              score1={match.participants[0].score as number}
              score2={match.participants[1].score as number}
              winnerText={winnerText}
              loserText={loserText}
            />
          ))}
        </MatchesContainer>
      </BracketContainer>
    </MainContainer>
  );
};

export default DoubleEliminationMobile;
