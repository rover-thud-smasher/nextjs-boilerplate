import { FC } from 'react';
import Image from 'next/image';
import type { Event, CompetitorTeam, Competition, Competitor } from './types';

const formatStartDate = (startDateStr: string): string => {
    const date = new Date(startDateStr);
    const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Los_Angeles", // Pacific Time zone
        hour: 'numeric',
        minute: '2-digit',
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
        <div className="flex font-mono p-6 shadow-lg">
            {/* Team Logos Container */}
            <div className="flex-none w-48 mb-36 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
                <div className="absolute z-10 inset-0 flex items-center justify-center">
                    <div className="flex space-x-4">
                        <TeamLogoWithName team={team1.team} />
                        <TeamLogoWithName team={team2.team} />
                    </div>
                </div>
            </div>

            {/* Game Details */}
            <div className="flex-auto pl-6">
                {/* Header Section */}
                <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
                    <h1 className="relative w-full flex-none mb-2 text-xl font-semibold text-white">
                        {team1.team.displayName} vs {team2.team.displayName}
                    </h1>
                    <div className="relative text-lg text-white">
                        Score: <span className="text-teal-400">{team1.score} - {team2.score}</span>
                    </div>
                    <div className="relative text-lg text-white">
                        , Time: <span className="text-teal-400">{comp.status.type.detail}</span>
                    </div>
                </div>

                {/* Actions and Additional Info */}
                <div className="flex space-x-2 mb-4 text-sm font-medium">
                    <button 
                        className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black" 
                        type="button"
                    >
                        Watch Game
                    </button>
                    <button 
                        className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900" 
                        type="button"
                    >
                        More Details
                    </button>
                </div>

                {/* Debug Information */}
                <p className="text-xs leading-6 text-slate-500">
                    Debug: Watchability: {totalScore.toFixed()},
                    Start: {formatStartDate(comp.startDate)} (Pacific),
                    Rank Upset: {debugInfo.rankUpsetScore}, 
                    Clock: {debugInfo.clockScore}, 
                    Player Perf: {debugInfo.playerPerfScore}
                </p>
            </div>
        </div>
    );
};

const TeamLogoWithName: FC<{ team: CompetitorTeam }> = ({ team }) => {
    const fallbackLogo = `https://a.espncdn.com/i/teamlogos/default-team-logo-500.png`;
    const logoUrl = team.logo || fallbackLogo;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
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
        </div>
    );
};