'use client'

// import Image from "next/image";

import React, { useEffect, useState, FC } from 'react';
import type { Welcome, Event } from './types';
import { GameCard } from './GameCard';
import { filterGames, getGameScore } from './util';

const fetchGames = async (sport = 'mens-college-basketball'): Promise<Welcome> => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/${sport}/scoreboard`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  const data = await response.json();
  return data as Welcome; // Cast the JSON response to the `Welcome` interface
};

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