import { JsonDatabase } from "brackets-json-db";
import { BracketsManager } from "brackets-manager";

const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

async function createCustomBracket() {
  // Create a 16-team double elimination tournament
  // This gives us the upper bracket structure we want
  const upperTeams = Array.from(
    { length: 16 },
    (_, i) => `Upper Team ${i + 1}`
  );

  const stage = await manager.create.stage({
    tournamentId: 3,
    name: "Custom Double Elimination",
    type: "double_elimination",
    seeding: upperTeams,
    settings: {
      size: 16,
      grandFinal: "double",
    },
  });

  console.log("16-team double elimination created!");
  console.log("Stage ID:", stage.id);

  // Get the tournament data using the correct stage ID
  const tournamentData = await manager.get.stageData(stage.id);

  // Create the 8 lower bracket teams
  const lowerTeams = Array.from({ length: 8 }, (_, i) => ({
    id: 16 + i,
    tournament_id: 3,
    name: `Lower Team ${i + 1}`,
  }));

  // Combine all participants
  const allParticipants = [...tournamentData.participant, ...lowerTeams];

  // Now we need to modify the lower bracket structure
  // Find the first round of the lower bracket (where losers from upper bracket round 1 go)
  const lowerBracketGroup = tournamentData.group.find(g => g.number === 2); // Lower bracket is group number 2
  const firstLowerRound = tournamentData.round.find(r => 
    r.group_id === lowerBracketGroup.id && r.number === 1
  );

  // Modify the first round of lower bracket matches to include pre-seeded teams
  const firstLowerRoundMatches = tournamentData.match.filter(m => 
    m.round_id === firstLowerRound.id
  );

  // Update each match in the first lower bracket round to have a pre-seeded opponent
  firstLowerRoundMatches.forEach((match, index) => {
    if (index < 8) { // We have 8 pre-seeded teams
      // opponent1 will be the loser from upper bracket (stays null initially)
      // opponent2 will be the pre-seeded lower bracket team
      match.opponent2 = {
        id: 16 + index, // Lower team IDs start at 16
        position: index + 1
      };
    }
  });

  // Export the modified data
  const customData = {
    participant: allParticipants,
    stage: tournamentData.stage,
    group: tournamentData.group,
    round: tournamentData.round,
    match: tournamentData.match,
    match_game: tournamentData.match_game || [],
  };

  // Save to file
  const fs = await import("fs");
  fs.writeFileSync(
    "./db.json",
    JSON.stringify(customData, null, 2)
  );

  console.log("Custom tournament data saved to db.json!");
  console.log(`Total participants: ${allParticipants.length}`);
  console.log("Upper bracket teams: 16");
  console.log("Lower bracket teams: 8");
  console.log("First lower bracket round updated with pre-seeded teams");
}

createCustomBracket().catch(console.error);
