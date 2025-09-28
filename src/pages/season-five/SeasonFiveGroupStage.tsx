import styled from "styled-components";
import teamsData from "../../data/season-5/teams.json";
import { GroupTeam, GroupData } from "../../types/teams";
import { MatchScheduleContent } from "../../components/current-season/tab-content/MatchSchedule";
import { useIsMobile } from "../../hooks/useIsMobile";



const GroupStageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px;
  width: 100%;
`;

const GroupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
`;

const GroupTableContainer = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
`;

const GroupTable = styled.div`
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 120px 100px;
  background-color: #2a2a2a;
  padding: 16px;
  gap: 16px;
  align-items: center;
`;

const HeaderCell = styled.div`
  color: white;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.position {
    text-align: center;
  }

  &.team {
    text-align: left;
  }

  &.record {
    text-align: center;
  }

  &.points {
    text-align: center;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 120px 100px;
  padding: 16px;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PositionCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamStatus = styled.div<{ position: number; isMobile: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: white;
  background-color: ${({ position }) => {
    if (position <= 2) return "#4CAF50"; // Verde para top 2
    if (position <= 4) return "#FF9800"; // Naranja para 3-4
    return "#666"; // Gris para el resto
  }};
`;

const TeamCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
`;

const TeamName = styled.span`
  color: white;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  font-size: 16px;
`;

const RecordCell = styled.div`
  color: white;
  font-family: "Outfit", sans-serif;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
`;

const PointsCell = styled.div`
  color: #fabf4a;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;

const createGroupData = (): GroupData => {
  const teams = Object.values(teamsData);
  
  // Crear datos de grupos simulados basados en los equipos disponibles
  const groupA: GroupTeam[] = teams.slice(0, 4).map((team) => ({
    name: team.name,
    logo: team.logo,
    wins: Math.floor(Math.random() * 6),
    losses: Math.floor(Math.random() * 4),
    draws: Math.floor(Math.random() * 2),
    points: 0
  }));

  const groupB: GroupTeam[] = teams.slice(4, 8).map((team) => ({
    name: team.name,
    logo: team.logo,
    wins: Math.floor(Math.random() * 6),
    losses: Math.floor(Math.random() * 4),
    draws: Math.floor(Math.random() * 2),
    points: 0
  }));

  // Calcular puntos (3 por victoria, 1 por empate)
  groupA.forEach(team => {
    team.points = team.wins * 3 + team.draws;
  });
  
  groupB.forEach(team => {
    team.points = team.wins * 3 + team.draws;
  });

  // Ordenar por puntos
  groupA.sort((a, b) => b.points - a.points);
  groupB.sort((a, b) => b.points - a.points);

  return {
    "Grupo A": groupA,
    "Grupo B": groupB
  };
};

export const SeasonFiveGroupStage = () => {
  const isMobile = useIsMobile(768);
  const groupsData = createGroupData();
  
  const getGroupKey = (groupName: string): "grupo-a" | "grupo-b" | "grupo-c" | "grupo-d" => {
    switch (groupName) {
      case "Grupo A":
        return "grupo-a";
      case "Grupo B":
        return "grupo-b";
      case "Grupo C":
        return "grupo-c";
      case "Grupo D":
        return "grupo-d";
      default:
        return "grupo-a";
    }
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
                    <TeamLogo
                      src={`/images/teams/season-5/${team.logo}`}
                      alt={team.name}
                    />
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

      <MatchScheduleContent currentGroup={getGroupKey(groupName)} />
    </GroupSection>
  );

  return (
    <GroupStageContainer>
      {Object.entries(groupsData).map(([groupName, groupData]) =>
        renderGroupTable(groupData, groupName)
      )}
    </GroupStageContainer>
  );
};