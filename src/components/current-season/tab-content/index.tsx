import { ReactNode } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { InfoTabContentMobile } from "./mobile/Info";
import { InfoTabContent } from "./Info";
import { TeamsTabContent } from "./Team";
import { Container } from "../../common/Container";
import { TabsEnum } from "../../../constants/current-season/information";

type TabContentProps = {
  selectedTab: TabsEnum;
};

export const TabContent = ({ selectedTab }: TabContentProps) => {
  const isMobile = useIsMobile(720);
  let children: ReactNode | null = null;
  switch (selectedTab) {
    case TabsEnum.InfoGeneral:
      children = isMobile ? <InfoTabContentMobile /> : <InfoTabContent />;
      break;
    case TabsEnum.Equipos:
      children = <TeamsTabContent />;
      break;
    default:
      children = null;
  }
  return <Container>{children}</Container>;
};
