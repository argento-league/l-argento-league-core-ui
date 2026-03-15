import { useState, useEffect } from "react";

import { CurrentSeasonGrid } from "@components/current-season/CurrentSeasonGrid";
import { TabContent } from "@components/current-season/tab-content";
import { TabList } from "@components/current-season/tab";
import { TabsEnum, TABS_CONFIG } from "@constants/current-season/information";
import { SeasonThemeProvider, SEASON_7_THEME } from "../../context/SeasonThemeContext";

export const CurrentSeasonPage = () => {
  return (
    <SeasonThemeProvider theme={SEASON_7_THEME}>
      <CurrentSeasonGrid />
      <CurrentSeasonDetails />
    </SeasonThemeProvider>
  );
};

const CurrentSeasonDetails = () => {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(
    TabsEnum.InfoGeneral
  );

  // Si la pestaña seleccionada no está habilitada, cambiar a la primera habilitada
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
