import styled from "styled-components";
import "./App.css";
import "./fonts.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/index";
import { NavBar } from "./components/navbar";
import { SeasonFour } from "./pages/season-four";
import { SeasonFive } from "./pages/season-five";
import { CurrentSeasonPage } from "./pages/current-season";
import { FantasyPage } from "./pages/fantasy";
import { Footer } from "@components/footer";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppContainer>
      <NavBar />
      {
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/season-4" element={<SeasonFour />} />
          <Route path="/season-5" element={<SeasonFive />} />
          <Route path="/current-season" element={<CurrentSeasonPage />} />
          <Route path="/fantasy" element={<FantasyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      }
      <Footer />
    </AppContainer>
  );
}

export default App;
