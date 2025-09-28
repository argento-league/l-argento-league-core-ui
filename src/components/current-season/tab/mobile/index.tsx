import { TabsContainer } from "../styles";
import { TabProps } from "..";
import { Container } from "../../../common/Container";
import { MobileTabs, MobileTabsWrapper } from "./styles";
import { TabsEnum, TABS_CONFIG } from "../../../../constants/current-season/information";

export const MobileTabList = ({
  selectedTab,
  onSelectTab,
  tabList,
}: TabProps) => {
  return (
    <TabsContainer>
      <Container>
        <MobileTabsWrapper>
          {tabList.map((tab) => {
            const isEnabled = TABS_CONFIG[tab as TabsEnum]?.enabled ?? true;
            return (
              <MobileTabs
                key={tab}
                selected={selectedTab === tab}
                disabled={!isEnabled}
                onClick={() => isEnabled && onSelectTab(tab as TabsEnum)}
              >
                {tab}
              </MobileTabs>
            );
          })}
        </MobileTabsWrapper>
      </Container>
    </TabsContainer>
  );
};
