import { Container } from "../../common/Container";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { ReactNode } from "react";
import { MobileTabList } from "./mobile";
import { Tabs, TabsContainer, TabsWrapper } from "./styles";
import { TabsEnum, TABS_CONFIG } from "../../../constants/current-season/information";

const DesktopTabList = ({ selectedTab, tabList, onSelectTab, disabledTabs }: TabProps) => {
  return (
    <TabsContainer>
      <Container>
        <TabsWrapper>
          {tabList.map((tab, i) => {
            const configEnabled = TABS_CONFIG[tab as TabsEnum]?.enabled ?? true;
            const isDisabledByPage = disabledTabs?.includes(tab as TabsEnum);
            const isEnabled = configEnabled && !isDisabledByPage;
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
  /** Pestañas deshabilitadas para esta página (se muestran pero no son clickeables) */
  disabledTabs?: TabsEnum[];
};

export const TabList = ({
  selectedTab,
  tabList,
  onSelectTab,
  disabledTabs,
}: TabProps): ReactNode | null => {
  const isMobile = useIsMobile(720);

  if (isMobile) {
    return (
      <MobileTabList
        selectedTab={selectedTab}
        tabList={tabList}
        onSelectTab={onSelectTab}
        disabledTabs={disabledTabs}
      />
    );
  }

  return (
    <DesktopTabList
      selectedTab={selectedTab}
      tabList={tabList}
      onSelectTab={onSelectTab}
      disabledTabs={disabledTabs}
    />
  );
};
