import style from "styled-components";
import arrowLeft from "../../../assets/common/icons/arrow-left.svg";
import arrowRight from "../../../assets/common/icons/arrow-right.svg";
import { useState } from "react";
import { MatchType } from "react-tournament-brackets";
import { Match } from "../mobile/match";
import { StyledSvg } from "../../common/StyledSVG";
import { getSeasonEventoPrincipal, type SeasonNumber } from "../../../data/season-data";
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
  PARTICIPANTS,
  type Match as TournamentMatch
} from "../../../data/brackets/tournamentData";

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

// Helper function to get participant name for Season 5
const getParticipantName = (participantId: number | null): string => {
  console.log('getParticipantName called with participantId:', participantId);
  if (participantId === null || participantId === undefined) {
    console.log('participantId is null/undefined, returning TBD');
    return 'TBD';
  }
  const participant = PARTICIPANTS.find(p => p.id === participantId);
  console.log('Found participant:', participant);
  return participant?.name || 'TBD';
};

// Helper function to transform Season 5 Match data to MatchType format
const transformSeason5MatchesToMobileFormat = (matches: TournamentMatch[]): MatchType[] => {
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

// Helper function to convert simple JSON format to mobile format
const convertEventoPrincipalToMobileFormat = (eventoData: any): { 
  upperBracketMatches: { [key: string]: MatchType[] }, 
  lowerBracketMatches: { [key: string]: MatchType[] } 
} => {
  let matchId = 0;
  
  const upperBracketMatches: { [key: string]: MatchType[] } = {
    octavos: [],
    cuartos: [],
    semi_final: [],
    upper_final: [],
  };
  
  const lowerBracketMatches: { [key: string]: MatchType[] } = {
    ronda_1: [],
    ronda_2: [],
    ronda_3: [],
    ronda_4: [],
    ronda_5: [],
    lower_semi_final: [],
    lower_final: [],
  };
  
  // Convert upper bracket
  Object.keys(eventoData['upper-bracket']).forEach((key, index) => {
    const round = eventoData['upper-bracket'][key];
    const roundKey = index === 0 ? 'octavos' : index === 1 ? 'cuartos' : index === 2 ? 'semi_final' : 'upper_final';
    
    if (Array.isArray(round)) {
      round.forEach((match: any) => {
        const isMatchPlayed = match.score1 !== null && match.score2 !== null;
        upperBracketMatches[roundKey].push({
          id: matchId++,
          nextMatchId: null,
          startTime: '',
          state: isMatchPlayed ? 'DONE' : 'PENDING',
          participants: [
            {
              id: matchId.toString(),
              name: match.team1,
              score: isMatchPlayed ? match.score1 : undefined,
              isWinner: isMatchPlayed ? (match.score1 > match.score2) : undefined
            },
            {
              id: (matchId + 1).toString(),
              name: match.team2,
              score: isMatchPlayed ? match.score2 : undefined,
              isWinner: isMatchPlayed ? (match.score2 > match.score1) : undefined
            }
          ]
        });
      });
    }
  });
  
  // Convert lower bracket
  Object.keys(eventoData['lower-bracket']).forEach((key, index) => {
    const round = eventoData['lower-bracket'][key];
    const roundKey = index === 0 ? 'ronda_1' : 
                      index === 1 ? 'ronda_2' : 
                      index === 2 ? 'ronda_3' : 
                      index === 3 ? 'ronda_4' : 
                      index === 4 ? 'ronda_5' : 
                      index === 5 ? 'lower_semi_final' : 'lower_final';
    
    if (Array.isArray(round)) {
      round.forEach((match: any) => {
        const isMatchPlayed = match.score1 !== null && match.score2 !== null;
        lowerBracketMatches[roundKey].push({
          id: matchId++,
          nextMatchId: null,
          startTime: '',
          state: isMatchPlayed ? 'DONE' : 'PENDING',
          participants: [
            {
              id: matchId.toString(),
              name: match.team1,
              score: isMatchPlayed ? match.score1 : undefined,
              isWinner: isMatchPlayed ? (match.score1 > match.score2) : undefined
            },
            {
              id: (matchId + 1).toString(),
              name: match.team2,
              score: isMatchPlayed ? match.score2 : undefined,
              isWinner: isMatchPlayed ? (match.score2 > match.score1) : undefined
            }
          ]
        });
      });
    }
  });
  
  return { upperBracketMatches, lowerBracketMatches };
};

type MainEventMobileProps = {
  season?: number;
};

const MainEventMobile = ({ season = 5 }: MainEventMobileProps) => {
  let upperBracketMatches: { [key: string]: MatchType[] };
  let lowerBracketMatches: { [key: string]: MatchType[] };
  
  if (season === 5) {
    // Use Season 5 hardcoded data
    upperBracketMatches = {
      octavos: transformSeason5MatchesToMobileFormat(UPPER_BRACKET_R1_MATCHES),
      cuartos: transformSeason5MatchesToMobileFormat(UPPER_BRACKET_R2_MATCHES),
      semi_final: transformSeason5MatchesToMobileFormat(UPPER_BRACKET_R3_MATCHES),
      upper_final: transformSeason5MatchesToMobileFormat(UPPER_BRACKET_R4_MATCHES),
    };
    
    lowerBracketMatches = {
      ronda_1: transformSeason5MatchesToMobileFormat(LOWER_BRACKET_R1_MATCHES),
      ronda_2: transformSeason5MatchesToMobileFormat(LOWER_BRACKET_R2_MATCHES),
      ronda_3: transformSeason5MatchesToMobileFormat(LOWER_BRACKET_R3_MATCHES),
      ronda_4: transformSeason5MatchesToMobileFormat(LOWER_BRACKET_R4_MATCHES),
      ronda_5: transformSeason5MatchesToMobileFormat(LOWER_BRACKET_R5_MATCHES),
      lower_semi_final: transformSeason5MatchesToMobileFormat(LOWER_BRACKET_R6_MATCHES),
      lower_final: transformSeason5MatchesToMobileFormat(LOWER_BRACKET_R7_MATCHES),
    };
  } else {
    // Use Season 6/7 JSON data (desde season-data para no alterar S6)
    const convertedData = convertEventoPrincipalToMobileFormat(getSeasonEventoPrincipal(season as SeasonNumber));
    upperBracketMatches = convertedData.upperBracketMatches;
    lowerBracketMatches = convertedData.lowerBracketMatches;
  }
  
  // Select titles based on season
  const upperBracketTitles = season === 5 ? UPPER_BRACKET_TITLES_S5 : UPPER_BRACKET_TITLES_S6;
  const lowerBracketTitles = season === 5 ? LOWER_BRACKET_TITLES_S5 : LOWER_BRACKET_TITLES_S6;
  
  return (
    <>
      <Bracket
        bracketName={BracketName.UPPER_BRACKET}
        bracketStages={upperBracketTitles}
        bracketMatches={upperBracketMatches}
        winnerText={"VICTORIA"}
        loserText={"DERROTA"}
        season={season}
      />
      <Bracket
        bracketName={BracketName.LOWER_BRACKET}
        bracketStages={lowerBracketTitles}
        bracketMatches={lowerBracketMatches}
        winnerText={"VICTORIA"}
        loserText={"ELIMINADO"}
        season={season}
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
  season?: number;
};

// Season 5 titles
const LOWER_BRACKET_TITLES_S5 = {
  ronda_1: "Ronda 1",
  ronda_2: "Ronda 2", 
  ronda_3: "Ronda 3",
  ronda_4: "Ronda 4",
  ronda_5: "Ronda 5",
  lower_semi_final: "Lower Semi Final",
  lower_final: "Lower Final",
};

const UPPER_BRACKET_TITLES_S5 = {
  octavos: "Octavos",
  cuartos: "Cuartos",
  semi_final: "Semi Final", 
  upper_final: "Upper Final",
};

// Season 6+ titles
const LOWER_BRACKET_TITLES_S6 = {
  ronda_1: "Primera Ronda",
  ronda_2: "Segunda Ronda",
  ronda_3: "Tercera Ronda",
  ronda_4: "Cuarta Ronda",
  ronda_5: "Quinta Ronda",
  lower_semi_final: "Sexta Ronda",
  lower_final: "Gran Final",
};

const UPPER_BRACKET_TITLES_S6 = {
  octavos: "Primera Ronda",
  cuartos: "Segunda Ronda",
  semi_final: "Tercera Ronda",
  upper_final: "Gran Final",
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
  season = 5,
}: BracketProps) => {
  const bracketStagesKeys = Object.keys(bracketStages);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
              season={season}
            />
          ))}
        </MatchesContainer>
      </BracketContainer>
    </MainContainer>
  );
};

export default MainEventMobile;
