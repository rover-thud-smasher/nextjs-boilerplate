import { FC } from 'react';
import Image from 'next/image';
import type { Event, CompetitorTeam, Competition, Competitor } from './types';

const formatStartDate = (startDateStr: string): string => {
    const date = new Date(startDateStr);
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
};

interface DebugInfo {
    rankUpsetScore: number;
    clockScore: number;
    playerPerfScore: number;
    scoringPerfScore: number;
    closeGameScore: number;
}

export const GameCard: FC<{ game: Event; totalScore: number; debugInfo: DebugInfo }> = ({ game, totalScore, debugInfo }) => {
    const comp = game.competitions[0] as Competition;
    const team1 = comp.competitors[0] as Competitor;
    const team2 = comp.competitors[1] as Competitor;

    return (
        <div className="p-4 bg-white shadow-sm rounded-lg mb-4">
            <div className="flex items-center justify-between">
                <TeamLogoWithName team={team1.team} />
                <span className="text-xl font-bold mx-4">vs</span>
                <TeamLogoWithName team={team2.team} isReversed={true} />
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">
                <strong>Watchability:</strong>  <span className="text-blue-600">{totalScore}</span>
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
                <strong>Scores:</strong> {team2.score} - {team1.score}
            </p>
            <p className="text-sm text-gray-600 text-center">
                <strong>Time Remaining:</strong> {comp.status.type.detail}, <strong>Start Time:</strong> {formatStartDate(comp.startDate)}
            </p>
            <div className="text-xs mt-2 text-gray-500 text-center">
                <strong>Debug Info:</strong> {JSON.stringify(debugInfo)}
            </div>
        </div>
    );
};

const TeamLogoWithName: FC<{ team: CompetitorTeam; isReversed?: boolean }> = ({ team, isReversed = false }) => {
    // Fallback logo URL if no logo is provided
    const fallbackLogo = `https://a.espncdn.com/i/teamlogos/default-team-logo-500.png`;
    console.warn(team.logo);
    const logoUrl = team.logo || fallbackLogo;

    return (
        <div className={`flex flex-col items-center ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="relative w-16 h-16 mx-2">
                <Image 
                    src={logoUrl} 
                    alt={`${team.displayName} logo`} 
                    fill 
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackLogo;
                    }}
                />
            </div>
            <div className="text-sm font-semibold text-gray-700">
                {team.displayName}
            </div>
        </div>
    );
};