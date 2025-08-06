import style from "styled-components";
import { Badge } from "../badge/badge";

const TeamContainer = style.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: 6px;
    padding-right: 12px;
    box-sizing: border-box;
`;

const ScoreAndNameContainer = style.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-left: 6px;
    box-sizing: border-box;
`;

const Score = style.span`
    font-size: 16px;
    font-weight: 700;
    font-family: "Montserrat", sans-serif;
`;

const TeamName = style.p`
    font-size: 16px;
    font-weight: 700;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
`;

type TeamProps = {
  teamName: string;
  score: number | null | undefined;
  result: string;
  isWinner: boolean;
  isGamePlayed: boolean;
};

export const Team = ({
  teamName,
  score,
  result,
  isWinner,
  isGamePlayed,
}: TeamProps) => {
  return (
    <TeamContainer id="team-1">
      <ScoreAndNameContainer id="score-and-name-container">
        {isGamePlayed && <Score id="score">{score}</Score>}
        <TeamName id="team-1-name">{teamName}</TeamName>
      </ScoreAndNameContainer>
      {isGamePlayed && <Badge text={result} isWinner={isWinner} />}
    </TeamContainer>
  );
};
