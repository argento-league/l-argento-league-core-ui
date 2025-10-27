import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";


// Import Chart.js examples
import { ChartJSExample } from "../../components/charts/ChartJSExample";
import { ChartJSVerticalExample } from "../../components/charts/ChartJSVerticalExample";
import { ChartJSAssistsExample } from "../../components/charts/ChartJSAssistsExample";
import { ChartJSWardsExample } from "../../components/charts/ChartJSWardsExample";
import { ChartJSPieExample } from "../../components/charts/ChartJSPieExample";
import { ChartJSLineExample } from "../../components/charts/ChartJSLineExample";
import { ChartJSRecordsExample } from "../../components/charts/ChartJSRecordsExample";


const FantasyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 20, 0, 0.6) 100%),
    url('/images/NewsCardBackgroundImage.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

// Glass Effect Components
const GlassCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const GlassButton = styled(motion.button)`
  background: linear-gradient(135deg, rgba(80, 255, 16, 0.8) 0%, rgba(80, 255, 16, 0.6) 100%);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(80, 255, 16, 0.5);
  border-radius: 12px;
  color: #000000;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 16px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(80, 255, 16, 0.3);

  &:hover {
    background: linear-gradient(135deg, rgba(80, 255, 16, 1) 0%, rgba(80, 255, 16, 0.8) 100%);
    box-shadow: 0 8px 24px rgba(80, 255, 16, 0.5);
    transform: translateY(-2px);
  }
`;

// Secondary Navigation - Phase Tabs
const SecondaryNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(80, 255, 16, 0.2);
  margin-bottom: 32px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 16px 0;
  max-width: 1200px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 24px;
    padding: 12px 0;
  }
`;

const TabButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ disabled }) => disabled ? "#666" : "#ffffff"};
  font-family: "Outfit", sans-serif;
  font-weight: ${({ active }) => active ? "600" : "300"};
  font-size: 16px;
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
  padding: 12px 24px;
  position: relative;
  transition: all 0.3s ease;
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  text-shadow: ${({ active, disabled }) => 
    active && !disabled
      ? "0 0 10px rgba(138, 43, 226, 0.8), 0 0 20px rgba(138, 43, 226, 0.6)" 
      : "none"};

  &:hover {
    opacity: ${({ disabled }) => disabled ? 0.4 : 0.8};
    text-shadow: ${({ disabled }) => 
      disabled ? "none" : "0 0 10px rgba(138, 43, 226, 0.6)"};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => active ? "100%" : "0%"};
    height: 3px;
    background: #50ff10;
    transition: width 0.3s ease;
    box-shadow: 0 0 10px #50ff10;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

// Hero Section
const HeroSection = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  width: 100%;
  max-width: 1172px;
  align-items: start;
  padding: 0 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 48px;
  }

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const LeftHeroContent = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
  border-radius: 20px;
  height: 100%;
  min-height: 580px;
  box-sizing: border-box;
`;

const FantasyTitle = styled.h1`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #50ff10;
  margin: 0;
  text-shadow: 0 0 20px rgba(80, 255, 16, 0.5);

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const FantasySubtitle = styled.p`
  font-family: "Rethink Sans", sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FantasyDescription = styled.p`
  font-family: "Rethink Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
`;

const RightHeroWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;



// Statistics Section
const StatisticsSection = styled.div`
  width: 100%;
  max-width: 1172px;
  padding: 20px 12px;

  @media (max-width: 1200px) {
    padding: 20px 48px;
  }

  @media (max-width: 768px) {
    padding: 20px 0px;
  }
`;

const StatisticsTitle = styled.h2`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 24px;
  text-shadow: 0 0 20px rgba(80, 255, 16, 0.3);

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const StatisticsContainer = styled(GlassCard)`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0 10px;

  @media (max-width: 768px) {
    padding: 32px 10px;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 32px;
  justify-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    max-width: 800px;
    margin: 0 auto 32px auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    max-width: 300px;
    margin: 0 auto 32px auto;
  }
`;

const NetWorthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0 10px;

  @media (max-width: 1200px) {
    max-width: 780px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    max-width: 300px;
    margin: 0 auto;
  }
`;



export const FantasyPage = () => {
  const [activePhase, setActivePhase] = useState<'fase' | 'evento'>('fase');

  return (
    <FantasyContainer>
      {/* Secondary Navigation */}
      <SecondaryNav>
        <TabsContainer>
          <TabButton 
            active={activePhase === 'fase'} 
            onClick={() => setActivePhase('fase')}
          >
            Fase de grupos
          </TabButton>
          <TabButton 
            active={activePhase === 'evento'} 
            onClick={() => setActivePhase('evento')}
          >
            Evento principal
          </TabButton>
        </TabsContainer>
      </SecondaryNav>

      {/* Hero Section */}
      <HeroSection>
            <HeroContent>
              {/* Left Content - Fantasy Season 6 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <LeftHeroContent>
                <FantasyTitle>FANTASY SEASON 6</FantasyTitle>
                <FantasySubtitle>Participá por una arcana</FantasySubtitle>
                <FantasyDescription>
                  Completa tus predicciones en nuestro form, atiná a la mayor cantidad de respuestas posibles y llevate una arcana. Se podrá participar en instancia de fase de grupos y en evento principal.
                </FantasyDescription>
                <GlassButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Completar mi fantasy
                </GlassButton>
                </LeftHeroContent>
              </motion.div>

              {/* Right Content - Current Records */}
              <RightHeroWrapper
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ChartJSRecordsExample phase={activePhase} />
              </RightHeroWrapper>
            </HeroContent>
      </HeroSection>

      {/* Statistics Section */}
      <StatisticsSection>
        <StatisticsTitle>
          Estadísticas
        </StatisticsTitle>
        
        <StatisticsContainer>
          <ChartsGrid>
          {/* Kills Chart - Chart.js */}
          <ChartJSExample phase={activePhase} />

          {/* Deaths Chart - Chart.js con leyenda */}
          <ChartJSVerticalExample phase={activePhase} />

          {/* Assists Chart - Chart.js con leyenda */}
          <ChartJSAssistsExample phase={activePhase} />

          {/* Last Hits Chart - Chart.js */}
          <ChartJSPieExample 
            title="LAST HITS" 
            dataKey="lastHits" 
            delay={0.7}
            icon="💎"
            iconFilter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))"
            phase={activePhase}
          />

          {/* GPM Chart - Chart.js */}
          <ChartJSPieExample 
            title="ORO POR MINUTO" 
            dataKey="gpm" 
            delay={0.8}
            icon="💰"
            iconFilter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))"
            phase={activePhase}
          />

          {/* Wards Chart - Simple list style */}
          <ChartJSWardsExample phase={activePhase} />
        </ChartsGrid>

          {/* Net Worth Line Chart - Chart.js */}
          <NetWorthContainer>
            <ChartJSLineExample phase={activePhase} />
          </NetWorthContainer>
        </StatisticsContainer>
      </StatisticsSection>
    </FantasyContainer>
  );
};