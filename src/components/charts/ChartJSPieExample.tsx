import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
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
  min-height: 250px;
  overflow: hidden;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 90px;
  margin-left: -70px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 2px 0;
  flex-direction: column;
  text-align: left;
  gap: 2px;
`;

const LegendDot = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 4px ${props => props.color}80;
`;

const LegendText = styled.span`
  color: #ffffff;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
`;

const LegendValue = styled.span<{ color: string }>`
  color: ${props => props.color};
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  margin-left: 12px;
`;

// Importar datos reales
import fantasyData from '../../data/season-6/fantasy-data.json';

// Colores neón como en tu diseño
const neonColors = ['#50ff10', '#ff6b35', '#4ecdc4'];

// Tooltip HTML personalizado con imagen del héroe
const getOrCreateTooltip = (_chart: any) => {
  let tooltipEl = document.querySelector('div.chartjs-tooltip-pie') as HTMLElement | null;

  if (!tooltipEl) {
    tooltipEl = document.createElement('div') as HTMLElement;
    tooltipEl.className = 'chartjs-tooltip-pie';
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.95)';
    tooltipEl.style.borderRadius = '12px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = '0';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'fixed';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.border = '2px solid rgba(80, 255, 16, 0.5)';
    tooltipEl.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(80, 255, 16, 0.3)';
    tooltipEl.style.padding = '12px';
    tooltipEl.style.fontFamily = 'Rethink Sans';
    tooltipEl.style.backdropFilter = 'blur(10px)';
    tooltipEl.style.zIndex = '99999';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    document.body.appendChild(tooltipEl);
  }

  return tooltipEl;
};

interface ChartJSPieExampleProps {
  title: string;
  dataKey: 'lastHits' | 'gpm';
  delay: number;
  icon?: string;
  iconFilter?: string;
}

export const ChartJSPieExample: React.FC<ChartJSPieExampleProps> = ({ title, dataKey, delay, icon, iconFilter }) => {
  const data = fantasyData.rankings[dataKey].slice(0, 3);
  
const externalTooltipHandler = (context: any) => {
  const { tooltip } = context;
  const tooltipEl = getOrCreateTooltip(context.chart) as HTMLElement;

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    if (tooltip.body) {
      const dataIndex = tooltip.dataPoints[0].dataIndex;
      const itemData = data[dataIndex];

      const tableRoot = tooltipEl.querySelector('table') as HTMLTableElement;
      if (tableRoot) {
        tableRoot.innerHTML = '';

        // Fila principal con hero icon + stat a la izquierda y player info a la derecha
        const mainRow = document.createElement('tr');
        
        // Celda izquierda: Hero icon + stat principal
        const leftCell = document.createElement('td') as HTMLTableCellElement;
        leftCell.style.verticalAlign = 'top';
        leftCell.style.paddingRight = '10px';
        leftCell.style.textAlign = 'center';
        leftCell.style.width = '80px';

        // Hero icon
        const heroImg = document.createElement('img') as HTMLImageElement;
        heroImg.src = `/images/heroes/${itemData.heroImage}`;
        heroImg.style.width = '55px';
        heroImg.style.height = '55px';
        heroImg.style.borderRadius = '8px';
        heroImg.style.border = `2px solid ${neonColors[dataIndex]}`;
        heroImg.style.boxShadow = `0 0 15px ${neonColors[dataIndex]}80`;
        heroImg.style.marginBottom = '8px';
        leftCell.appendChild(heroImg);

        // Stat principal
        const statLabel = dataKey === 'lastHits' ? 'Last Hits' : 'GPM';
        const statDiv = document.createElement('div') as HTMLDivElement;
        statDiv.style.fontSize = '16px';
        statDiv.style.color = '#ffffff';
        statDiv.style.fontFamily = 'Outfit';
        statDiv.style.fontWeight = 'bold';
        statDiv.style.lineHeight = '1.2';
        statDiv.innerHTML = `${dataKey === 'lastHits' ? '💎' : '💰'} ${itemData.record}<br/>${statLabel}`;
        leftCell.appendChild(statDiv);

        mainRow.appendChild(leftCell);

        // Celda derecha: Player info
        const rightCell = document.createElement('td') as HTMLTableCellElement;
        rightCell.style.verticalAlign = 'top';
        rightCell.style.paddingLeft = '8px';
        rightCell.style.minWidth = '150px';

        // Player Name
        const playerName = document.createElement('div');
        playerName.style.fontFamily = 'Outfit';
        playerName.style.fontWeight = 'bold';
        playerName.style.fontSize = '14px';
        playerName.style.color = '#ffffff';
        playerName.style.marginBottom = '6px';
        playerName.textContent = itemData.player;
        rightCell.appendChild(playerName);

        // Team name
        const teamDiv = document.createElement('div');
        teamDiv.style.fontSize = '12px';
        teamDiv.style.color = '#cccccc';
        teamDiv.style.marginBottom = '4px';
        teamDiv.textContent = `🛡️ ${itemData.team}`;
        rightCell.appendChild(teamDiv);

        // Date
        const dateDiv = document.createElement('div');
        dateDiv.style.fontSize = '12px';
        dateDiv.style.color = '#cccccc';
        dateDiv.style.marginBottom = '4px';
        dateDiv.textContent = `📅 2/10/25`;
        rightCell.appendChild(dateDiv);

        // Match ID
        const matchIdDiv = document.createElement('div');
        matchIdDiv.style.fontSize = '10px';
        matchIdDiv.style.color = '#888888';
        matchIdDiv.style.fontFamily = 'Rethink Sans';
        matchIdDiv.textContent = `Match ID: ${itemData.matchId}`;
        rightCell.appendChild(matchIdDiv);

        mainRow.appendChild(rightCell);
        tableRoot.appendChild(mainRow);
      }
    }

    const canvasRect = context.chart.canvas.getBoundingClientRect();

  tooltipEl.style.opacity = '1';
  tooltipEl.style.left = canvasRect.left + tooltip.caretX + 'px';
  tooltipEl.style.top = canvasRect.top + tooltip.caretY + 'px';
  };
  
  const chartData = {
    labels: data.map(item => 
      item.player.length > 15 ? item.player.substring(0, 15) + '...' : item.player
    ),
    datasets: [
      {
        label: dataKey,
        data: data.map(item => item.record),
        backgroundColor: neonColors,
        borderColor: neonColors.map(color => color + 'FF'),
        borderWidth: 2,
        borderRadius: 3, // Puntas redondeadas
        spacing: 6, // Espacio entre segmentos
        dataKey: dataKey,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    cutout: '80%', // Menos agujero = círculo más grande
  };

  return (
    <ChartCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <ChartTitle>
        {icon && (
          <span 
            style={{ 
              fontSize: '20px', 
              filter: iconFilter || 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' 
            }} 
          >
            {icon}
          </span>
        )}
        {title}
      </ChartTitle>
      <ChartContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Pie data={chartData} options={options} />
          </div>
          <LegendContainer>
            {data.map((item, index) => (
              <LegendItem key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <LegendDot color={neonColors[index]} />
                  <LegendText>{item.player}</LegendText>
                </div>
                <LegendValue color={neonColors[index]}>{item.record}</LegendValue>
              </LegendItem>
            ))}
          </LegendContainer>
        </div>
      </ChartContainer>
    </ChartCard>
  );
};
