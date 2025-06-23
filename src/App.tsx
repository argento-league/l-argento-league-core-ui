import styled from "styled-components";
import "./App.css";
import "./fonts.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/index";
import { NavBar } from "./components/navbar";
import { SeasonFour } from "./pages/season-four";
import { CurrentSeasonPage } from "./pages/current-season";
import { StyledSvg } from "./components/common/StyledSVG";
import argentoLogo from "./assets/footer/l-argento-text.svg";
import dota2logo from "./assets/footer/dota-2-logo.svg";

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
          <Route path="/current-season" element={<CurrentSeasonPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      }
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "16px",
          paddingBottom: "16px",
          width: "100%",
          backgroundColor: "#101010",
          gap: "16px",
          color: "white",
          marginTop: "auto",
        }}
      >
        <div style={{ width: "140px", height: "30px" }}>
          <StyledSvg src={argentoLogo} width="120px" height="20px" />
        </div>
        |
        <StyledSvg src={dota2logo} width="105px" />
      </div>
    </AppContainer>
  );
}

export default App;
