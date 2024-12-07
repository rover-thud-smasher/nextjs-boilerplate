import React, { useEffect, useState, FC } from 'react';
import type { Welcome, Event, CompetitorLeader } from './types';

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

interface DebugInfo {
    rankUpsetScore: number;
    clockScore: number;
    playerPerfScore: number;
    scoringPerfScore: number;
    closeGameScore: number;
}

export const GameCard: FC<{ game: Event; totalScore: number; debugInfo: DebugInfo }> = ({ game, totalScore, debugInfo }) => {
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