import { MainContent } from "../../components/home/MainContent";
import { FAQ } from "../../components/home/FAQ";
import { Container } from "../../components/common/Container";

export const HomePage = () => {
  return (
    <>
      <MainContent />
      <Container>
        <FAQ />
      </Container>
    </>
  );
};
