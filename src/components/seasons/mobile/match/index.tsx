import style from "styled-components";
import { Team } from "../team";

const MatchSeparator = style.hr`
    width: 90%;
    border: 1px solid #FFFFFF;
    opacity: 0.5;
`;



const MatchContainer = style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 6px;
`;

type MatchProps = {
  team1: string;
  team2: string;
  score1: number | null | undefined;
  score2: number | null | undefined;
  isWinner1: boolean | undefined;
  isWinner2: boolean | undefined;
  winnerText: string;
  loserText: string;
  season?: number;
};

export const Match = ({
  team1 = "Team Name 1",
  team2 = "Team Name 2",
  score1 = null,
  score2 = null,
  isWinner1 = undefined,
  isWinner2 = undefined,
  winnerText = "Victoria",
  loserText = "Derrota",
  season = 5,
}: MatchProps) => {
  const isGamePlayed = score1 != null && score2 != null;
  
  // Check if both teams are losers (both isWinner are false or undefined)
  const bothTeamsAreLosers = isWinner1 === false && isWinner2 === false;
  
  // Only show results if game has been played AND not both teams are losers
  const shouldShowResults = isGamePlayed && !bothTeamsAreLosers;
  
  // Only determine winner if game has been played and results should be shown
  const winner = shouldShowResults && score1 != null && score2 != null && score1 > score2 ? team1 : 
                 shouldShowResults && score1 != null && score2 != null && score2 > score1 ? team2 : 
                 null;

  return (
    <MatchContainer id="match">
      <Team
        teamName={team1}
        score={score1}
        result={shouldShowResults ? (winner === team1 ? winnerText : loserText) : ""}
        isWinner={winner === team1}
        isGamePlayed={shouldShowResults}
        season={season}
      />
      <MatchSeparator />
      <Team
        teamName={team2}
        score={score2}
        result={shouldShowResults ? (winner === team2 ? winnerText : loserText) : ""}
        isWinner={winner === team2}
        isGamePlayed={shouldShowResults}
        season={season}
      />
    </MatchContainer>
  );
};
