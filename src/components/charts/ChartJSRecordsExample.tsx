import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components manteniendo tu estilo
const RecordsCard = styled(motion.div)`
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: auto;
  margin-bottom: 48px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20px 20px, rgba(80, 255, 16, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 40px 40px, rgba(80, 255, 16, 0.1) 1px, transparent 1px);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    opacity: 0.3;
    pointer-events: none;
  }
`;


const RecordsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
`;

const RecordsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  text-align: left;
  border-bottom: 2px solid #50ff10;
  
  span:nth-child(1) {
    text-align: left;
  }
  span:nth-child(2) {
    text-align: center;
  }
  span:nth-child(3) {
    text-align: right;
  }
`;

const RecordRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background: transparent;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(80, 255, 16, 0.05);
  }
`;

const RecordType = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const RecordIcon = styled.span`
  font-size: 20px;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
`;

const RecordPlayer = styled.div`
  font-family: 'Rethink Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecordValue = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #50ff10;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const InfoIcon = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background-color: rgba(80, 255, 16, 0.3);
    transform: scale(1.1);
  }
`;

const TooltipWrapper = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 12px;
  border: 2px solid rgba(80, 255, 16, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(80, 255, 16, 0.3);
  padding: 12px;
  font-family: 'Rethink Sans', sans-serif;
  backdrop-filter: blur(10px);
  z-index: 2147483647;
  pointer-events: none;
  max-width: 240px;
`;

const TooltipContent = styled.div`
  display: flex;
  gap: 10px;
`;

const TooltipLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 80px;
`;

const TooltipHeroImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 8px;
  border: 2px solid #50ff10;
  box-shadow: 0 0 15px rgba(80, 255, 16, 0.5);
`;

const TooltipStat = styled.div`
  font-size: 16px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  text-align: center;
`;

const TooltipRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 150px;
`;

const TooltipPlayerName = styled.div`
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
`;

const TooltipInfo = styled.div`
  font-size: 12px;
  color: #cccccc;
`;

const TooltipMatchId = styled.div`
  font-size: 10px;
  color: #888888;
  font-family: 'Rethink Sans', sans-serif;
