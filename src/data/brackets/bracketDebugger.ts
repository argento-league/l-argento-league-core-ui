// Debugging utilities for tournament bracket
import {
  BRACKET_STRUCTURE,
  UPPER_BRACKET_R1_MATCHES,
  UPPER_BRACKET_R2_MATCHES,
  UPPER_BRACKET_R3_MATCHES,
  UPPER_BRACKET_R4_MATCHES,
  LOWER_BRACKET_R1_MATCHES,
  LOWER_BRACKET_R2_MATCHES,
  LOWER_BRACKET_R3_MATCHES,
  LOWER_BRACKET_R4_MATCHES,
  LOWER_BRACKET_R5_MATCHES,
  LOWER_BRACKET_R6_MATCHES,
  LOWER_BRACKET_R7_MATCHES,
  GRAND_FINAL_MATCHES,
  PARTICIPANTS
} from "./tournamentData";

// Helper functions for debugging
export const debugBracket = {
  // Print the complete bracket structure
  printStructure: () => {
    console.log("🏆 TOURNAMENT BRACKET STRUCTURE");
    console.log("================================");
    
    console.log("\n🔥 UPPER BRACKET:");
    console.log(`Round 1: ${BRACKET_STRUCTURE.upperBracket.round1.games} games (8 teams eliminated)`);
    console.log(`Round 2: ${BRACKET_STRUCTURE.upperBracket.round2.games} games (4 teams eliminated)`);
    console.log(`Round 3: ${BRACKET_STRUCTURE.upperBracket.round3.games} games (2 teams eliminated)`);
    console.log(`Round 4: ${BRACKET_STRUCTURE.upperBracket.round4.games} games (1 team eliminated)`);
    
    console.log("\n⬇️ LOWER BRACKET:");
    console.log(`Round 1: ${BRACKET_STRUCTURE.lowerBracket.round1.games} games (Initial lower bracket teams)`);
    console.log(`Round 2: ${BRACKET_STRUCTURE.lowerBracket.round2.games} games (R1 winners vs Upper R1 losers)`);
    console.log(`Round 3: ${BRACKET_STRUCTURE.lowerBracket.round3.games} games (R2 winners vs Upper R2 losers)`);
    console.log(`Round 4: ${BRACKET_STRUCTURE.lowerBracket.round4.games} games (R3 winners vs Upper R3 losers)`);
    console.log(`Round 5: ${BRACKET_STRUCTURE.lowerBracket.round5.games} games (R4 winners vs Upper R4 loser)`);
    console.log(`Round 6: ${BRACKET_STRUCTURE.lowerBracket.round6.games} games (Lower bracket semi)`);
    console.log(`Round 7: ${BRACKET_STRUCTURE.lowerBracket.round7.games} games (Lower bracket final)`);
    
    console.log("\n🏅 GRAND FINAL:");
    console.log(`${GRAND_FINAL_MATCHES.length} games (Upper winner vs Lower winner)`);
  },

  // Print specific round details
  printRound: (bracket: 'upper' | 'lower', round: number) => {
    if (bracket === 'upper') {
      const roundKey = `round${round}` as keyof typeof BRACKET_STRUCTURE.upperBracket;
      const roundData = BRACKET_STRUCTURE.upperBracket[roundKey];
      if (roundData) {
        console.log(`\n🔥 UPPER BRACKET - ROUND ${round}:`);
        console.log(`Games: ${roundData.games}`);
        console.log(`Matches:`, roundData.matches);
      }
    } else {
      const roundKey = `round${round}` as keyof typeof BRACKET_STRUCTURE.lowerBracket;
      const roundData = BRACKET_STRUCTURE.lowerBracket[roundKey];
      if (roundData) {
        console.log(`\n⬇️ LOWER BRACKET - ROUND ${round}:`);
        console.log(`Games: ${roundData.games}`);
        console.log(`Matches:`, roundData.matches);
      }
    }
  },

  // Print matches by round_id
  printMatchesByRoundId: (roundId: number) => {
    const getAllMatches = () => [
      ...UPPER_BRACKET_R1_MATCHES,
      ...UPPER_BRACKET_R2_MATCHES,
      ...UPPER_BRACKET_R3_MATCHES,
      ...UPPER_BRACKET_R4_MATCHES,
      ...LOWER_BRACKET_R1_MATCHES,
      ...LOWER_BRACKET_R2_MATCHES,
      ...LOWER_BRACKET_R3_MATCHES,
      ...LOWER_BRACKET_R4_MATCHES,
      ...LOWER_BRACKET_R5_MATCHES,
      ...LOWER_BRACKET_R6_MATCHES,
      ...LOWER_BRACKET_R7_MATCHES,
      ...GRAND_FINAL_MATCHES
    ];

    const matches = getAllMatches().filter(match => match.round_id === roundId);
    console.log(`\n🎯 ROUND ID ${roundId} MATCHES:`);
    console.log(`Count: ${matches.length}`);
    matches.forEach(match => {
      console.log(`Match ${match.id}: Game ${match.number} - Group ${match.group_id}`);
    });
  },

  // Print all participants
  printParticipants: () => {
    console.log("\n👥 PARTICIPANTS:");
    console.log("Upper Bracket Teams (16):");
    PARTICIPANTS.slice(0, 16).forEach(p => console.log(`${p.id}: ${p.name}`));
    console.log("\nLower Bracket Teams (8):");
    PARTICIPANTS.slice(16, 24).forEach(p => console.log(`${p.id}: ${p.name}`));
  },

  // Validate bracket structure
  validateStructure: () => {
    console.log("\n✅ VALIDATING BRACKET STRUCTURE:");
    
    const expectedStructure = [8, 4, 4, 2, 2, 1, 1]; // Lower bracket: R1, R2, R3, R4, R5, R6, R7
    const actualStructure = [
      BRACKET_STRUCTURE.lowerBracket.round1.games,
      BRACKET_STRUCTURE.lowerBracket.round2.games,
      BRACKET_STRUCTURE.lowerBracket.round3.games,
      BRACKET_STRUCTURE.lowerBracket.round4.games,
      BRACKET_STRUCTURE.lowerBracket.round5.games,
      BRACKET_STRUCTURE.lowerBracket.round6.games,
      BRACKET_STRUCTURE.lowerBracket.round7.games
    ];
    
    console.log("Expected lower bracket structure:", expectedStructure);
    console.log("Actual lower bracket structure:", actualStructure);
    
    const isValid = JSON.stringify(expectedStructure) === JSON.stringify(actualStructure);
    console.log(isValid ? "✅ Structure is CORRECT!" : "❌ Structure is INCORRECT!");
    
    return isValid;
  },

  // Check for duplicate match IDs
  checkDuplicateMatchIds: () => {
    const getAllMatches = () => [
      ...UPPER_BRACKET_R1_MATCHES,
      ...UPPER_BRACKET_R2_MATCHES,
      ...UPPER_BRACKET_R3_MATCHES,
      ...UPPER_BRACKET_R4_MATCHES,
      ...LOWER_BRACKET_R1_MATCHES,
      ...LOWER_BRACKET_R2_MATCHES,
      ...LOWER_BRACKET_R3_MATCHES,
      ...LOWER_BRACKET_R4_MATCHES,
      ...LOWER_BRACKET_R5_MATCHES,
      ...LOWER_BRACKET_R6_MATCHES,
      ...LOWER_BRACKET_R7_MATCHES,
      ...GRAND_FINAL_MATCHES
    ];

    const allMatches = getAllMatches();
    const matchIds = allMatches.map(m => m.id);
    const uniqueIds = [...new Set(matchIds)];
    
    console.log("\n🔍 CHECKING FOR DUPLICATE MATCH IDs:");
    console.log(`Total matches: ${allMatches.length}`);
    console.log(`Unique IDs: ${uniqueIds.length}`);
    
    if (matchIds.length === uniqueIds.length) {
      console.log("✅ No duplicate match IDs found!");
    } else {
      console.log("❌ Duplicate match IDs detected!");
      const duplicates = matchIds.filter((id, index) => matchIds.indexOf(id) !== index);
      console.log("Duplicate IDs:", [...new Set(duplicates)]);
    }
  }
};

