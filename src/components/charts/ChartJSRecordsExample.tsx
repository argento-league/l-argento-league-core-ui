import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';


// Styled components manteniendo tu estilo
const TableContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px); /* AQUÍ MODIFICAS EL BLUR */
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 18px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  margin-bottom: 48px;
  
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

const TabButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  z-index: 10;
  position: relative;
`;


const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.active ? `
    background: rgba(80, 255, 16, 0.2);
    color: #ffffff;
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
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
  background: rgba(31, 30, 30, 0.6);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  padding: 12px;
  font-family: 'Rethink Sans', sans-serif;
  backdrop-filter: blur(5px);
  z-index: 2147483647;
  pointer-events: auto;
  max-width: 240px;
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

const TooltipStat = styled.div`
  font-size: 16px;
  color: #50ff10;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  text-align: left;
  margin-bottom: 2px;
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

// Importar datos reales
import fantasyData from '../../data/season-6/fantasy-data.json';
import fantasyMainData from '../../data/season-6/fantasy-main-data.json';

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

type ChartJSRecordsExampleProps = {
  phase?: 'fase' | 'evento';
};

// Función para obtener el mejor record de cada tipo
const getBestRecords = (phase: 'fase' | 'evento' = 'fase') => {
  // Seleccionar el archivo de datos según la fase activa para los records
  const recordsDataSource = phase === 'fase' ? fantasyData : fantasyMainData;
  
  const records = [
    {
      type: 'Kills',
      player: recordsDataSource.rankings.kills[0]?.player || 'N/A',
      value: recordsDataSource.rankings.kills[0]?.record || 0,
      team: recordsDataSource.rankings.kills[0]?.team || 'N/A',
      matchId: recordsDataSource.rankings.kills[0]?.matchId || 'N/A',
      heroImage: recordsDataSource.rankings.kills[0]?.heroImage || '',
      emoji: '⚔️'
    },
    {
      type: 'Asistencias',
      player: recordsDataSource.rankings.assists[0]?.player || 'N/A',
      value: recordsDataSource.rankings.assists[0]?.record || 0,
      team: recordsDataSource.rankings.assists[0]?.team || 'N/A',
      matchId: recordsDataSource.rankings.assists[0]?.matchId || 'N/A',
      heroImage: recordsDataSource.rankings.assists[0]?.heroImage || '',
      emoji: '🤝'
    },
    {
      type: 'Muertes',
      player: recordsDataSource.rankings.deaths[0]?.player || 'N/A',
      value: recordsDataSource.rankings.deaths[0]?.record || 0,
      team: recordsDataSource.rankings.deaths[0]?.team || 'N/A',
      matchId: recordsDataSource.rankings.deaths[0]?.matchId || 'N/A',
      heroImage: recordsDataSource.rankings.deaths[0]?.heroImage || '',
      emoji: '💀'
    },
    {
      type: 'OPM',
      player: recordsDataSource.rankings.gpm[0]?.player || 'N/A',
      value: recordsDataSource.rankings.gpm[0]?.record || 0,
      team: recordsDataSource.rankings.gpm[0]?.team || 'N/A',
      matchId: recordsDataSource.rankings.gpm[0]?.matchId || 'N/A',
      heroImage: recordsDataSource.rankings.gpm[0]?.heroImage || '',
      emoji: '💰'
    },
    {
      type: 'Last Hits',
      player: recordsDataSource.rankings.lastHits[0]?.player || 'N/A',
      value: recordsDataSource.rankings.lastHits[0]?.record || 0,
      team: recordsDataSource.rankings.lastHits[0]?.team || 'N/A',
      matchId: recordsDataSource.rankings.lastHits[0]?.matchId || 'N/A',
      heroImage: recordsDataSource.rankings.lastHits[0]?.heroImage || '',
      emoji: '💎'
    },
    {
      type: 'Wards Colocados',
      player: recordsDataSource.rankings.wards[0]?.player || 'N/A',
      value: recordsDataSource.rankings.wards[0]?.record || 0,
      team: recordsDataSource.rankings.wards[0]?.team || 'N/A',
      matchId: recordsDataSource.rankings.wards[0]?.matchId || 'N/A',
      heroImage: recordsDataSource.rankings.wards[0]?.heroImage || '',
      emoji: '👁️'
    },
    {
      type: 'Valor Neto',
      player: recordsDataSource.rankings.netWorth.players[0]?.name || 'N/A',
      value: Math.max(...(recordsDataSource.rankings.netWorth.players[0]?.netWorth || [0])),
      team: recordsDataSource.rankings.netWorth.players[0]?.team || 'N/A',
      matchId: recordsDataSource.rankings.netWorth.players[0]?.matchId || 'N/A',
      heroImage: recordsDataSource.rankings.netWorth.players[0]?.heroImage || '',
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
    emoji: string;
  };
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ record, position, onMouseEnter, onMouseLeave }) => {
  return ReactDOM.createPortal(
    <TooltipWrapper
      data-tooltip="true"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 10}px`,
        transform: 'translate(0%, -100%)' // Sin centrar horizontalmente
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TooltipContent>
        <TooltipLeft>
          <TooltipHeroImage 
            src={`/images/heroes/${record.heroImage}`}
            alt="Hero"
          />
        </TooltipLeft>
        <TooltipRight>
          <TooltipPlayerName>{record.player}</TooltipPlayerName>
          <TooltipStat>
            {record.emoji} {record.value.toLocaleString()}
          </TooltipStat>
          <TooltipInfo>🛡️ {record.team}</TooltipInfo>
          <TooltipMatchId 
            href={`https://www.dotabuff.com/matches/${record.matchId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Match ID: {record.matchId}
          </TooltipMatchId>
        </TooltipRight>
      </TooltipContent>
    </TooltipWrapper>,
    document.body
  );
};

export const ChartJSRecordsExample: React.FC<ChartJSRecordsExampleProps> = ({ phase = 'fase' }) => {
  const records = getBestRecords(phase);
  const [activeTab, setActiveTab] = useState<'fantasy' | 'participantes'>('fantasy');
  const [hoveredRecord, setHoveredRecord] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Función para obtener datos de participantes
  const getParticipantsData = () => {
    return fantasyData.classification.map((participant, index) => {
      let emoji = '🏆'; // Default para posiciones 4+
      if (index === 0) emoji = '🥇'; // 1er lugar - Oro
      else if (index === 1) emoji = '🥈'; // 2do lugar - Plata
      else if (index === 2) emoji = '🥉'; // 3er lugar - Bronce
      
      return {
        position: index + 1,
        player: participant.player,
        score: participant.score,
        emoji: emoji
      };
    });
  };

  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    // Hide all chart tooltips when showing table tooltip
    const allTooltips = document.querySelectorAll('div[class*="chartjs-tooltip"]');
    allTooltips.forEach((el: any) => {
      el.style.opacity = '0';
    });
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left - 300, // Desplazar más a la izquierda
      y: rect.top + 50
    });
    setHoveredRecord(index);
  };

  const handleMouseLeave = () => {
    // No timer - tooltip stays visible until another is shown or scroll
  };

  const handleTooltipMouseEnter = () => {
    // No timer needed
  };

  const handleTooltipMouseLeave = () => {
    // No timer - tooltip stays visible until another is shown or scroll
  };

  // Hide tooltip when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setHoveredRecord(null);
    };

    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);


  const participantsData = getParticipantsData();

  return (
    <>
      <TabButtons>
        <TabButton 
          active={activeTab === 'fantasy'} 
          onClick={() => setActiveTab('fantasy')}
        >
          Fantasy
        </TabButton>
        <TabButton 
          active={activeTab === 'participantes'} 
          onClick={() => setActiveTab('participantes')}
        >
          Participantes
        </TabButton>
      </TabButtons>

      <TableContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <RecordsTable>
          <RecordsHeader>
            <span>{activeTab === 'fantasy' ? 'Records actuales' : 'Posición'}</span>
            <span>Player</span>
            <span>Valor</span>
          </RecordsHeader>
          
          {(activeTab === 'fantasy' ? records : participantsData).map((record, index) => (
            <RecordRow key={index}>
              <RecordType>
                <RecordIcon>
                  {activeTab === 'fantasy' 
                    ? recordIcons[(record as any).type as keyof typeof recordIcons]
                    : (record as any).emoji
                  }
                </RecordIcon>
                {activeTab === 'fantasy' ? (record as any).type : `#${(record as any).position}`}
              </RecordType>
              <RecordPlayer>{record.player}</RecordPlayer>
              <RecordValue>
                {activeTab === 'fantasy' && (
                  <InfoIcon
                    data-tooltip-trigger="true"
                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    ?
                  </InfoIcon>
                )}
                {activeTab === 'fantasy' 
                  ? (record as any).value.toLocaleString() 
                  : (record as any).score.toLocaleString()
                }
              </RecordValue>
            </RecordRow>
          ))}
        </RecordsTable>
      </TableContainer>

      {/* Tooltip Portal - Solo en pestaña Fantasy */}
      {hoveredRecord !== null && activeTab === 'fantasy' && (
        <TooltipPortal 
          record={records[hoveredRecord]} 
          position={tooltipPosition}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        />
      )}
    </>
  );
};
