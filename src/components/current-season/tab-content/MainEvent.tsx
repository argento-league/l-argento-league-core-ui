import { useEffect, useState } from "react";
import { SEASON6_TOURNAMENT_DATA } from "../../../data/brackets/season6-tournamentData";
import { TOURNAMENT_DATA } from "../../../data/brackets/tournamentData";
import season6EventoPrincipal from "../../../data/season-6/evento-principal.json";
import season6Teams from "../../../data/season-6/teams.json";

// Add this declaration to extend the Window interface
declare global {
  interface Window {
    bracketsViewer: any;
  }
}

// Helper function to find team data with multiple fallbacks (same logic as GroupStage)
const findTeamData = (teamName: string, teams: any[]) => {
  // Specific mappings for known mismatches
  const nameMapping: { [key: string]: string } = {
    "Racxon Disciples": "RACXONDICIPLES",
    "Efecto Divine": "3fecto Divine",
    "Escuadron Anti Tonkas": "Escuadrón Anti-Tonkas",
    "Por La Gorda": "PorLaGorda",
    "Miro Tik Tok y Webeo": "Miro TikTok y Webeo",
  };

  // Check if there's a specific mapping
  const mappedName = nameMapping[teamName];
  if (mappedName) {
    const match = teams.find((team: any) => team.name === mappedName);
    if (match) return match;
  }

  // First try exact match
  let match = teams.find((team: any) => team.name === teamName);
  if (match) return match;

  // Try case-insensitive match
  match = teams.find((team: any) => team.name.toLowerCase() === teamName.toLowerCase());
  if (match) return match;

  // Try partial match (contains)
  match = teams.find((team: any) => 
    team.name.toLowerCase().includes(teamName.toLowerCase()) ||
    teamName.toLowerCase().includes(team.name.toLowerCase())
  );
  if (match) return match;

  // Try removing common words and matching
  const cleanName = (name: string) => name.toLowerCase()
    .replace(/team|gaming|esports|e-sports|squad|clan/g, '')
    .trim();
  
  match = teams.find((team: any) => cleanName(team.name) === cleanName(teamName));
  if (match) return match;

  return null;
};

