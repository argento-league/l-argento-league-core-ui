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
  score1: number | null;
  score2: number | null;
  winnerText: string;
  loserText: string;
};

export const Match = ({
  team1 = "Team Name 1",
  team2 = "Team Name 2",
  score1 = null,
  score2 = null,
  winnerText = "Victoria",
  loserText = "Derrota",
}: MatchProps) => {
  const winner =
    score1 !== null && score2 !== null && score1 > score2 ? team1 : team2;

  const isGamePlayed = score1 !== null && score2 !== null;

  return (
    <MatchContainer id="match">
      <Team
        teamName={team1}
        score={score1}
        result={winner === team1 ? winnerText : loserText}
        isWinner={winner === team1}
        isGamePlayed={isGamePlayed}
      />
      <MatchSeparator />
      <Team
        teamName={team2}
        score={score2}
        result={winner === team2 ? winnerText : loserText}
        isWinner={winner === team2}
        isGamePlayed={isGamePlayed}
      />
    </MatchContainer>
  );
};
