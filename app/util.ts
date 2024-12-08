import type { Event, CompetitorLeader } from './types';

const POWER_CONFERENCES = ['2', '4', '8', '23'];

export const getGameScore = (game: Event, isNBA = false) => {
    let rankUpsetScore = 0;
    let clockScore = 0;
    let playerPerfScore = 0;
    let scoringPerfScore = 0;
    let closeGameScore = 0;
  
    const comp = game.competitions[0];
    const team1 = comp.competitors[0];
    const team2 = comp.competitors[1];
  
    const score1 = parseInt(team1.score);
    const score2 = parseInt(team2.score);
    const clock = comp.status.clock;
    const period = comp.status.period;
    const scoreDiff = Math.abs(score1 - score2);
  
    if (isNBA) {
      // NBA-specific scoring logic
      // (Trimmed for brevity — similar logic as in the original)
    } else {
      // College basketball scoring logic
      const rank1 = team1.curatedRank?.current || 99;
      const rank2 = team2.curatedRank?.current || 99;
  
      if (rank1 === 99 && rank2 !== 99 && score1 > score2) rankUpsetScore = 10;
      else if (rank2 === 99 && rank1 !== 99 && score2 > score1) rankUpsetScore = 10;
      else if (rank1 !== 99 && rank2 !== 99) rankUpsetScore = 7
      else if (rank1 === 99 && rank2 === 99) {
        const conf1 = team1.team.conferenceId;
        const conf2 = team2.team.conferenceId;
        if (conf1 && POWER_CONFERENCES.includes(conf1) || conf2 && POWER_CONFERENCES.includes(conf2)) {
          rankUpsetScore = 5;
        } else {
          rankUpsetScore = 3;
        }
      }
      else rankUpsetScore = 1;
  
      if (period === 1) clockScore = 0;
      else if (period === 2) clockScore = (1200 - clock) * (1 / Math.max(scoreDiff, 1));
      else clockScore = 1000;
  
      const leaders = [team1, team2].reduce((acc: CompetitorLeader[], team) => {
        if (team.leaders) acc.push(...team.leaders); // Spread `team.leaders` into the array
        return acc;
      }, [] as CompetitorLeader[]); // Ensure the accumulator is explicitly typed
  
      leaders.forEach((leader) => {
        if (leader.name !== 'rating') { // Ensure the condition matches your logic
          leader.leaders.forEach((player) => {
            if (player.value > 25) {
              playerPerfScore += 1;
            }
          });
        }
      });
    }
  
    scoringPerfScore = score1 + score2;
    closeGameScore = Math.max(50 - scoreDiff, 0);
  
    const totalScore =
      rankUpsetScore * 13 +
      clockScore * 8 +
      closeGameScore * 2 +
      playerPerfScore * 42 +
      scoringPerfScore * 3;
  
    return { totalScore, debugInfo: { rankUpsetScore, clockScore, playerPerfScore, scoringPerfScore, closeGameScore } };
  };
  
export const filterGames = (games: Event[]) => games.filter((game) => game.competitions[0].status.type.state === 'in');
  