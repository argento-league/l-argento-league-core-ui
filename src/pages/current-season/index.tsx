import { useState } from "react";

import { CurrentSeasonGrid } from "@components/current-season/CurrentSeasonGrid";
import { TabContent } from "@components/current-season/tab-content";
import { TabList } from "@components/current-season/tab";
import { TabsEnum } from "@constants/current-season/information";

export const CurrentSeasonPage = () => {
  return (
    <>
      <CurrentSeasonGrid />
      <CurrentSeasonDetails />
    </>
  );
};

const CurrentSeasonDetails = () => {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(
    TabsEnum.InfoGeneral
  );

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
