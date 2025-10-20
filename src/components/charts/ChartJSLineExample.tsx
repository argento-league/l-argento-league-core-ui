import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  height: 400px;
  margin-bottom: 48px;
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
  min-height: 300px;
`;

// Importar datos reales
import fantasyData from '../../data/season-6/fantasy-data.json';
import { CHART_NEON_COLORS } from '../../constants/chart-colors';

// Colores neón como en tu diseño
const neonColors = CHART_NEON_COLORS;

// Función para crear tooltip personalizado
const getOrCreateTooltip = (_chart: any) => {
  let tooltipEl = document.querySelector('.chartjs-tooltip-line') as HTMLElement | null;

  if (!tooltipEl) {
    tooltipEl = document.createElement('div') as HTMLElement;
    tooltipEl.className = 'chartjs-tooltip-line';
    tooltipEl.style.background = 'rgba(31, 30, 30, 0.6)';
    tooltipEl.style.borderRadius = '12px';
    tooltipEl.style.padding = '16px';
    tooltipEl.style.backdropFilter = 'blur(5px)';
    tooltipEl.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    tooltipEl.style.color = '#ffffff';
    tooltipEl.style.fontFamily = 'Rethink Sans';
    tooltipEl.style.fontSize = '12px';
    tooltipEl.style.opacity = '0';
    tooltipEl.style.position = 'fixed';
    tooltipEl.style.pointerEvents = 'auto';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.zIndex = '99999';
    tooltipEl.style.width = '300px';

    const table = document.createElement('table');
    table.style.margin = '0px';
    tooltipEl.appendChild(table);
    document.body.appendChild(tooltipEl);

    // No timer needed - tooltip stays visible until another is shown or scroll
  }

  return tooltipEl;
};

// Handler para tooltip externo
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

  // NO ocultar el tooltip cuando opacity es 0, mantenerlo visible
  if (tooltip.opacity === 0) {
    return; // Mantener el tooltip visible
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  const canvasRect = context.chart.canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = '1';
  tooltipEl.style.left = canvasRect.left + tooltip.caretX + 'px';
  tooltipEl.style.top = (canvasRect.top + tooltip.caretY - 20) + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  tooltipEl.style.pointerEvents = 'auto';

  // Set Text
  if (tooltip.body) {
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

      // Obtener datos del player
      const datasetIndex = tooltip.dataPoints[0].datasetIndex;
      const player = fantasyData.rankings.netWorth.players[datasetIndex];
      const netWorthValue = Math.round(tooltip.dataPoints[0].parsed.y);

      // Hero icon
      const heroImg = document.createElement('img') as HTMLImageElement;
      heroImg.src = `/images/heroes/${player.heroImage}`;
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
      const playerName = document.createElement('div');
      playerName.style.fontFamily = 'Outfit';
      playerName.style.fontWeight = 'bold';
      playerName.style.fontSize = '14px';
      playerName.style.color = '#ffffff';
      playerName.style.marginBottom = '3px';
      playerName.textContent = player.name;
      rightCell.appendChild(playerName);

      // Stat principal
      const statDiv = document.createElement('div') as HTMLDivElement;
      statDiv.style.fontSize = '16px';
      statDiv.style.color = '#50ff10';
      statDiv.style.fontFamily = 'Outfit';
      statDiv.style.fontWeight = 'bold';
      statDiv.style.marginBottom = '2px';
      statDiv.textContent = `💵 ${netWorthValue.toLocaleString()} gold`;
      rightCell.appendChild(statDiv);

      // Team name
      const teamDiv = document.createElement('div');
      teamDiv.style.fontSize = '12px';
      teamDiv.style.color = '#cccccc';
      teamDiv.style.marginBottom = '2px';
      teamDiv.textContent = `🛡️ ${player.team}`;
      rightCell.appendChild(teamDiv);

      // Match ID (clickeable para abrir Dotabuff)
      const matchIdDiv = document.createElement('a') as HTMLAnchorElement;
      matchIdDiv.href = `https://www.dotabuff.com/matches/${player.matchId}`;
      matchIdDiv.target = '_blank';
      matchIdDiv.rel = 'noopener noreferrer';
      matchIdDiv.style.fontSize = '10px';
      matchIdDiv.style.color = '#50ff10';
      matchIdDiv.style.fontFamily = 'Rethink Sans';
      matchIdDiv.style.textDecoration = 'none';
      matchIdDiv.style.cursor = 'pointer';
      matchIdDiv.textContent = `🔗 Match ID: ${player.matchId}`;
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
};


export const ChartJSLineExample: React.FC = () => {
  // Usar datos reales del JSON con la nueva estructura
  const netWorthData = fantasyData.rankings.netWorth;
  const timePoints = netWorthData?.timePoints || [];
  const players = netWorthData?.players || [];
  
  
  // Preparar labels de tiempo
  const labels = timePoints.map(point => point.time);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: players[0]?.name || 'Player 1',
        data: players[0]?.netWorth || [],
        borderColor: neonColors[0],
        backgroundColor: neonColors[0] + '20',
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: neonColors[0],
        pointBorderColor: neonColors[0],
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: players[1]?.name || 'Player 2',
        data: players[1]?.netWorth || [],
        borderColor: neonColors[1],
        backgroundColor: neonColors[1] + '20',
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: neonColors[1],
        pointBorderColor: neonColors[1],
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: players[2]?.name || 'Player 3',
        data: players[2]?.netWorth || [],
        borderColor: neonColors[2],
        backgroundColor: neonColors[2] + '20',
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: neonColors[2],
        pointBorderColor: neonColors[2],
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (_event: any, elements: any) => {
      if (elements.length > 0) {
        const datasetIndex = elements[0].datasetIndex;
        const matchId = netWorthData.players[datasetIndex].matchId;
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
        grid: {
          color: 'rgba(80, 255, 16, 0.2)',
          lineWidth: 1,
        },
        ticks: {
          color: '#ffffff',
          font: {
            family: 'Rethink Sans',
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,     // No comenzar en 0
        min: 0,             // Valor mínimo para el Net Worth (ajusta según tus datos)
        max: 50000,             // Valor máximo para el Net Worth (ajusta según tus datos)
        grid: {
          color: 'rgba(80, 255, 16, 0.2)',
          lineWidth: 1,
        },
        ticks: {
          color: '#ffffff',
          font: {
            family: 'Rethink Sans',
            size: 12,
          },
          stepSize: 5000,       // Mostrar cada 5000 de gold
          callback: function(value: any) {
            return (value / 1000).toFixed(0) + 'k'; // Mostrar como "10k", "15k", etc
          }
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
  };

  // Listener para scroll y click fuera
  useEffect(() => {
    const handleScroll = () => {
      // Hide ALL tooltips when scrolling
      const allTooltips = document.querySelectorAll('div[class*="chartjs-tooltip"]');
      allTooltips.forEach((el: any) => {
        el.style.opacity = '0';
      });
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Hide ALL tooltips when clicking outside
      const allTooltips = document.querySelectorAll('div[class*="chartjs-tooltip"]');
      const clickedOnTooltip = Array.from(allTooltips).some(el => el.contains(event.target as Node));
      
      if (!clickedOnTooltip) {
        allTooltips.forEach((el: any) => {
          el.style.opacity = '0';
        });
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <ChartCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <ChartTitle>
        <span style={{ fontSize: '20px', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' }}>💵</span>
        VALOR NETO
      </ChartTitle>
      <ChartContainer>
        <Line data={chartData} options={options} />
      </ChartContainer>
    </ChartCard>
  );
};
