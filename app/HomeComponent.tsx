'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import type { Event } from './types';
import { GameCard } from './GameCard';
import { getGameScore } from './util';
import React, { FC, useState, useEffect } from 'react';

const Nav: FC = () => (
  <nav className="flex items-center justify-center flex-wrap mx-auto p-2 ">
    <span className={"font-semibold text-xl tracking-tight"}>Tier Rank Live Sports</span>
  </nav>
);

const GameList: FC<({ children: React.ReactNode })> = ({ children }) => (
  <div className="max-w mx-auto divide-y">{children}</div>
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
    <>
      <Nav />
      <GameList>
        {collegeGames.map((game) => {
          const { totalScore, debugInfo } = getGameScore(game);
          return <GameCard key={game.id} game={game} totalScore={totalScore} debugInfo={debugInfo} />;
        })}
      </GameList>
      <footer>
        {collegeGames.length === 0 && <h2 className="text-lg font-semibold">No live games.</h2>}
        <button
          type='button'
          onClick={() => handleNavItemClick('mens-college-basketball', !useMockData)}
        >
          Mock
        </button>
      </footer>
    </>
  );
};
