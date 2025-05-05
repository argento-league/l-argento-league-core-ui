import { MainContent } from "../../components/home/MainContent";
import { LeagueInformation } from "../../components/home/LeagueInformation";
import { CurrentState } from "../../components/home/CurrentState";
import { FAQ } from "../../components/home/FAQ";

export const HomePage = () => {
  return (
    <>
      <MainContent />
      <LeagueInformation />
      <CurrentState />
      <FAQ />
    </>
  );
};
