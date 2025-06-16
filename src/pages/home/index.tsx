import { MainContent } from "../../components/home/MainContent";
import { LeagueInformation } from "../../components/home/LeagueInformation";
import { CurrentState } from "../../components/home/CurrentState";
import { FAQ } from "../../components/home/FAQ";
import { Container } from "../../components/common/Container";

export const HomePage = () => {
  return (
    <>
      <MainContent />
      {/* <LeagueInformation />
      <CurrentState /> */}
      <Container>
        <FAQ />
      </Container>
    </>
  );
};
