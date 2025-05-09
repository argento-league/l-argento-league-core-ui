import styled from "styled-components";
import groupAJson  from '../../data/scoreboard/group-a.json'
import groupBJson  from '../../data/scoreboard/group-b.json'
import { TeamStanding } from "../../types";

const GROUP_A = groupAJson as TeamStanding[]
const GROUP_B = groupBJson as TeamStanding[]

const TableContainer = styled.div`
  overflow-x: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  gap: 20px;
  background-color: #000000;
  font-family: ui-sans-serif, system-ui, sans-serif;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const GroupTable = styled.div`
  flex: 1;
  max-width: 700px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #000000;
  color: white;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: rgb(229, 231, 235);
  &:not(:first-child) {
    text-align: center;
  }
  @media (max-width: 550px) {
    font-size: 10px;
  }
`;

const TableRow = styled.tr`
  background-color: #000000;
`;

const TableCell = styled.td`
  white-space: nowrap;
  padding: 2px 4px;
  @media (min-width: 640px) {
    padding: 2px 8px;
  }
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: rgb(202, 138, 4);
  text-align: center;
  &:first-child {
    text-align: left;
  }
  @media (prefers-color-scheme: dark) {
    color: rgb(202, 138, 4);
  }
  @media (max-width: 550px) {
    font-size: 10px;
  }
`;

const CellContent = styled.p<{ type?: 'wins' | 'losses' | 'draws'; isName?: boolean; position: number }>`
  text-align: ${props => props.isName ? 'left' : 'center'};
  font-size: 10px;
  font-weight: 700;
  background-color: ${props => {
    if (props.position <= 4) return 'rgba(34, 197, 94, 0.5)';
    if (props.position <= 8) return 'rgba(234, 179, 8, 0.5)';
    return 'rgba(239, 68, 68, 0.5)';
  }};
  color: ${props => {
    if (props.type === 'wins') return 'rgb(22, 163, 74)';
    if (props.type === 'losses') return 'rgb(220, 38, 38)';
    if (props.type === 'draws') return 'rgb(202, 138, 4)';
    return 'rgb(229, 231, 235)';
  }};
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0;
  line-height: 1.2;
  display: inline-block;
  min-width: ${props => props.isName ? '100%' : 'auto'};

  @media (prefers-color-scheme: dark) {
    background-color: ${props => {
      if (props.position <= 4) return 'rgba(74, 222, 128, 0.2)';
      if (props.position <= 8) return 'rgba(250, 204, 21, 0.2)';
      return 'rgba(248, 114, 114, 0.2)';
    }};
  }
  @media (min-width: 550px) {
    font-size: 14px;
  }
`;

const TeamLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  margin: 0 auto;
`;

const GroupTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-family: ui-sans-serif, system-ui, sans-serif;
`;

export default function GroupStandings() {
  return (
      <TableContainer id="table-container">
        <GroupTable id="group-table">
          <GroupTitle>Grupo A</GroupTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Equipo</TableHeader>
                <TableHeader>Logo</TableHeader>
                <TableHeader>Partidas</TableHeader>
                <TableHeader>V</TableHeader>
                <TableHeader>D</TableHeader>
                <TableHeader>E</TableHeader>
                <TableHeader>Puntos</TableHeader>
              </tr>
            </thead>
            <tbody>
              {GROUP_A.map((team, index) => (
                <TableRow key={team.name}>
                  <TableCell>
                    <CellContent isName position={index + 1}>{team.name}</CellContent>
                  </TableCell>
                  <TableCell>
                    <TeamLogo src={team.logo} alt="Team logo" />
                  </TableCell>
                  <TableCell>
                    <CellContent position={index + 1}>{team.games}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent type="wins" position={index + 1}>{team.wins}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent type="losses" position={index + 1}>{team.losses}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent type="draws" position={index + 1}>{team.draws}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent position={index + 1}>{team.points}</CellContent>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </GroupTable>

        <GroupTable>
          <GroupTitle>Grupo B</GroupTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Equipo</TableHeader>
                <TableHeader>Logo</TableHeader>
                <TableHeader>Partidas</TableHeader>
                <TableHeader>V</TableHeader>
                <TableHeader>D</TableHeader>
                <TableHeader>E</TableHeader>
                <TableHeader>Puntos</TableHeader>
              </tr>
            </thead>
            <tbody>
              {GROUP_B.map((team, index) => (
                <TableRow key={team.name}>
                  <TableCell>
                    <CellContent isName position={index + 1}>{team.name}</CellContent>
                  </TableCell>
                  <TableCell>
                    <TeamLogo src={team.logo} alt="Team logo" />
                  </TableCell>
                  <TableCell>
                    <CellContent position={index + 1}>{team.games}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent type="wins" position={index + 1}>{team.wins}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent type="losses" position={index + 1}>{team.losses}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent type="draws" position={index + 1}>{team.draws}</CellContent>
                  </TableCell>
                  <TableCell>
                    <CellContent position={index + 1}>{team.points}</CellContent>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </GroupTable>
      </TableContainer>
  );
}