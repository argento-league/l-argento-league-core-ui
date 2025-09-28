import style from "styled-components";
import arrowLeft from "../../../assets/common/icons/arrow-left.svg";
import arrowRight from "../../../assets/common/icons/arrow-right.svg";
import { useState } from "react";
import {
  UPPER_BRACKET_R1_MATCHES,
  UPPER_BRACKET_R2_MATCHES,
  UPPER_BRACKET_R3_MATCHES,
  UPPER_BRACKET_R4_MATCHES,
  LOWER_BRACKET_R1_MATCHES,
  LOWER_BRACKET_R2_MATCHES,
  LOWER_BRACKET_R3_MATCHES,
  LOWER_BRACKET_R4_MATCHES,
  LOWER_BRACKET_R5_MATCHES,
  LOWER_BRACKET_R6_MATCHES,
  LOWER_BRACKET_R7_MATCHES,
  GRAND_FINAL_MATCHES,
  PARTICIPANTS,
  type Match as TournamentMatch
} from "../../../data/brackets/tournamentData";
import { MatchType } from "react-tournament-brackets";
import { Match } from "../mobile/match";
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

// Helper function to get participant name
const getParticipantName = (participantId: number | null): string => {
  if (participantId === null) return 'TBD';
  const participant = PARTICIPANTS.find(p => p.id === participantId);
  return participant?.name || 'TBD';
};

// Helper function to transform Match data to MatchType format
const transformMatchesToMobileFormat = (matches: TournamentMatch[]): MatchType[] => {
  return matches.map((match) => {
    // Check if match has been played (status 2 means completed)
    const isMatchPlayed = match.status === 2;
    
    return {
      id: match.id,
      nextMatchId: null,
      startTime: '',
      state: isMatchPlayed ? 'DONE' : 'PENDING',
      participants: [
        {
          id: match.opponent1?.id ?? '',
          name: getParticipantName(match.opponent1?.id ?? null),
          score: isMatchPlayed ? (match.opponent1?.score || 0) : undefined,
          isWinner: isMatchPlayed ? (match.opponent1?.result === "win") : undefined
        },
        {
          id: match.opponent2?.id ?? '',
          name: getParticipantName(match.opponent2?.id ?? null),
          score: isMatchPlayed ? (match.opponent2?.score || 0) : undefined,
          isWinner: isMatchPlayed ? (match.opponent2?.result === "win") : undefined
        }
      ]
    };
  });
};

const MainEventMobile = () => {
  return (
    <>
      <Bracket
        bracketName={BracketName.UPPER_BRACKET}
        bracketStages={UPPER_BRACKET_TITLES}
        bracketMatches={upperBracketMatches}
        winnerText={"VICTORIA"}
        loserText={"DERROTA"}
      />
      <Bracket
        bracketName={BracketName.LOWER_BRACKET}
        bracketStages={LOWER_BRACKET_TITLES}
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
  ronda_1: "Ronda 1",
  ronda_2: "Ronda 2", 
  ronda_3: "Ronda 3",
  ronda_4: "Ronda 4",
  ronda_5: "Ronda 5",
  lower_semi_final: "Lower Semi Final",
  lower_final: "Lower Final",
};

const UPPER_BRACKET_TITLES = {
  octavos: "Octavos",
  cuartos: "Cuartos",
  semi_final: "Semi Final", 
  upper_final: "Upper Final",
  gran_final: "Gran Final",
};

const lowerBracketMatches = {
  ronda_1: transformMatchesToMobileFormat(LOWER_BRACKET_R1_MATCHES),
  ronda_2: transformMatchesToMobileFormat(LOWER_BRACKET_R2_MATCHES),
  ronda_3: transformMatchesToMobileFormat(LOWER_BRACKET_R3_MATCHES),
  ronda_4: transformMatchesToMobileFormat(LOWER_BRACKET_R4_MATCHES),
  ronda_5: transformMatchesToMobileFormat(LOWER_BRACKET_R5_MATCHES),
  lower_semi_final: transformMatchesToMobileFormat(LOWER_BRACKET_R6_MATCHES),
  lower_final: transformMatchesToMobileFormat(LOWER_BRACKET_R7_MATCHES),
};

const upperBracketMatches = {
  octavos: transformMatchesToMobileFormat(UPPER_BRACKET_R1_MATCHES),
  cuartos: transformMatchesToMobileFormat(UPPER_BRACKET_R2_MATCHES),
  semi_final: transformMatchesToMobileFormat(UPPER_BRACKET_R3_MATCHES),
  upper_final: transformMatchesToMobileFormat(UPPER_BRACKET_R4_MATCHES),
  gran_final: transformMatchesToMobileFormat(GRAND_FINAL_MATCHES),
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
  //console.log(bracketStages[bracketStagesKeys[currentIndex]]);

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
              key={match.id}
              team1={match.participants[0].name as string}
              team2={match.participants[1].name as string}
              score1={match.participants[0].score as number | null | undefined}
              score2={match.participants[1].score as number | null | undefined}
              isWinner1={match.participants[0].isWinner}
              isWinner2={match.participants[1].isWinner}
              winnerText={winnerText}
              loserText={loserText}
            />
          ))}
        </MatchesContainer>
      </BracketContainer>
    </MainContainer>
  );
};

export default MainEventMobile;
