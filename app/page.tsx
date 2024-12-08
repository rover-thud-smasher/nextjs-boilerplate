'use client'

import { useEffect, useState } from 'react';
import type { Welcome, Event } from './types';
import { filterGames } from './util';
import { HomeComponent } from './HomeComponent';

const fetchGames = async (sport = 'mens-college-basketball'): Promise<Welcome> => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/${sport}/scoreboard`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  const data = await response.json();
  return data as Welcome;
};

export default function Home() {
  const [useMockData, setUseMockData] = useState(false);
  const [collegeGames, setCollegeGames] = useState<Event[]>([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        let gamesData: Event[] = [];

        if (useMockData) {
          const mockData = await fetch('/ncaa-test.json');
          const mockJson: Welcome = await mockData.json() as Welcome;
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

  return HomeComponent({ collegeGames })
}