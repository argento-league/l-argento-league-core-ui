import { TabsContainer } from "../styles";
import { TabProps } from "..";
import { Container } from "../../../common/Container";
import { MobileTabs, MobileTabsWrapper } from "./styles";
import { TabsEnum } from "../../../../constants/current-season/information";

export const MobileTabList = ({
  selectedTab,
  onSelectTab,
  tabList,
}: TabProps) => {
  return (
    <TabsContainer>
      <Container>
        <MobileTabsWrapper>
          {tabList.map((tab) => (
            <MobileTabs
              key={tab}
              selected={selectedTab === tab}
              onClick={() => onSelectTab(tab as TabsEnum)}
              disabled={
                tab === TabsEnum.EventoPrincipal
              }
            >
              {tab}
            </MobileTabs>
          ))}
        </MobileTabsWrapper>
      </Container>
    </TabsContainer>
  );
};
