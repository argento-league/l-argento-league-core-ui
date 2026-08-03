import styled from "styled-components";
import { GroupTeam, GroupData } from "../../../types/teams";
import season5Teams from "../../../data/season-5/teams.json";
import season5Jornadas from "../../../data/season-5/jornadas.json";
import { getSeasonTeams, getSeasonJornadas, type SeasonNumber } from "../../../data/season-data";
import { ReactNode } from "react";
import { StyledSvg } from "@components/common/StyledSVG";
import arrowUp from "@assets/common/icons/arrow-up.svg";
import arrowDown from "@assets/common/icons/arrow-down.svg";
import close from "@assets/common/icons/close.svg";
import { MatchScheduleContent } from "./MatchSchedule";
import { useIsMobile } from "@hooks/useIsMobile";

interface MatchResult {
  team1: string;
  score1: string | null;
  team2: string;
  score2: string | null;
}

interface GroupMatches {
  "grupo-a"?: MatchResult[];
  "grupo-b"?: MatchResult[];
  "grupo-c"?: MatchResult[];
  "grupo-d"?: MatchResult[];
  [key: string]: MatchResult[] | undefined;
}

interface JornadasData {
  [key: string]: GroupMatches;
}

const GROUP_KEY_ORDER = ["grupo-a", "grupo-b", "grupo-c", "grupo-d"] as const;
const GROUP_KEY_TO_NAME: Record<string, string> = {
  "grupo-a": "Grupo A",
  "grupo-b": "Grupo B",
  "grupo-c": "Grupo C",
  "grupo-d": "Grupo D",
};

// Helper function to find matching team data with specific mappings
const findTeamData = (teamName: string, teams: any[]) => {
  // Specific mappings for known mismatches
  const nameMapping: { [key: string]: string } = {
    "Racxon Disciples": "RACXONDICIPLES",
    "Efecto Divine": "3fecto Divine",
    "Escuadron Anti Tonkas": "Escuadrón Anti-Tonkas",
    "Por La Gorda": "PorLaGorda",
    "Miro Tik Tok y Webeo": "Miro TikTok y Webeo", // Map normalized name to teams.json name
  };

  // Check if there's a specific mapping
  const mappedName = nameMapping[teamName];
  if (mappedName) {
    const match = teams.find(team => team.name === mappedName);
    if (match) return match;
  }

  // First try exact match
  let match = teams.find(team => team.name === teamName);
  if (match) return match;

  // Try case-insensitive match
  match = teams.find(team => team.name.toLowerCase() === teamName.toLowerCase());
  if (match) return match;

  // Try partial match (contains)
  match = teams.find(team => 
    team.name.toLowerCase().includes(teamName.toLowerCase()) ||
    teamName.toLowerCase().includes(team.name.toLowerCase())
  );
  if (match) return match;

  // Try removing common words and matching
  const cleanName = (name: string) => name.toLowerCase()
    .replace(/team|gaming|esports|e-sports|squad|clan/g, '')
    .trim();
  
  match = teams.find(team => cleanName(team.name) === cleanName(teamName));
  if (match) return match;

  return null;
};

// Helper function to normalize team names for deduplication
const normalizeTeamName = (teamName: string): string => {
  // Handle specific known variations
  if (teamName === "Miro TikTok y Webeo" || teamName === "Miro Tik Tok y Webeo") {
    return "Miro Tik Tok y Webeo";
  }
  
  return teamName;
};

const createGroupData = (teamsData: any, jornadasData: any): GroupData => {
  const teams = Object.values(teamsData);
  const jornadas = jornadasData as JornadasData;

  // Detectar grupos presentes en las jornadas (S8: A/B; S6/S7: A/B/C/D)
  const foundKeys = new Set<string>();
  Object.values(jornadas).forEach((jornada) => {
    Object.keys(jornada || {}).forEach((key) => {
      if (GROUP_KEY_TO_NAME[key]) foundKeys.add(key);
    });
  });
  const groupKeys = GROUP_KEY_ORDER.filter((key) => foundKeys.has(key));

  const groups: GroupData = {};

  groupKeys.forEach((groupKey) => {
    const groupName = GROUP_KEY_TO_NAME[groupKey];
    groups[groupName] = [];
    
    const teamNames = new Set<string>();
    
    Object.values(jornadas).forEach(jornada => {
      jornada[groupKey]?.forEach(match => {
        teamNames.add(normalizeTeamName(match.team1));
        teamNames.add(normalizeTeamName(match.team2));
      });
    });

    const teamStats: { [teamName: string]: { wins: number; losses: number; draws: number; points: number } } = {};
    
    Array.from(teamNames).forEach(teamName => {
      teamStats[teamName] = { wins: 0, losses: 0, draws: 0, points: 0 };
    });

    Object.values(jornadas).forEach(jornada => {
      jornada[groupKey]?.forEach(match => {
        if (match.score1 !== null && match.score2 !== null && 
            match.score1 !== "TBD" && match.score2 !== "TBD") {
          const score1 = parseInt(match.score1);
          const score2 = parseInt(match.score2);
          
          const normalizedTeam1 = normalizeTeamName(match.team1);
          const normalizedTeam2 = normalizeTeamName(match.team2);
          
          teamStats[normalizedTeam1].points += score1;
          teamStats[normalizedTeam2].points += score2;
          
          if (score1 > score2) {
            teamStats[normalizedTeam1].wins++;
            teamStats[normalizedTeam2].losses++;
          } else if (score2 > score1) {
            teamStats[normalizedTeam2].wins++;
            teamStats[normalizedTeam1].losses++;
          } else {
            teamStats[normalizedTeam1].draws++;
            teamStats[normalizedTeam2].draws++;
          }
        }
      });
    });

    Array.from(teamNames).forEach(teamName => {
      const stats = teamStats[teamName];
      const teamData = findTeamData(teamName, teams);
      const isTbdTeam = !teamName || teamName.trim().toUpperCase().startsWith("TBD");
      
      const teamExists = groups[groupName].some(existingTeam => 
        existingTeam.name === teamName || 
        (teamData && existingTeam.name === teamData.name)
      );
      
      if (!teamExists) {
        groups[groupName].push({
          name: teamName,
          logo: isTbdTeam ? "" : (teamData?.logo || ""),
          wins: stats.wins,
          losses: stats.losses,
          draws: stats.draws,
          points: stats.points,
        });
      }
    });

    groups[groupName].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return (b.wins - b.losses) - (a.wins - a.losses);
    });
  });

  return groups;
};