// Quick access constants for debugging specific rounds
export const DEBUG_ROUNDS = {
  UPPER_R1: UPPER_BRACKET_R1_MATCHES,
  UPPER_R2: UPPER_BRACKET_R2_MATCHES,
  UPPER_R3: UPPER_BRACKET_R3_MATCHES,
  UPPER_R4: UPPER_BRACKET_R4_MATCHES,
  LOWER_R1: LOWER_BRACKET_R1_MATCHES,
  LOWER_R2: LOWER_BRACKET_R2_MATCHES,
  LOWER_R3: LOWER_BRACKET_R3_MATCHES,
  LOWER_R4: LOWER_BRACKET_R4_MATCHES,
  LOWER_R5: LOWER_BRACKET_R5_MATCHES,
  LOWER_R6: LOWER_BRACKET_R6_MATCHES,
  LOWER_R7: LOWER_BRACKET_R7_MATCHES,
  GRAND_FINAL: GRAND_FINAL_MATCHES
};

// Usage examples (you can run these in browser console):
/*
import { debugBracket, DEBUG_ROUNDS } from './bracketDebugger';

// Print complete structure
debugBracket.printStructure();

// Print specific round
debugBracket.printRound('lower', 2);

// Validate structure
debugBracket.validateStructure();

// Check for duplicates
debugBracket.checkDuplicateMatchIds();

// Access specific round matches
console.log('Lower Bracket Round 2:', DEBUG_ROUNDS.LOWER_R2);
*/
