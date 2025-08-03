import { ReactNode, useEffect, useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { InfoTabContentMobile } from "./mobile/Info";
import { InfoTabContent } from "./Info";
import { Container } from "../../common/Container";
import { TabsEnum } from "../../../constants/current-season/information";
import { GroupStageContent } from "./GroupStage";
import { TeamSelectionContent } from "./TeamSelection";
import styled from "styled-components";
import { TOURNAMENT_DATA } from "../../../data/brackets/tournamentData";

type TabContentProps = {
  selectedTab: TabsEnum;
};

export const TabContent = ({ selectedTab }: TabContentProps) => {
  const isMobile = useIsMobile(768);
  let children: ReactNode | null = null;
  switch (selectedTab) {
    case TabsEnum.InfoGeneral:
      children = isMobile ? <InfoTabContentMobile /> : <InfoTabContent />;
      break;
    case TabsEnum.Equipos:
      children = <TeamSelectionContent />;
      break;
    case TabsEnum.FaseDeGrupos:
      children = <GroupStageContent />;
      break;
    case TabsEnum.EventoPrincipal:
      children = (
        <MainEventContainer>
          <MainEvent></MainEvent>
        </MainEventContainer>
      );
      break;
    default:
      children = null;
  }
  return <Container>{children}</Container>;
};

const MainEventContainer = styled.div`
  display: flex;

  color: white;
`;

const MainEvent = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) return;
    const style = document.createElement("style");
    style.textContent = `
   	section.bracket[data-group-id="1"] .match.connect-next.straight::after {
    content: none !important;
    display: none !important;
  }
		section.bracket[data-group-id="1"] .opponents.connect-previous::before {
    content: none !important;
    display: none !important;
  }
		section.bracket[data-group-id="1"] .match.connect-next:nth-of-type(odd)::after {
    content: none !important;
    display: none !important;
  }
	  section.bracket[data-group-id="1"] .match.connect-next:nth-of-type(even)::after {
    content: none !important;
    display: none !important;
  }	
`;
    document.head.appendChild(style);
    window.bracketsViewer.render(
      {
        stages: TOURNAMENT_DATA.stage,
        matches: TOURNAMENT_DATA.match,
        matchGames: TOURNAMENT_DATA.match_game,
        participants: TOURNAMENT_DATA.participant,
      },
      {
        participantOriginPlacement: "none",
        showRankingTable: false,
        customRoundName: (info) => {
          if (info.finalType === "grand_final") {
            return "Gran Final";
          }
          if (
            info.fractionOfFinal === 1 / 8 &&
            info.groupType === "winner-bracket"
          ) {
            return "Octavos";
          }
          if (
            info.fractionOfFinal === 1 / 4 &&
            info.groupType === "winner-bracket"
          ) {
            return "Cuartos";
          }
          if (info.fractionOfFinal === 1 / 2) {
            if (info.groupType === "winner-bracket") {
              return "Semi Final";
            } else if (info.groupType === "loser-bracket") {
              return "Lower Semi Final";
            }
          }
          if (info.fractionOfFinal === 1) {
            if (info.groupType === "winner-bracket") {
              return "Upper Final";
            } else if (info.groupType === "loser-bracket") {
              return "Lower Final";
            }
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 1) {
            return "Ronda 1";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 2) {
            return "Ronda 2";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 3) {
            return "Ronda 3";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 4) {
            return "Ronda 4";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 5) {
            return "Ronda 5";
          } else {
            return "Gran Final";
          }
        },
      }
    );
    document.querySelectorAll(".participant .name").forEach((el) => {
      el.textContent = el.textContent.replace(/Loser of WB.{0,3}/, "").trim();
    });
    setLoaded(true);
  }, []);

  return (
    <div className="brackets-viewer" style={{ background: "black" }}></div>
  );
};
