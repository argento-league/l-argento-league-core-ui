export const useTeamNavigation = (
  selectedTeam: string,
  setSelectedTeam: (team: string) => void,
  teamJson: any
) => {
  const teams = Object.keys(teamJson);
  const goToPreviousTeam = () => {
    const currentIndex = teams.indexOf(selectedTeam);
    const prevIndex = (currentIndex - 1 + teams.length) % teams.length;
    setSelectedTeam(teams[prevIndex]);
  };

  const goToNextTeam = () => {
    const currentIndex = teams.indexOf(selectedTeam);
    const nextIndex = (currentIndex + 1) % teams.length;
    setSelectedTeam(teams[nextIndex]);
  };

  return { 
    goToPreviousTeam, 
    goToNextTeam,
    teams,
    totalTeams: teams.length
  };
};