// Helper function to get team logo for different seasons
const getTeamLogo = (teamName: string, season: number): string | null => {
  console.log('getTeamLogo called with:', teamName, 'season:', season);
  
  if (season === 5) {
    const season5Logos: { [key: string]: string } = {
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
    return season5Logos[teamName] || null;
  }
  
  // For Season 6, use findTeamData with multiple fallbacks
  if (teamName === "TBD") return null;
  
  const allTeams = Object.values(season6Teams);
  console.log('Looking for team:', teamName, 'in season6Teams');
  console.log('Available teams:', allTeams.map((t: any) => t.name));
  
  const teamEntry = findTeamData(teamName, allTeams);
  console.log('Found team entry:', teamEntry);
  
  if (teamEntry) {
    const logoPath = `/images/teams/season-${season}/${teamEntry.logo}`;
    console.log('Returning logo path:', logoPath);
    return logoPath;
  }
  
  console.log('No logo found for:', teamName);
  return null;
};


type MainEventProps = {
  season?: number;
};

// Función para convertir JSON simple a formato de brackets
const convertEventoPrincipalToBrackets = (eventoData: any) => {
  const participants: any[] = [];
  const matches: any[] = [];
  
  let participantId = 0;
  let matchId = 0;
  
  // Crear participantes únicos (solo si no es TBD)
  const teamNames = new Set();
  const allRounds = [
    ...Object.values(eventoData['upper-bracket']),
    ...Object.values(eventoData['lower-bracket']),
    ...eventoData['grand-final']
  ];
  
  allRounds.forEach(round => {
    if (Array.isArray(round)) {
      round.forEach(match => {
        if (match.team1 && match.team1 !== 'TBD') teamNames.add(match.team1);
        if (match.team2 && match.team2 !== 'TBD') teamNames.add(match.team2);
      });
    }
  });
  
  const teamMap = new Map();
  Array.from(teamNames).forEach(teamName => {
    teamMap.set(teamName, participantId);
    participants.push({
      id: participantId++,
      tournament_id: 6,
      name: teamName
    });
  });
  
  // Agregar un participante "TBD"
  const TBD_ID = participantId++;
  participants.push({
    id: TBD_ID,
    tournament_id: 6,
    name: 'TBD'
  });
  
  // Crear matches del upper bracket
  Object.values(eventoData['upper-bracket']).forEach((round, roundIndex) => {
    if (Array.isArray(round)) {
      round.forEach(match => {
        // Status: 0 = pending, 2 = finished (siempre pending si no hay scores)
        const status = match.score1 !== null && match.score2 !== null ? 2 : 0;
        
        matches.push({
          id: matchId++,
          number: match.match,
          stage_id: 0,
          group_id: 0,
          round_id: roundIndex,
          child_count: 0,
          status: status,
          opponent1: {
            id: match.team1 === 'TBD' ? TBD_ID : (teamMap.get(match.team1) ?? null),
            result: match.score1 !== null && match.score2 !== null ? (match.score1 > match.score2 ? 'win' : 'loss') : null,
          },
          opponent2: {
            id: match.team2 === 'TBD' ? TBD_ID : (teamMap.get(match.team2) ?? null),
            result: match.score1 !== null && match.score2 !== null ? (match.score2 > match.score1 ? 'win' : 'loss') : null,
          }
        });
      });
    }
  });
  
  // Crear matches del lower bracket
  // Upper has 4 rounds (0, 1, 2, 3), Lower has 6 rounds (0-5)
  // Lower rounds start after Upper rounds to align properly
  Object.values(eventoData['lower-bracket']).forEach((round, roundIndex) => {
    if (Array.isArray(round)) {
      round.forEach(match => {
        // Status: 0 = pending, 2 = finished (siempre pending si no hay scores)
        const status = match.score1 !== null && match.score2 !== null ? 2 : 0;
        
        // Lower bracket rounds start after Upper (0, 1, 2, 3) so they start at 4
        const lowerRoundId = roundIndex + 4;
        
        matches.push({
          id: matchId++,
          number: match.match,
          stage_id: 0,
          group_id: 1,
          round_id: lowerRoundId,
          child_count: 0,
          status: status,
          opponent1: {
            id: match.team1 === 'TBD' ? TBD_ID : (teamMap.get(match.team1) ?? null),
            result: match.score1 !== null && match.score2 !== null ? (match.score1 > match.score2 ? 'win' : 'loss') : null,
          },
          opponent2: {
            id: match.team2 === 'TBD' ? TBD_ID : (teamMap.get(match.team2) ?? null),
            result: match.score1 !== null && match.score2 !== null ? (match.score2 > match.score1 ? 'win' : 'loss') : null,
          }
        });
      });
    }
  });
  
  // Crear matches del grand final
  if (Array.isArray(eventoData['grand-final'])) {
    eventoData['grand-final'].forEach(match => {
      // Status: 0 = pending, 2 = finished (siempre pending si no hay scores)
      const status = match.score1 !== null && match.score2 !== null ? 2 : 0;
      
      matches.push({
        id: matchId++,
        number: match.match,
        stage_id: 0,
        group_id: 2,
        round_id: 10, // Grand final after both brackets
        child_count: 0,
        status: status,
        opponent1: {
          id: match.team1 === 'TBD' ? TBD_ID : (teamMap.get(match.team1) ?? null),
          result: match.score1 !== null && match.score2 !== null ? (match.score1 > match.score2 ? 'win' : 'loss') : null,
        },
        opponent2: {
          id: match.team2 === 'TBD' ? TBD_ID : (teamMap.get(match.team2) ?? null),
          result: match.score1 !== null && match.score2 !== null ? (match.score2 > match.score1 ? 'win' : 'loss') : null,
        }
      });
    });
  }
  
  return {
    participant: participants,
    stage: SEASON6_TOURNAMENT_DATA.stage,
    group: SEASON6_TOURNAMENT_DATA.group,
    round: SEASON6_TOURNAMENT_DATA.round,
    match: matches,
    match_game: []
  };
};

const MainEvent = ({ season = 6 }: MainEventProps) => {
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
  
  /* Only style the round titles, not the bracket titles */
  .round-title,
  .round h3,
  .round h2 {
    font-size: 14px !important;
    font-weight: 600 !important;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%) !important;
    color: white !important;
    padding: 8px 16px !important;
    border-radius: 8px !important;
    border: 1px solid #50ff10 !important;
    box-shadow: 0 4px 8px rgba(80, 255, 16, 0.2) !important;
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
  
  /* Make all text white by default */
  .participant,
  .participant .name,
  .participant * {
    color: white !important;
  }
  
  /* On hover, text should be black if background turns white */
  .participant:hover,
  .participant:hover .name,
  .participant:hover * {
    color: #000 !important;
  }
  
  /* But on hover, keep the green winner score green (not black) */
  .participant:hover .result[style*="50ff10"] {
    color: #50ff10 !important;
  }
  
  /* Winner score should be green */
  .participant .result {
    color: white !important;
  }
  
  /* If participant is a winner, make the result score green */
  .participant[style*="background"]:not([style*="transparent"]) .result {
    color: #50ff10 !important;
  }
  
  /* Alternative: make the score green if the parent has result "win" */
  .participant:has(.result[class*="win"]) .result,
  .participant.winner .result {
    color: #50ff10 !important;
  }
  
    /* Remove white background from match boxes to make them transparent */
  .match {
    background: transparent !important;
  }
  
  .match-wrapper {
    background: transparent !important;
  }
  
  .opponents {
    background: transparent !important;
  }
  
  .participant {
    background: transparent !important;
  }
  

  
  /* Let the library handle connector lines naturally */
  
  /* Hide connector lines for Grand Final */
  .round[data-round-number="0"].bracket[data-bracket-type="double_elimination"] svg.connector,
  .round:has(h3:contains("Gran Final")) svg.connector,
  .round:has(h2:contains("Gran Final")) svg.connector {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  
  /* More specific selector for Grand Final matches */
  .bracket.final svg.connector,
  .match:has(.participant:last-child) svg.connector,
  .round-title:has-text("Gran Final") ~ .match svg.connector {
    display: none !important;
  }
  
`;
    document.head.appendChild(style);
    
    // Select data based on season
    let tournamentData;
    if (season === 5) {
      tournamentData = TOURNAMENT_DATA;
    } else {
      // Para Season 6, usar el JSON simple
      tournamentData = convertEventoPrincipalToBrackets(season6EventoPrincipal);
    }
    
    window.bracketsViewer.render(
      {
        stages: tournamentData.stage,
        matches: tournamentData.match,
        matchGames: tournamentData.match_game,
        participants: tournamentData.participant,
      },
      {
        participantOriginPlacement: "none",
        showRankingTable: false,
        // @ts-ignore
        customRoundName: (info) => {
          // Season 5 titles
          if (season === 5) {
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
            }
          }
          
                     // Season 6+ titles
           // IMPORTANT: Lower bracket should NOT show "Gran Final" - only the separate grand final stage does
           if (info.finalType === "grand_final") {
             return "Gran Final";
           }
                       if (info.groupType === "winner-bracket") {
              if (info.fractionOfFinal === 1 / 8 || info.roundNumber === 1) {
                return "Primera Ronda";
              }
              if (info.fractionOfFinal === 1 / 4 || info.roundNumber === 2) {
                return "Segunda Ronda";
              }
              if (info.fractionOfFinal === 1 / 2 || info.roundNumber === 3) {
                return "Tercera Ronda";
              }
              // Upper Final is the last round of Upper Bracket
              if (info.fractionOfFinal === 1) {
                return "Gran Final";
              }
            }
            if (info.groupType === "loser-bracket") {
              // Lower bracket rounds
              if (info.roundNumber === 1) return "Primera Ronda";
              if (info.roundNumber === 2) return "Segunda Ronda";
              if (info.roundNumber === 3) return "Tercera Ronda";
              if (info.roundNumber === 4) return "Cuarta Ronda";
              if (info.roundNumber === 5) return "Quinta Ronda";
              if (info.roundNumber === 6) return "Sexta Ronda";
            }
          
          return "Gran Final";
        },
      }
    );
    
    // Wait a bit for the brackets to fully render before adding logos and scores
    setTimeout(() => {
      const participants = document.querySelectorAll(".participant .name");
      console.log('Found participants:', participants.length);
      
      participants.forEach((el) => {
        // @ts-ignore idc
        el.textContent = el.textContent.replace(/Loser of WB.{0,3}/, "").trim();
        
        // Add team logo only if it doesn't already have one
        if (!el.querySelector('img')) {
          const teamName = el.textContent?.trim();
          if (teamName) {
            const logo = getTeamLogo(teamName, season);
            console.log(`Team: ${teamName}, Logo: ${logo}`);
            if (logo) {
              const logoImg = document.createElement("img");
              logoImg.src = logo;
              logoImg.className = "team-logo";
              logoImg.alt = teamName;
              el.insertBefore(logoImg, el.firstChild);
            }
          }
        }
      });
      
      // Replace W/L with actual scores
      const scoreElements = document.querySelectorAll(".participant .result");
      scoreElements.forEach((el) => {
        const scoreEl = el as HTMLElement;
        const parent = el.closest(".participant");
        if (parent) {
          const participantName = parent.querySelector(".name")?.textContent?.trim();
          if (participantName && participantName !== "TBD") {
            // Find the match data for this team
            const matchElement = parent.closest(".match");
            if (matchElement) {
              const allParticipants = matchElement.querySelectorAll(".participant");
              if (allParticipants.length === 2) {
                const team1El = allParticipants[0].querySelector(".name");
                const team2El = allParticipants[1].querySelector(".name");
                if (team1El && team2El) {
                  const team1Name = team1El.textContent?.trim().replace(/^.*?img.*?>(.*)$/, '$1').trim();
                  const team2Name = team2El.textContent?.trim().replace(/^.*?img.*?>(.*)$/, '$1').trim();
                  
                  // Find match in event data
                  const allRounds = [
                    ...Object.values(season6EventoPrincipal['upper-bracket']),
                    ...Object.values(season6EventoPrincipal['lower-bracket']),
                    ...season6EventoPrincipal['grand-final']
                  ];
                  
                  for (const round of allRounds) {
                    if (Array.isArray(round)) {
                      for (const match of round) {
                        if (
                          (match.team1 === team1Name && match.team2 === team2Name) ||
                          (match.team1 === team2Name && match.team2 === team1Name)
                        ) {
                          if (match.score1 !== null && match.score2 !== null) {
                            const isTeam1 = team1Name === participantName;
                            const score = isTeam1 ? match.score1 : match.score2;
                            const isWinner = isTeam1 ? match.score1 > match.score2 : match.score2 > match.score1;
                            scoreEl.textContent = score !== null ? String(score) : '';
                            
                            // If this participant won, add green color to the score
                            if (isWinner) {
                              scoreEl.style.color = '#50ff10';
                            }
                          }
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      
      setLoaded(true);
    }, 100);
    
    // Cleanup function
    return () => {
      const existingViewer = document.querySelector('.brackets-viewer');
      if (existingViewer) {
        existingViewer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      className="brackets-viewer" 
      style={{ 
        backgroundImage: "url('/bracketsSectionBackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        minHeight: "100vh"
      }}
    ></div>
  );
};

export default MainEvent;
