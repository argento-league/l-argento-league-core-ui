import { ReactNode } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { InfoTabContentMobile } from "./mobile/Info";
import { InfoTabContent } from "./Info";
import { Container } from "../../common/Container";
import { TabsEnum } from "../../../constants/current-season/information";
import { GroupStageContent } from "./GroupStage";
import { TeamSelectionContent } from "./TeamSelection";

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
    default:
      children = null;
  }
  return <Container>{children}</Container>;
};
