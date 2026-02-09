import { useState, useEffect } from "react";

import { CurrentSeasonGrid } from "@components/current-season/CurrentSeasonGrid";
import { TabContent } from "@components/current-season/tab-content";
import { TabList } from "@components/current-season/tab";
import { TabsEnum, TABS_CONFIG } from "@constants/current-season/information";
import { SeasonThemeProvider, SEASON_6_THEME } from "../../context/SeasonThemeContext";

export const SeasonSixPage = () => {
  return (
    <SeasonThemeProvider theme={SEASON_6_THEME}>
      <CurrentSeasonGrid />
      <SeasonSixDetails />
    </SeasonThemeProvider>
  );
};

const SeasonSixDetails = () => {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(
    TabsEnum.InfoGeneral
  );

  useEffect(() => {
    const isCurrentTabEnabled = TABS_CONFIG[selectedTab]?.enabled ?? true;
    if (!isCurrentTabEnabled) {
      const firstEnabledTab = Object.values(TabsEnum).find(
        (tab) => TABS_CONFIG[tab]?.enabled ?? true
      );
      if (firstEnabledTab) {
        setSelectedTab(firstEnabledTab);
      }
    }
  }, [selectedTab]);

  return (
    <>
      <TabList
        selectedTab={selectedTab}
        tabList={Object.values(TabsEnum)}
        onSelectTab={setSelectedTab}
      />
      <TabContent selectedTab={selectedTab} />
    </>
  );
};
