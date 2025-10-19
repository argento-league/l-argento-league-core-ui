import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Importar datos reales
import fantasyData from '../../data/season-6/fantasy-data.json';

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

// Usar datos reales del JSON
const wardsData = fantasyData.rankings.wards.slice(0, 3);

// Colores neón como en tu diseño
const neonColors = ['#50ff10', '#ff6b35', '#4ecdc4'];

export const ChartJSWardsExample: React.FC = () => {
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
            <WardItem key={index}>
              <WardDot color={neonColors[index]} />
              <WardName>{item.player}</WardName>
              <WardIcon src="/images/items/ward.webp" alt="Ward" />
              <WardValue color={neonColors[index]}>{item.record}</WardValue>
            </WardItem>
          ))}
        </WardsList>
      </ChartContainer>
    </ChartCard>
  );
};
