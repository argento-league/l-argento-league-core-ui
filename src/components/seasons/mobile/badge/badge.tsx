import style from "styled-components";

const BadgeContainer = style.div<{ isWinner?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 6px;
    border-radius: 1.5px;
    background-color: ${({ isWinner }) => (isWinner ? "#9ED864" : "#FB5E4A")};
`;

const BadgeText = style.span`
    font-size: 14px;
    font-weight: 700;
    font-family: "Montserrat", sans-serif;
    color: black;
`;

export const Badge = ({
  text = "Victoria",
  isWinner = false,
}: {
  text?: string;
  isWinner?: boolean;
}) => {
  return (
    <BadgeContainer isWinner={isWinner} id="result-badge-container">
      <BadgeText>{text}</BadgeText>
    </BadgeContainer>
  );
};
