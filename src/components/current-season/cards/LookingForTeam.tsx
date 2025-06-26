import styled from "styled-components";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { JoinDiscordButton } from "@components/common/JoinDiscordButton";

type LookingForTeamBoxProps = {
  color?: string;
  backgroundColor?: string;
};

const LookingForTeamBox = styled.div<LookingForTeamBoxProps>`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid ${(props) => props.color || "#ff611d"};
  background-color: ${(props) => props.backgroundColor || "#00000033"};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
`;

const LookingForTeamTitle = styled.p`
  color: white;
  font-family: Outfit, sans-serif;
  font-weight: 700;
  font-size: 28px;
  text-align: center;
`;

const LookingForTeamDescription = styled.p`
  color: white;
  font-family: Rethink Sans, sans-serif;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
`;

export const LookingForTeamCard = () => {
  const isMobile = useIsMobile(720);
  return (
    <LookingForTeamBox>
      <div>
        <LookingForTeamTitle>ESTÁS BUSCANDO EQUIPO?</LookingForTeamTitle>
        <LookingForTeamDescription>
          Unite a nuestra comunidad para completar o crear tu equipo
        </LookingForTeamDescription>
      </div>
      <JoinDiscordButton
        color={isMobile ? "black" : "#FF611D"}
        backgroundColor={isMobile ? "#FF611D" : "black"}
      />
    </LookingForTeamBox>
  );
};
