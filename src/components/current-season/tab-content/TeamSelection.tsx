import { useState } from "react";
import styled from "styled-components";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useTeamNavigation } from "../../../hooks/useTeamNavigation";
import { TeamJsonType } from "../../../types/teams";
import season5Teams from "../../../data/season-5/teams.json";
import { getSeasonTeams, type SeasonNumber } from "../../../data/season-data";
import { StyledSvg } from "../../common/StyledSVG";
import trophyIcon from "../../../assets/fantasy-icons/trophy-option-c.svg";

type TeamSelectionContentProps = {
  season?: number;
};

export const TeamSelectionContent = ({ season = 6 }: TeamSelectionContentProps) => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const isMobile = useIsMobile(768);
  
  // Select team data based on season (S5 propio; S6/S7 desde season-data para no alterar S6)
  const teamJson = season === 5 ? season5Teams : getSeasonTeams(season as SeasonNumber);
    
  const { goToPreviousTeam, goToNextTeam, teams } = useTeamNavigation(
    selectedTeam,
    setSelectedTeam,
    teamJson
  );
  
  
  // Initialize selectedTeam if not set
  if (!selectedTeam && teams.length > 0) {
    setSelectedTeam(teams[0]);
    return null; // Re-render will happen with the new state
  }
  
  const typedTeamJson = teamJson as TeamJsonType;

  if (isMobile) {
    return (
      <TeamSelectionMobile
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        goToPreviousTeam={goToPreviousTeam}
        goToNextTeam={goToNextTeam}
        typedTeamJson={typedTeamJson}
        teams={teams}
        season={season}
      />
    );
  }

  return (
    <TeamSelectionDesktop
      selectedTeam={selectedTeam}
      setSelectedTeam={setSelectedTeam}
      goToPreviousTeam={goToPreviousTeam}
      goToNextTeam={goToNextTeam}
      typedTeamJson={typedTeamJson}
      teams={teams}
      season={season}
    />
  );
};

type TeamSelectionProps = {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  goToPreviousTeam: () => void;
  goToNextTeam: () => void;
  typedTeamJson: TeamJsonType;
  teams: string[];
  season: number;
};

const TeamSelectionDesktop = ({
  selectedTeam,
  setSelectedTeam,
  goToPreviousTeam,
  goToNextTeam,
  typedTeamJson,
  teams,
  season,
}: TeamSelectionProps) => {
  const selectedLogo = typedTeamJson[selectedTeam]?.logo;
  const selectedName = typedTeamJson[selectedTeam]?.name ?? selectedTeam;
  const selectedIsTbd = !selectedName || selectedName.trim().toUpperCase().startsWith("TBD") || !selectedLogo;

  return (
    <FaseDeGruposContainer>
      <TeamLogoContainer>
        {teams.map((teamName: string) => {
          const logo = typedTeamJson[teamName].logo;
          const displayName = typedTeamJson[teamName].name ?? teamName;
          const isTbd = !displayName || displayName.trim().toUpperCase().startsWith("TBD") || !logo;
          return (
            <TeamLogoCard key={teamName} isSelected={teamName === selectedTeam}>
              {isTbd ? (
                <TeamLogoPlaceholder
                  onClick={() => setSelectedTeam(teamName)}
                  title={displayName}
                >
                  TBD
                </TeamLogoPlaceholder>
              ) : (
                <TeamLogo
                  src={`/images/teams/season-${season}/${logo}`}
                  alt={displayName}
                  onClick={() => setSelectedTeam(teamName)}
                />
              )}
            </TeamLogoCard>
          );
        })}
      </TeamLogoContainer>
      <TeamInformationContainer>
        <TeamHeader>
          <ArrowButton onClick={goToPreviousTeam}>{"<"}</ArrowButton>
          <TeamName>{selectedName}</TeamName>
          <ArrowButton onClick={goToNextTeam}>{">"}</ArrowButton>
        </TeamHeader>
        {selectedIsTbd ? (
          <TeamLogoPlaceholderLarge>TBD</TeamLogoPlaceholderLarge>
        ) : (
          <TeamLogo
            src={`/images/teams/season-${season}/${selectedLogo}`}
            alt="Team Logo"
            style={{ width: "120px", height: "120px" }}
          />
        )}
        <PlayersList>
          {typedTeamJson[selectedTeam]?.players.map((player) => {
            const championships = player.championships ?? 0;
            return (
              <PlayerItem key={player.nick}>
                <PlayerLeft>
                  <CountryFlag
                    src={`/images/countries/${player.nationality}.svg`}
                    alt={player.nationality.toUpperCase()}
                  />
                  <PlayerName>{player.nick}</PlayerName>
                </PlayerLeft>
                {championships > 0 && (
                  <Championships title={`${championships}x campeón`}>
                    {Array.from({ length: Math.min(championships, 5) }).map((_, i) => (
                      <StyledSvg
                        key={i}
                        src={trophyIcon}
                        width="14px"
                        height="14px"
                        color="#9a9a9a"
                      />
                    ))}
                    <ChampionshipCount>{championships}</ChampionshipCount>
                  </Championships>
                )}
              </PlayerItem>
            );
          })}
        </PlayersList>
      </TeamInformationContainer>
    </FaseDeGruposContainer>
  );
};

