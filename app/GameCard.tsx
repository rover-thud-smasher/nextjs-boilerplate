import { FC } from 'react';
import Image from 'next/image';
import type { Event, CompetitorTeam, Competition, Competitor } from './types';

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
        <div className="flex justify-between font-mono">
            <div className="flex items-center space-x-2 z-10">
                <TeamLogoWithName team={team1.team} />
                <TeamLogoWithName team={team2.team} />
            </div>

            <div className="flex grow flex-col items-center ">
                <h1 className="text-xl font-semibold">
                    {team1.team.abbreviation} vs {team2.team.abbreviation}
                </h1>
                <div className="text-teal-400">
                    {team1.score} - {team2.score}
                </div>
                <div className="text-sm">
                    {comp.status.type.detail}
                </div>
            </div>
        </div>
    );
};

const TeamLogoWithName: FC<{ team: CompetitorTeam }> = ({ team }) => {
    const fallbackLogo = `https://a.espncdn.com/i/teamlogos/default-team-logo-500.png`;
    const logoUrl = team.logo || fallbackLogo;

    return (
        <div className="relative w-14 h-14">
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
    );
};