'use client'

// import Image from "next/image";

import React, { useEffect, useState, FC } from 'react';
import type { Welcome, Event, CompetitorLeader } from './types';

const POWER_CONFERENCES = ['2', '4', '8', '23'];

const fetchGames = async (sport = 'mens-college-basketball'): Promise<Welcome> => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/${sport}/scoreboard`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  const data = await response.json();
  return data as Welcome; // Cast the JSON response to the `Welcome` interface
};

const formatStartDate = (startDateStr: string): string => {
  const date = new Date(startDateStr);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Los_Angeles", // Pacific Time zone
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const getGameScore = (game: Event, isNBA = false) => {
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

    let playerPerfScore = 0;

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

const filterGames = (games: Event[]) => games.filter((game) => game.competitions[0].status.type.state === 'in');

const Nav: FC<({ children: React.ReactNode })> = ({ children }) => (
  <nav className="flex items-center justify-between flex-wrap py-4 px-6 text-sm font-medium">
    <span className={"font-semibold text-xl tracking-tight"}>Scurfer - Live Game Tiering</span>
    <ul className="flex space-x-3">
      {children}
    </ul>
  </nav>
);

const NavItem: FC<{ isActive: boolean; children: React.ReactNode }> = ({ isActive, children }) => (
  <li>
    <a
      className={`block px-3 py-2 rounded-md ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}
    >
      {children}
    </a>
  </li>
);

const GameList: FC<({ children: React.ReactNode })> = ({ children }) => (
  <div className="divide-y divide-slate-100">{children}</div>
);

const GameCard: FC<{ game: Event; totalScore: number; debugInfo: any }> = ({ game, totalScore, debugInfo }) => {
  const comp = game.competitions[0];
  const team1 = comp.competitors[0];
  const team2 = comp.competitors[1];

  return (
    <div className="p-4 bg-white shadow-sm rounded-lg mb-4">
      <h2 className="text-lg font-semibold">
        {game.name} - Watchability Score: <span className="text-blue-600">{totalScore}</span>
      </h2>
      <p className="text-sm text-gray-600">
        <strong>Scores:</strong> {team2.score} vs {team1.score}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Time Remaining:</strong> {comp.status.type.detail}, <strong>Start Date:</strong> {formatStartDate(comp.startDate)}
      </p>
      <div className="text-xs mt-2 text-gray-500">
        <strong>Debug Info:</strong> {JSON.stringify(debugInfo)}
      </div>
    </div>
  );
};

export default function Home() {
  const [useMockData, setUseMockData] = useState(false);
  const [collegeGames, setCollegeGames] = useState<Event[]>([]); // Define state to use the `Event` type

  useEffect(() => {
    const loadGames = async () => {
      try {
        let gamesData: Event[] = [];

        if (useMockData) {
          const mockData = await fetch('/ncaa-test.json');
          const mockJson: Welcome = await mockData.json() as Welcome; // Cast mock data to `Welcome`
          gamesData = mockJson.events || [];
        } else {
          const liveData = await fetchGames('mens-college-basketball');
          gamesData = liveData.events || [];
        }

        const filteredGames = filterGames(gamesData);
        setCollegeGames(filteredGames);
      } catch (error) {
        console.error('Error fetching games:', error);
        setCollegeGames([]);
      }
    };

    loadGames();
  }, [useMockData]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Nav>
        <NavItem isActive={true}>
          College Basketball
        </NavItem>
        <NavItem isActive={false}>NBA</NavItem>
      </Nav>
      <GameList>
        {collegeGames.map((game) => {
          const { totalScore, debugInfo } = getGameScore(game);
          return <GameCard key={game.id} game={game} totalScore={totalScore} debugInfo={debugInfo} />;
        })}
      </GameList>
      <footer>
        {collegeGames.length === 0 && <h2 className="text-lg font-semibold">No live games.</h2>}
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 rounded border-gray-300"
            checked={useMockData}
            onChange={(e) => setUseMockData(e.target.checked)}
          />
          <span className="text-sm text-gray-600">Use Mock Data</span>
        </label>
      </footer>
    </div>
  );
}