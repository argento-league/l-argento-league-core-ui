import styled from "styled-components";
import "./App.css";
import "./fonts.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/index";
import { NavBar } from "./components/home/Navbar";
import { SeasonFour } from "./pages/season-four";

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
        </Routes>
      }
    </AppContainer>
  );
}

export default App;
