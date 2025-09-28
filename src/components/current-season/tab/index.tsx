import { Container } from "../../common/Container";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { ReactNode } from "react";
import { MobileTabList } from "./mobile";
import { Tabs, TabsContainer, TabsWrapper } from "./styles";
import { TabsEnum, TABS_CONFIG } from "../../../constants/current-season/information";

const DesktopTabList = ({ selectedTab, tabList, onSelectTab }: TabProps) => {
  return (
    <TabsContainer>
      <Container>
        <TabsWrapper>
          {tabList.map((tab, i) => {
            const isEnabled = TABS_CONFIG[tab as TabsEnum]?.enabled ?? true;
            return (
              <Tabs
                key={tab}
                selected={selectedTab === tabList[i]}
                disabled={!isEnabled}
                onClick={() => isEnabled && onSelectTab(tab as TabsEnum)}
              >
                {tab}
              </Tabs>
            );
          })}
        </TabsWrapper>
      </Container>
    </TabsContainer>
  );
};

export type TabProps = {
  selectedTab: TabsEnum;
  tabList: TabsEnum[];
  onSelectTab: (tab: TabsEnum) => void;
};

export const TabList = ({
  selectedTab,
  tabList,
  onSelectTab,
}: TabProps): ReactNode | null => {
  const isMobile = useIsMobile(720);

  if (isMobile) {
    return (
      <MobileTabList
        selectedTab={selectedTab}
        tabList={tabList}
        onSelectTab={onSelectTab}
      />
    );
  }

  return (
    <DesktopTabList
      selectedTab={selectedTab}
      tabList={tabList}
      onSelectTab={onSelectTab}
    />
  );
};
