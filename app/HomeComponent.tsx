'use client'

import React, { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Event } from './types';
import { GameCard } from './GameCard';
import { getGameScore } from './util';

const Nav: FC<({ children: React.ReactNode })> = ({ children }) => (
  <nav className="flex items-center justify-between flex-wrap py-4 px-6 text-sm font-medium">
    <span className={"font-semibold text-xl tracking-tight"}>Scurfer - Live Game Tiering</span>
    <ul className="flex space-x-3">
      {children}
    </ul>
  </nav>
);

const NavItem: FC<{
  isActive: boolean; children: React.ReactNode; onClick?: () => void;
}> = ({ isActive, children, onClick }) => (
  <li>
    <a
      onClick={onClick}
      className={`block px-3 py-2 rounded-md ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}
    >
      {children}
    </a>
  </li>
);

const GameList: FC<({ children: React.ReactNode })> = ({ children }) => (
  <div className="space-y-4 divide-slate-100">{children}</div>
);

export const HomeComponent: FC<({ collegeGames: Event[] })> = ({ collegeGames }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const useMockData = searchParams.get('useMockData') === 'true';

  const handleNavItemClick = (sport: string, mockData: boolean) => {
    if (mockData) {
      const params = new URLSearchParams(searchParams);
      params.set('useMockData', mockData.toString());
      router.push(`?${params.toString()}`);
    } else {
      router.push(window.location.pathname);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Nav>
        <NavItem
          isActive={!useMockData}
          onClick={() => handleNavItemClick('mens-college-basketball', false)}
        >
          College Basketball
        </NavItem>
        <NavItem
          isActive={useMockData}
          onClick={() => handleNavItemClick('mens-college-basketball', true)}
        >
          Mock
        </NavItem>
      </Nav>
      <GameList>
        {collegeGames.map((game) => {
          const { totalScore, debugInfo } = getGameScore(game);
          return <GameCard key={game.id} game={game} totalScore={totalScore} debugInfo={debugInfo} />;
        })}
      </GameList>
      <footer>
        {collegeGames.length === 0 && <h2 className="text-lg font-semibold">No live games.</h2>}
      </footer>
    </div>
  );
};
