import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Importar datos reales
import fantasyData from '../../data/season-6/fantasy-data.json';
import fantasyMainData from '../../data/season-6/fantasy-main-data.json';

// Styled components manteniendo tu estilo
const ChartCard = styled(motion.div)`
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 368px;
  height: 276px;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const ChartTitle = styled.h3`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #50ff10, transparent);
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const WardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 30px 50px;
`;

const WardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(80, 255, 16, 0.2);
  position: relative;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
`;

const WardDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 6px ${props => props.color}80;
`;

const WardName = styled.span`
  color: #ffffff;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  flex: 1;
`;

const WardIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const WardValue = styled.span<{ color: string }>`
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 16px;
  background: rgba(31, 30, 30, 0.6);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  padding: 12px;
  font-family: 'Rethink Sans', sans-serif;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 2147483647;
  pointer-events: auto;
  max-width: 240px;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  transition: opacity 0.2s ease;
`;

const TooltipContent = styled.div`
  display: flex;
  gap: 8px;
`;

const TooltipLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 60px;
  background: rgba(80, 255, 16, 0.3);
  border-radius: 8px;
  padding: 8px;
`;

const TooltipHeroImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const TooltipRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 150px;
`;

const TooltipPlayerName = styled.div`
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
`;

const TooltipStat = styled.div`
  font-size: 16px;
  color: #50ff10;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  text-align: left;
  margin-bottom: 2px;
`;

const TooltipInfo = styled.div`
  font-size: 12px;
  color: #cccccc;
`;

const TooltipMatchId = styled.a`
  font-size: 10px;
  color: #50ff10;
  font-family: 'Rethink Sans', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #70ff30;
    text-decoration: underline;
  }
`;

// Colores neón como en tu diseño
const neonColors = ['#50ff10', '#ff6b35', '#4ecdc4'];

type ChartJSWardsExampleProps = {
  phase?: 'fase' | 'evento';
};


export const ChartJSWardsExample: React.FC<ChartJSWardsExampleProps> = ({ phase = 'fase' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Seleccionar el archivo de datos según la fase activa
  const dataSource = phase === 'fase' ? fantasyData : fantasyMainData;
  
  // Usar datos reales del JSON
  const wardsData = dataSource.rankings.wards.slice(0, 3);
  
  // Ocultar tooltips de otros charts cuando se muestra el tooltip de Wards
  useEffect(() => {
    if (hoveredIndex !== null) {
      // Hide all chart tooltips when showing wards tooltip
      const allTooltips = document.querySelectorAll('div[class*="chartjs-tooltip"]');
      allTooltips.forEach((el: any) => {
        el.style.opacity = '0';
      });
    }
  }, [hoveredIndex]);
  
  return (
    <ChartCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <ChartTitle>
        <span style={{ fontSize: '20px', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' }}>👁️</span>
        WARDS COLOCADOS
      </ChartTitle>
      <ChartContainer>
        <WardsList>
          {wardsData.map((item, index) => (
            <WardItem 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <WardDot color={neonColors[index]} />
              <WardName>{item.player}</WardName>
              <WardIcon src="/images/items/ward.webp" alt="Ward" />
              <WardValue color={neonColors[index]}>{item.record}</WardValue>
              <Tooltip show={hoveredIndex === index}>
                <TooltipContent>
                  <TooltipLeft>
                    {item.heroImage && (
                      <TooltipHeroImage 
                        src={`/images/heroes/${item.heroImage}`} 
                        alt="Hero" 
                      />
                    )}
                  </TooltipLeft>
                  <TooltipRight>
                    <TooltipPlayerName>{item.player}</TooltipPlayerName>
                    <TooltipStat>👁️ {item.record} wards</TooltipStat>
                    <TooltipInfo>🛡️ {item.team}</TooltipInfo>
                    {item.matchId && (
                      <TooltipMatchId 
                        href={`https://www.dotabuff.com/matches/${item.matchId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🔗 Match ID: {item.matchId}
                      </TooltipMatchId>
                    )}
                  </TooltipRight>
                </TooltipContent>
              </Tooltip>
            </WardItem>
          ))}
        </WardsList>
      </ChartContainer>
    </ChartCard>
  );
};
