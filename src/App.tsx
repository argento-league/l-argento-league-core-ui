import styled from "styled-components";
import "./App.css";
import "./fonts.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/index";
import { NavBar } from "./components/navbar";
import { SeasonFour } from "./pages/season-four";
import { CurrentSeasonPage } from "./pages/current-season";
import { Footer } from "@components/footer";
import Snowfall from "react-snowfall";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppContainer>
			<Snowfall
			>
				
			</Snowfall>
      <NavBar />
      {
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/season-4" element={<SeasonFour />} />
          <Route path="/current-season" element={<CurrentSeasonPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      }
      <Footer />
    </AppContainer>
  );
}

export default App;
