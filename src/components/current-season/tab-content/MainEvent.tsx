import { useEffect, useState } from "react";
import { TOURNAMENT_DATA } from "../../../data/brackets/tournamentData";

// Add this declaration to extend the Window interface
declare global {
  interface Window {
    bracketsViewer: any;
  }
}

// Helper function to get team logo
const getTeamLogo = (teamName: string): string | null => {
  const teamLogos: { [key: string]: string } = {
    "E. Anti-tonkas": "/images/teams/season-5/escuadron-anti-tonkas.png",
    "Sudamerica V": "/images/teams/season-5/sudamerica.png",
    "Sudamerica": "/images/teams/season-5/sudamerica.png",
    "La Manada": "/images/teams/season-5/la-manada.png",
    "Hydra": "/images/teams/season-5/hydra-reborn.png",
    "Nymeria": "/images/teams/season-5/nymeria.png",
    "The Tether": "/images/teams/season-5/the-tether.png",
    "Circo Jujeño": "/images/teams/season-5/circo-jujeno.png",
    "Epicenter": "/images/teams/season-5/epicenter.png",
    "Obesho + 4": "/images/teams/season-5/obesho.png",
    "Miro Tik Tok": "/images/teams/season-5/miro-tiktok.png",
    "Fantasmas": "/images/teams/season-5/fantasmas.png",
    "Pure Team": "/images/teams/season-5/pure-team.png",
    "Gordo Squad": "/images/teams/season-5/gordo-squad.png",
    "Racson Disciples": "/images/teams/season-5/racson-disciples.png",
    "Guerreros Z": "/images/teams/season-5/guerreros-z.png",
    "3Fecto Divine": "/images/teams/season-5/3fecto-divine.png",
    "Dream": "/images/teams/season-5/dream-team.png",
    "Team Server": "/images/teams/season-5/team-server.png",
    "The Rats": "/images/teams/season-5/the-rats.png",
    "Reyes de las Olas": "/images/teams/season-5/olas.png",
    "Elite Wolves": "/images/teams/season-5/elite-wolves.png",
    "Dragon Wings": "/images/teams/season-5/dragon-wings.png",
  };
  
  return teamLogos[teamName] || null;
};


const MainEvent = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (loaded) return;
    
    // Clear any existing brackets-viewer content
    const existingViewer = document.querySelector('.brackets-viewer');
    if (existingViewer) {
      existingViewer.innerHTML = '';
    }
    
    // Remove any existing styles to avoid duplicates
    const existingStyle = document.querySelector('#brackets-viewer-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const style = document.createElement("style");
    style.id = 'brackets-viewer-styles';
    style.textContent = `
  /* Custom styles for better UI */
  .brackets-viewer {
    width: 100% !important;
    max-width: 1400px !important;
    margin: 0 auto !important;
  }
  
  .bracket {
    width: 100% !important;
  }
  
  .match {
    min-width: 200px !important;
    width: auto !important;
  }
  
  .participant {
    min-width: 180px !important;
    width: auto !important;
  }
  
  .participant .name {
    white-space: nowrap !important;
    overflow: visible !important;
    text-overflow: unset !important;
    max-width: none !important;
  }
  
  .opponents {
    min-width: 200px !important;
    width: auto !important;
  }
  
  .round {
    min-width: 220px !important;
  }
  
  .round-title {
    font-size: 14px !important;
    font-weight: 600 !important;
  }
  
  /* Add team logos to participants */
  .participant .name {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 2px 4px !important;
  }
  
  .team-logo {
    width: 20px !important;
    height: 20px !important;
    object-fit: contain !important;
    flex-shrink: 0 !important;
  }
  
  /* Let the library handle connector lines naturally */
  
`;
    document.head.appendChild(style);
    
    window.bracketsViewer.render(
      {
        stages: TOURNAMENT_DATA.stage,
        matches: TOURNAMENT_DATA.match,
        matchGames: TOURNAMENT_DATA.match_game,
        participants: TOURNAMENT_DATA.participant,
      },
      {
        participantOriginPlacement: "none",
        showRankingTable: false,
        // @ts-ignore
        customRoundName: (info) => {
          if (info.finalType === "grand_final") {
            return "Gran Final";
          }
          if (
            info.fractionOfFinal === 1 / 8 &&
            info.groupType === "winner-bracket"
          ) {
            return "Octavos";
          }
          if (
            info.fractionOfFinal === 1 / 4 &&
            info.groupType === "winner-bracket"
          ) {
            return "Cuartos";
          }
          if (info.fractionOfFinal === 1 / 2) {
            if (info.groupType === "winner-bracket") {
              return "Semi Final";
            } else if (info.groupType === "loser-bracket") {
              return "Lower Semi Final";
            }
          }
          if (info.fractionOfFinal === 1) {
            if (info.groupType === "winner-bracket") {
              return "Upper Final";
            } else if (info.groupType === "loser-bracket") {
              return "Lower Final";
            }
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 1) {
            return "Ronda 1";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 2) {
            return "Ronda 2";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 3) {
            return "Ronda 3";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 4) {
            return "Ronda 4";
          }
          if (info.groupType === "loser-bracket" && info.roundNumber === 5) {
            return "Ronda 5";
          } else {
            return "Gran Final";
          }
        },
      }
    );
    
    document.querySelectorAll(".participant .name").forEach((el) => {
      // @ts-ignore idc
      el.textContent = el.textContent.replace(/Loser of WB.{0,3}/, "").trim();
      
      // Add team logo
      const teamName = el.textContent?.trim();
      if (teamName) {
        const logo = getTeamLogo(teamName);
        if (logo) {
          const logoImg = document.createElement("img");
          logoImg.src = logo;
          logoImg.className = "team-logo";
          logoImg.alt = teamName;
          el.insertBefore(logoImg, el.firstChild);
        }
      }
    });
    
    setLoaded(true);
    
    // Cleanup function
    return () => {
      const existingViewer = document.querySelector('.brackets-viewer');
      if (existingViewer) {
        existingViewer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="brackets-viewer" style={{ background: "black" }}></div>
  );
};

export default MainEvent;