type GroupStageContentProps = {
  season?: number;
};

export const GroupStageContent = ({ season = 6 }: GroupStageContentProps) => {
  const isMobile = useIsMobile(768);
  
  // Select data based on season
  const teamsData = season === 5 ? season5Teams : getSeasonTeams(season as SeasonNumber);
  const jornadasData = season === 5 ? season5Jornadas : getSeasonJornadas(season as SeasonNumber);
  
  const groupsData = createGroupData(teamsData, jornadasData);
  
  const getGroupKey = (groupName: string): string => {
    return (
      Object.entries(GROUP_KEY_TO_NAME).find(([, name]) => name === groupName)?.[0] ||
      "grupo-a"
    );
  };
  
  const renderGroupTable = (data: GroupTeam[], groupName: string) => (
    <GroupSection>
      <GroupTableContainer>
        <GroupTable>
          <TableContainer>
            <TableHeader>
              <HeaderCell className="position">#</HeaderCell>
              <HeaderCell className="team">Equipos</HeaderCell>
              <HeaderCell className="record">W/L/D</HeaderCell>
              <HeaderCell className="points">Puntos</HeaderCell>
            </TableHeader>
            <TableBody>
              {data.map((team, index) => (
                <TableRow key={team.name}>
                  <PositionCell>
                    <TeamStatus position={index + 1} isMobile={isMobile} />
                  </PositionCell>
                  <TeamCell>
                    {team.logo ? (
                      <TeamLogo
                        src={`/images/teams/season-${season}/${team.logo}`}
                        alt={team.name}
                      />
                    ) : (
                      <LogoSpacer />
                    )}
                    <TeamName>{team.name}</TeamName>
                  </TeamCell>
                  <RecordCell>
                    {team.wins}/{team.losses}/{team.draws}
                  </RecordCell>
                  <PointsCell>{team.points} pts</PointsCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </GroupTable>
      </GroupTableContainer>

      <MatchScheduleContent currentGroup={getGroupKey(groupName)} season={season} />
    </GroupSection>
  );

  return (
    <GroupStageContainer>
      {Object.entries(groupsData).map(([groupName, teams]) => (
        <div
          key={groupName}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              color: "white",
              fontFamily: "Outfit, sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            {groupName}
          </h1>
          {renderGroupTable(teams, groupName)}
        </div>
      ))}
    </GroupStageContainer>
  );
};

const GroupStageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const GroupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
	width: 100%;
	justify-content: center;
	align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 32px;
    align-items: flex-start;
  }
`;

const GroupTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  max-width: 700px;
`;

const GroupTable = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
  flex: 1;
  max-width: 600px;
  min-width: 500px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: unset;
    width: 100%;
  }
`;

const TableContainer = styled.div`
  background-color: #1a1a1a;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 80px 80px;
  background-color: var(--season-primary);
  padding: 8px 16px;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 30px 1fr 60px 60px;
    gap: 8px;
    padding: 8px 12px;
  }
`;

const HeaderCell = styled.div`
  color: black;
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-align: center;

  &.team {
    text-align: left;
  }

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

const TableBody = styled.div`
  background-color: black;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 80px 80px;
  padding: 16px;
  gap: 16px;
  border-bottom: 1px solid #333;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 30px 1fr 60px 60px;
    gap: 8px;
    padding: 12px;
  }
`;

const PositionCell = styled.div`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

const TeamCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TeamLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
`;

const LogoSpacer = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const TeamName = styled.span`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

const RecordCell = styled.div`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

const PointsCell = styled.div`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

type TeamStatusProps = { position: number; isMobile?: boolean };

type TeamStatusContainerProps = {
  backgroundColor: string;
};

const TeamStatusContainer = styled.div<TeamStatusContainerProps>`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 4px;
  padding: 4px;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const TeamStatus = ({ position, isMobile }: TeamStatusProps): ReactNode => {
  let svg = null;
  let backgroundColor: string;
  if (position <= 2) {
    svg = arrowUp;
    backgroundColor = "#156733";
  } else if (position <= 4) {
    svg = arrowDown;
    backgroundColor = "#795E08";
  } else {
    svg = close;
    backgroundColor = "#7C2626";
  }

  return (
    <TeamStatusContainer backgroundColor={backgroundColor}>
      <StyledSvg
        src={svg}
        height={isMobile ? "20px" : "24px"}
        width={isMobile ? "20px" : "24px"}
      />
    </TeamStatusContainer>
  );
};