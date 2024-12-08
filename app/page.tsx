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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const useMockData = (await searchParams).useMockData === 'true';

  let collegeGames: Event[];
  try {
    let gamesData: Event[] = [];

    if (useMockData) {
      const { default: mockData } = await import('./ncaa-test.json');
      const mockJson: Welcome = mockData as Welcome;
      gamesData = mockJson.events || [];
    } else {
      const liveData = await fetchGames('mens-college-basketball');
      gamesData = liveData.events || [];
    }

    collegeGames = filterGames(gamesData);
  } catch (error) {
    collegeGames = [];
    console.error('Error fetching games:', error);
  }
  return <HomeComponent collegeGames={collegeGames} />;
}