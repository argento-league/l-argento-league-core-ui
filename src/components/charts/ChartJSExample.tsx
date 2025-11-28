import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
  justify-content: space-between;
  position: relative;
`;

const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 240px;
  overflow: hidden;
  padding-left: 10px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 90px;
  margin-left: -30px;
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
import fantasyMainData from '../../data/season-6/fantasy-main-data.json';
import { CHART_NEON_COLORS } from '../../constants/chart-colors';

type ChartJSExampleProps = {
  phase?: 'fase' | 'evento';
};

export const ChartJSExample: React.FC<ChartJSExampleProps> = ({ phase = 'fase' }) => {
  // Seleccionar el archivo de datos según la fase activa
  const dataSource = phase === 'fase' ? fantasyData : fantasyMainData;
  
  // Usar datos reales del JSON
  const killsData = dataSource.rankings.kills.slice(0, 3).map(item => ({
    player: item.player,
    kills: item.record,
    team: item.team,
    matchId: item.matchId,
    heroImage: item.heroImage
  }));

  // Colores neón como en tu diseño
  const neonColors = CHART_NEON_COLORS;

// Tooltip HTML personalizado con imagen del héroe
const getOrCreateTooltip = (_chart: any) => {
  let tooltipEl = document.querySelector('div.chartjs-tooltip-kills') as HTMLElement | null;

  if (!tooltipEl) {
    tooltipEl = document.createElement('div') as HTMLElement;
    tooltipEl.className = 'chartjs-tooltip-kills';
    tooltipEl.style.background = 'rgba(31, 30, 30, 0.6)';
    tooltipEl.style.borderRadius = '12px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = '0';
    tooltipEl.style.pointerEvents = 'auto';
    tooltipEl.style.position = 'fixed';
    tooltipEl.style.transform = 'translate(0, 0)'; // Salir desde la derecha
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    tooltipEl.style.padding = '12px';
    tooltipEl.style.fontFamily = 'Rethink Sans';
    tooltipEl.style.backdropFilter = 'blur(5px)';
    tooltipEl.style.zIndex = '2147483647';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    document.body.appendChild(tooltipEl);

    // Mantener tooltip visible cuando el mouse está sobre él
    (tooltipEl as any).isMouseOverTooltip = false;
    tooltipEl.addEventListener('mouseenter', () => {
      (tooltipEl as any).isMouseOverTooltip = true;
    });
    tooltipEl.addEventListener('mouseleave', () => {
      (tooltipEl as any).isMouseOverTooltip = false;
      // Ocultar después de un pequeño delay para permitir movimiento del mouse
      setTimeout(() => {
        if (!(tooltipEl as any).isMouseOverTooltip) {
          tooltipEl.style.opacity = '0';
        }
      }, 150);
    });
  }

  return tooltipEl;
};

const externalTooltipHandler = (context: any) => {
  const { tooltip } = context;
  const tooltipEl = getOrCreateTooltip(context.chart) as HTMLElement;

  // Hide all other tooltips when showing a new one
  const allTooltips = document.querySelectorAll('div[class*="chartjs-tooltip"]');
  allTooltips.forEach((el: any) => {
    if (el !== tooltipEl) {
      el.style.opacity = '0';
    }
  });

  // Mantener tooltip visible si el mouse está sobre él
  const isMouseOverTooltip = (tooltipEl as any).isMouseOverTooltip;
  
  // Si el tooltip debe ocultarse pero el mouse está sobre él, mantenerlo visible
  if (tooltip.opacity === 0 && !isMouseOverTooltip) {
    tooltipEl.style.opacity = '0';
    return;
  }
  
  // Si el mouse está sobre el tooltip, mantenerlo visible incluso si Chart.js dice opacity 0
  if (isMouseOverTooltip && tooltip.opacity === 0) {
    return; // Mantener visible
  }

  if (tooltip.body) {
    const dataIndex = tooltip.dataPoints[0].dataIndex;
    const data = killsData[dataIndex];

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
      leftCell.style.width = '60px';
      leftCell.style.background = 'rgba(80, 255, 16, 0.3)';
      leftCell.style.borderRadius = '8px';
      leftCell.style.padding = '8px';

      // Hero icon
      const heroImg = document.createElement('img') as HTMLImageElement;
      heroImg.src = `/images/heroes/${data.heroImage}`;
      heroImg.style.width = '60px';
      heroImg.style.height = '60px';
      heroImg.style.borderRadius = '8px';
      heroImg.style.objectFit = 'cover';
      leftCell.appendChild(heroImg);

      mainRow.appendChild(leftCell);

      // Celda derecha: Player info
      const rightCell = document.createElement('td') as HTMLTableCellElement;
      rightCell.style.verticalAlign = 'top';
      rightCell.style.paddingLeft = '8px';
      rightCell.style.minWidth = '150px';

      // Player Name
      const playerName = document.createElement('div') as HTMLDivElement;
      playerName.style.fontFamily = 'Outfit';
      playerName.style.fontWeight = 'bold';
      playerName.style.fontSize = '14px';
      playerName.style.color = '#ffffff';
      playerName.style.marginBottom = '3px';
      playerName.textContent = data.player;
      rightCell.appendChild(playerName);

      // Stat principal
      const statDiv = document.createElement('div') as HTMLDivElement;
      statDiv.style.fontSize = '16px';
      statDiv.style.color = '#50ff10';
      statDiv.style.fontFamily = 'Outfit';
      statDiv.style.fontWeight = 'bold';
      statDiv.style.marginBottom = '2px';
      statDiv.textContent = `⚔️ ${data.kills} kills`;
      rightCell.appendChild(statDiv);

      // Team name
      const teamDiv = document.createElement('div') as HTMLDivElement;
      teamDiv.style.fontSize = '12px';
      teamDiv.style.color = '#cccccc';
      teamDiv.style.marginBottom = '2px';
      teamDiv.textContent = `🛡️ ${data.team}`;
      rightCell.appendChild(teamDiv);

      // Match ID (clickeable para abrir Dotabuff)
      const matchIdDiv = document.createElement('a') as HTMLAnchorElement;
      matchIdDiv.href = `https://www.dotabuff.com/matches/${data.matchId}`;
      matchIdDiv.target = '_blank';
      matchIdDiv.rel = 'noopener noreferrer';
      matchIdDiv.style.fontSize = '10px';
      matchIdDiv.style.color = '#50ff10';
      matchIdDiv.style.fontFamily = 'Rethink Sans';
      matchIdDiv.style.textDecoration = 'none';
      matchIdDiv.style.cursor = 'pointer';
      matchIdDiv.textContent = `🔗 Match ID: ${data.matchId}`;
      matchIdDiv.addEventListener('mouseenter', () => {
        matchIdDiv.style.textDecoration = 'underline';
        matchIdDiv.style.color = '#70ff30';
      });
      matchIdDiv.addEventListener('mouseleave', () => {
        matchIdDiv.style.textDecoration = 'none';
        matchIdDiv.style.color = '#50ff10';
      });
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

  const data = {
    labels: killsData.map(item => 
      item.player.length > 15 ? item.player.substring(0, 15) + '...' : item.player
    ),
    datasets: [
      {
        label: 'Kills',
        data: killsData.map(item => item.kills),
        backgroundColor: neonColors,
        borderColor: neonColors.map(color => color + 'FF'),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        // Barras más delgadas
        barThickness: 35,
        maxBarThickness: 40,
        // Efectos más marcados - usar rgba con mayor opacidad
        hoverBackgroundColor: neonColors.map(color => color.replace('0.9)', '1)')),
        hoverBorderColor: neonColors.map(color => color + 'FF'),
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Barras horizontales como en tu diseño
    onClick: (_event: any, elements: any) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        const matchId = killsData[dataIndex].matchId;
        window.open(`https://www.dotabuff.com/matches/${matchId}`, '_blank');
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
    },
    scales: {
      x: {
        beginAtZero: false,  // Cambiar a false si quieres que NO comience en 0
        min: 15,             // Cambiar este valor para empezar en otro número
        max: 35,            // Cambiar para modificar el valor máximo
        display: true,
        grid: {
          color: 'rgba(80, 255, 16, 0.1)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#ffffff',
          font: {
            family: 'Outfit',
            size: 12,
          },
          stepSize: 5, // Espaciado uniforme cada 5
          callback: function(value: any) {
            return value % 5 === 0 ? value : ''; // Solo mostrar múltiplos de 5
          }
        },
      },
      y: {
        display: false, // Quitar los nombres del eje Y
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
    elements: {
      bar: {
        borderSkipped: false,
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
  };

  // Listener para scroll
  useEffect(() => {
      const handleScroll = () => {
        // Hide ALL tooltips when scrolling
        const allTooltips = document.querySelectorAll('div[class*="chartjs-tooltip"]');
        allTooltips.forEach((el: any) => {
          el.style.opacity = '0';
        });
      };

    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <ChartCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <ChartTitle>
        <span style={{ fontSize: '20px', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' }}>⚔️</span>
        RANKING DE KILLS
      </ChartTitle>
      <ChartContainer>
        <ChartWrapper>
          <Bar data={data} options={options} />
        </ChartWrapper>
        <LegendContainer>
          {killsData.map((item, index) => (
            <LegendItem key={index}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <LegendDot color={neonColors[index]} />
                <LegendText>{item.player}</LegendText>
              </div>
              <LegendValue color={neonColors[index]}>{item.kills}</LegendValue>
            </LegendItem>
          ))}
        </LegendContainer>
      </ChartContainer>
    </ChartCard>
  );
};