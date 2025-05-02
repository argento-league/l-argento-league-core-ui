import styled from "styled-components";
import '../fonts.css';

type TeamStanding = {
  name: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
};

const GROUP_A: TeamStanding[] = [
  { name: "The raw chickens", games: 10, wins: 6, losses: 1, draws: 3, points: 15 },
  { name: "Sushi BoyS", games: 10, wins: 5, losses: 1, draws: 4, points: 14 },
  { name: "Carpinchos Rage", games: 10, wins: 4, losses: 2, draws: 4, points: 12 },
  { name: "Players Libres", games: 10, wins: 5, losses: 3, draws: 2, points: 12 },
  { name: "Children of the Corn", games: 10, wins: 4, losses: 2, draws: 4, points: 12 },
  { name: "Hydra E-sport", games: 10, wins: 2, losses: 0, draws: 8, points: 12 },
  { name: "The Rats", games: 10, wins: 3, losses: 4, draws: 3, points: 9 },
  { name: "Team Server", games: 10, wins: 2, losses: 4, draws: 4, points: 8 },
  { name: "Black holes", games: 10, wins: 2, losses: 4, draws: 4, points: 8 },
  { name: "ASA_Dance", games: 10, wins: 0, losses: 5, draws: 5, points: 5 },
  { name: "Veritas Gaming", games: 10, wins: 1, losses: 8, draws: 1, points: 3 },
];

const GROUP_B: TeamStanding[] = [
  { name: "Fantasmas", games: 10, wins: 8, losses: 0, draws: 2, points: 18 },
  { name: "3FECTO DIVINE", games: 10, wins: 6, losses: 1, draws: 3, points: 15 },
  { name: "LA Lakers", games: 10, wins: 6, losses: 2, draws: 2, points: 14 },
  { name: "Guerreros Z", games: 10, wins: 4, losses: 1, draws: 5, points: 13 },
  { name: "Branca Team", games: 10, wins: 3, losses: 2, draws: 5, points: 11 },
  { name: "Aldea Gaming", games: 10, wins: 2, losses: 2, draws: 6, points: 10 },
  { name: "La Gatoneta", games: 10, wins: 3, losses: 4, draws: 3, points: 9 },
  { name: "Lemuria", games: 10, wins: 1, losses: 4, draws: 5, points: 7 },
  { name: "Windfury Enjoyers", games: 10, wins: 1, losses: 4, draws: 5, points: 7 },
  { name: "The Orphans", games: 10, wins: 1, losses: 5, draws: 4, points: 6 },
  { name: "DREAM", games: 10, wins: 0, losses: 10, draws: 0, points: 0 },
];

const TableContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
  background-color: #000000;
  font-family: ui-sans-serif, system-ui, sans-serif;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const GroupTable = styled.div`
  flex: 1;
  max-width: 800px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #000000;
  color: white;
`;

const TableHeader = styled.th`
  background-color: #000000;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #3b3f73;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-weight: 700;
`;

const TableRow = styled.tr<{ position: number }>`
  background-color: ${(props) => {
    if (props.position <= 4) return '#1a472a';
    if (props.position <= 8) return '#2b1810';
    return '#2b1f1f';
  }};
  
  &:nth-child(even) {
    background-color: ${(props) => {
      if (props.position <= 4) return '#1f5234';
      if (props.position <= 8) return '#3a2218';
      return '#3a1f1f';
    }};
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #3b3f73;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-weight: 700;
`;

const GroupTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Vox Wide W06 Medium', ui-sans-serif, system-ui, sans-serif;
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-family: ui-sans-serif, system-ui, sans-serif;
`;

export default function GroupStandings() {
  return (
    <div>
      <PageTitle>Group Standings</PageTitle>
      <TableContainer>
        <GroupTable>
          <GroupTitle>Group A</GroupTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Games</TableHeader>
                <TableHeader>W</TableHeader>
                <TableHeader>L</TableHeader>
                <TableHeader>D</TableHeader>
                <TableHeader>Points</TableHeader>
              </tr>
            </thead>
            <tbody>
              {GROUP_A.map((team, index) => (
                <TableRow key={team.name} position={index + 1}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.games}</TableCell>
                  <TableCell>{team.wins}</TableCell>
                  <TableCell>{team.losses}</TableCell>
                  <TableCell>{team.draws}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </GroupTable>

        <GroupTable>
          <GroupTitle>Group B</GroupTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Games</TableHeader>
                <TableHeader>W</TableHeader>
                <TableHeader>L</TableHeader>
                <TableHeader>D</TableHeader>
                <TableHeader>Points</TableHeader>
              </tr>
            </thead>
            <tbody>
              {GROUP_B.map((team, index) => (
                <TableRow key={team.name} position={index + 1}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.games}</TableCell>
                  <TableCell>{team.wins}</TableCell>
                  <TableCell>{team.losses}</TableCell>
                  <TableCell>{team.draws}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </GroupTable>
      </TableContainer>
    </div>
  );
}