`;

// Importar datos reales
import fantasyData from '../../data/season-6/fantasy-data.json';

// Mapeo de tipos de records a iconos (emojis más visibles)
const recordIcons = {
  'Kills': '⚔️',
  'Asistencias': '🤝',
  'Muertes': '💀',
  'OPM': '💰',
  'Last Hits': '💎',
  'Valor Neto': '💵',
  'Wards Colocados': '👁️',
};

// Función para obtener el mejor record de cada tipo
const getBestRecords = () => {
  const records = [
    {
      type: 'Kills',
      player: fantasyData.rankings.kills[0]?.player || 'N/A',
      value: fantasyData.rankings.kills[0]?.record || 0,
      team: fantasyData.rankings.kills[0]?.team || 'N/A',
      matchId: fantasyData.rankings.kills[0]?.matchId || 'N/A',
      heroImage: fantasyData.rankings.kills[0]?.heroImage || '',
      date: '2/10/25',
      emoji: '⚔️'
    },
    {
      type: 'Asistencias',
      player: fantasyData.rankings.assists[0]?.player || 'N/A',
      value: fantasyData.rankings.assists[0]?.record || 0,
      team: fantasyData.rankings.assists[0]?.team || 'N/A',
      matchId: fantasyData.rankings.assists[0]?.matchId || 'N/A',
      heroImage: fantasyData.rankings.assists[0]?.heroImage || '',
      date: '2/10/25',
      emoji: '🤝'
    },
    {
      type: 'Muertes',
      player: fantasyData.rankings.deaths[0]?.player || 'N/A',
      value: fantasyData.rankings.deaths[0]?.record || 0,
      team: fantasyData.rankings.deaths[0]?.team || 'N/A',
      matchId: fantasyData.rankings.deaths[0]?.matchId || 'N/A',
      heroImage: fantasyData.rankings.deaths[0]?.heroImage || '',
      date: '2/10/25',
      emoji: '💀'
    },
    {
      type: 'OPM',
      player: fantasyData.rankings.gpm[0]?.player || 'N/A',
      value: fantasyData.rankings.gpm[0]?.record || 0,
      team: fantasyData.rankings.gpm[0]?.team || 'N/A',
      matchId: fantasyData.rankings.gpm[0]?.matchId || 'N/A',
      heroImage: fantasyData.rankings.gpm[0]?.heroImage || '',
      date: '2/10/25',
      emoji: '💰'
    },
    {
      type: 'Last Hits',
      player: fantasyData.rankings.lastHits[0]?.player || 'N/A',
      value: fantasyData.rankings.lastHits[0]?.record || 0,
      team: fantasyData.rankings.lastHits[0]?.team || 'N/A',
      matchId: fantasyData.rankings.lastHits[0]?.matchId || 'N/A',
      heroImage: fantasyData.rankings.lastHits[0]?.heroImage || '',
      date: '2/10/25',
      emoji: '💎'
    },
    {
      type: 'Wards Colocados',
      player: fantasyData.rankings.wards[0]?.player || 'N/A',
      value: fantasyData.rankings.wards[0]?.record || 0,
      team: fantasyData.rankings.wards[0]?.team || 'N/A',
      matchId: fantasyData.rankings.wards[0]?.matchId || 'N/A',
      heroImage: fantasyData.rankings.wards[0]?.heroImage || '',
      date: '2/10/25',
      emoji: '👁️'
    },
    {
      type: 'Valor Neto',
      player: fantasyData.rankings.netWorth.players[0]?.name || 'N/A',
      value: Math.max(...(fantasyData.rankings.netWorth.players[0]?.netWorth || [0])),
      team: fantasyData.rankings.netWorth.players[0]?.team || 'N/A',
      matchId: fantasyData.rankings.netWorth.players[0]?.matchId || 'N/A',
      heroImage: fantasyData.rankings.netWorth.players[0]?.heroImage || '',
      date: '2/10/25',
      emoji: '💵'
    }
  ];

  return records;
};

// Componente Tooltip que se renderiza usando Portal
interface TooltipPortalProps {
  record: {
    type: string;
    player: string;
    value: number;
    team: string;
    matchId: string;
    heroImage: string;
    date: string;
    emoji: string;
  };
  position: { x: number; y: number };
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ record, position }) => {
  return ReactDOM.createPortal(
    <TooltipWrapper
      style={{
        left: `${position.x}px`,
        top: `${position.y - 10}px`,
        transform: 'translate(0%, -100%)' // Sin centrar horizontalmente
      }}
    >
      <TooltipContent>
        <TooltipLeft>
          <TooltipHeroImage 
            src={`/images/heroes/${record.heroImage}`}
            alt="Hero"
          />
          <TooltipStat>
            {record.emoji} {record.value.toLocaleString()}
          </TooltipStat>
        </TooltipLeft>
        <TooltipRight>
          <TooltipPlayerName>{record.player}</TooltipPlayerName>
          <TooltipInfo>🛡️ {record.team}</TooltipInfo>
          <TooltipInfo>📅 {record.date}</TooltipInfo>
          <TooltipMatchId>Match ID: {record.matchId}</TooltipMatchId>
        </TooltipRight>
      </TooltipContent>
    </TooltipWrapper>,
    document.body
  );
};

export const ChartJSRecordsExample: React.FC = () => {
  const records = getBestRecords();
  const [hoveredRecord, setHoveredRecord] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left - 300, // Desplazar más a la izquierda
      y: rect.top + 50
    });
    setHoveredRecord(index);
  };

  const handleMouseLeave = () => {
    setHoveredRecord(null);
  };

  return (
    <>
      <RecordsCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <RecordsTable>
          <RecordsHeader>
            <span>Records actuales</span>
            <span>Player</span>
            <span>Valor</span>
          </RecordsHeader>
          
          {records.map((record, index) => (
            <RecordRow key={index}>
              <RecordType>
                <RecordIcon>
                  {recordIcons[record.type as keyof typeof recordIcons]}
                </RecordIcon>
                {record.type}
              </RecordType>
              <RecordPlayer>{record.player}</RecordPlayer>
              <RecordValue>
                <InfoIcon
                  onMouseEnter={(e) => handleMouseEnter(index, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  ?
                </InfoIcon>
                {record.value.toLocaleString()}
              </RecordValue>
            </RecordRow>
          ))}
        </RecordsTable>
      </RecordsCard>

      {/* Tooltip Portal */}
      {hoveredRecord !== null && (
        <TooltipPortal 
          record={records[hoveredRecord]} 
          position={tooltipPosition}
        />
      )}
    </>
  );
};