const TeamSelectionMobile = ({
  selectedTeam,
  setSelectedTeam,
  goToPreviousTeam,
  goToNextTeam,
  typedTeamJson,
  teams,
  season,
}: TeamSelectionProps) => {
  const selectedLogo = typedTeamJson[selectedTeam]?.logo;
  const selectedName = typedTeamJson[selectedTeam]?.name ?? selectedTeam;
  const selectedIsTbd = !selectedName || selectedName.trim().toUpperCase().startsWith("TBD") || !selectedLogo;

  return (
    <MobileContainer>
      <TeamLogoMobileContainer>
        {teams.map((teamName: string) => {
          const logo = typedTeamJson[teamName].logo;
          const displayName = typedTeamJson[teamName].name ?? teamName;
          const isTbd = !displayName || displayName.trim().toUpperCase().startsWith("TBD") || !logo;
          return (
            <TeamLogoMobileCard
              key={teamName}
              isSelected={teamName === selectedTeam}
              onClick={() => setSelectedTeam(teamName)}
            >
              {isTbd ? (
                <TeamLogoPlaceholderMobile title={displayName}>
                  TBD
                </TeamLogoPlaceholderMobile>
              ) : (
                <TeamLogoMobile
                  src={`/images/teams/season-${season}/${logo}`}
                  alt={displayName}
                />
              )}
            </TeamLogoMobileCard>
          );
        })}
      </TeamLogoMobileContainer>

      <TeamInformationMobileContainer>
        <TeamHeader>
          <ArrowButton onClick={goToPreviousTeam}>{"<"}</ArrowButton>
          <TeamName>{selectedName}</TeamName>
          <ArrowButton onClick={goToNextTeam}>{">"}</ArrowButton>
        </TeamHeader>

        {selectedIsTbd ? (
          <TeamLogoPlaceholderLarge>TBD</TeamLogoPlaceholderLarge>
        ) : (
          <TeamLogoSelected
            src={`/images/teams/season-${season}/${selectedLogo}`}
            alt="Team Logo"
          />
        )}

        <PlayersListMobile>
          {typedTeamJson[selectedTeam]?.players.map((player) => {
            const championships = player.championships ?? 0;
            return (
              <PlayerItemMobile key={player.nick}>
                <PlayerLeft>
                  <CountryFlag
                    src={`/images/countries/${player.nationality}.svg`}
                    alt={player.nationality.toUpperCase()}
                  />
                  <PlayerName>{player.nick}</PlayerName>
                </PlayerLeft>
                {championships > 0 && (
                  <Championships title={`${championships}x campeón`}>
                    {Array.from({ length: Math.min(championships, 5) }).map((_, i) => (
                      <StyledSvg
                        key={i}
                        src={trophyIcon}
                        width="14px"
                        height="14px"
                        color="#9a9a9a"
                      />
                    ))}
                    <ChampionshipCount>{championships}</ChampionshipCount>
                  </Championships>
                )}
              </PlayerItemMobile>
            );
          })}
        </PlayersListMobile>
      </TeamInformationMobileContainer>
    </MobileContainer>
  );
};

// Styled Components
const FaseDeGruposContainer = styled.div`
  margin: 16px 0px;
  padding-left: 64px;
  gap: 16px;
  display: flex;
  flex-direction: row;
  color: white;
`;

const TeamLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  cursor: pointer;
`;

const TeamLogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TeamLogoPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #666;
  font-size: 14px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
  cursor: pointer;
`;

const TeamLogoPlaceholderLarge = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #666;
  font-size: 18px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
`;

const TeamLogoPlaceholderMobile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #666;
  font-size: 11px;
  font-weight: 600;
  font-family: "Outfit", sans-serif;
`;

type TeamLogoCardProps = {
  isSelected?: boolean;
};

const TeamLogoCard = styled.div<TeamLogoCardProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 16px 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--season-primary);
  min-width: 200px;
  height: 124px;
  text-align: center;
  background-color: ${(props) => (props.isSelected ? "color-mix(in srgb, var(--season-primary) 10%, transparent)" : "inherit")};
`;

const TeamInformationContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #131313;
`;

const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const TeamName = styled.h2`
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  text-align: center;
  overflow: hidden;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: var(--season-primary);
  }
`;

const PlayersList = styled.div`
  top: 0;
  gap: 8px;
  width: 100%;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid var(--season-primary);
`;

const PlayerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
`;

const Championships = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const ChampionshipCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 4px;
  background: #2a2a2a;
  color: #fff;
  font-family: "Outfit", sans-serif;
  font-size: 12px;
  font-weight: 600;
`;

const CountryFlag = styled.img`
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
`;

const PlayerName = styled.span`
  color: white;
  font-family: "Rethink Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

// Mobile styled components
const MobileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 16px;
  box-sizing: border-box;
  gap: 16px;
`;

const TeamLogoMobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  padding: 12px 0px;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar while maintaining scroll functionality */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TeamLogoMobileCard = styled.div<TeamLogoCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.isSelected ? "var(--season-primary)" : "#555")};
  padding: 8px;
  min-width: 70px;
  height: 70px;
  flex-shrink: 0;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? "color-mix(in srgb, var(--season-primary) 10%, transparent)" : "transparent"};
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const TeamLogoMobile = styled.img`
  width: 54px;
  height: 54px;
  object-fit: contain;
  border-radius: 4px;
`;

const TeamInformationMobileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: #131313;
  border-radius: 12px;
  box-sizing: border-box;
`;

const TeamLogoSelected = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  margin: 16px 0;
`;


const PlayersListMobile = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const PlayerItemMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid var(--season-primary);

  &:last-child {
    border-bottom: none;
  }
`;
