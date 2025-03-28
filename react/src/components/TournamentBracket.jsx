
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const MatchCard = ({ team1, team2, winner, round }) => {
  return (
    <div className="mb-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div 
            className={`p-3 flex justify-between items-center border-b ${
              winner === team1.name ? 'bg-green-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center bg-silver-100 rounded mr-2 text-xs font-semibold">
                {team1.seed}
              </div>
              <span className={`${winner === team1.name ? 'font-bold' : ''}`}>{team1.name}</span>
            </div>
            <span className="font-semibold">{team1.score}</span>
          </div>
          <div 
            className={`p-3 flex justify-between items-center ${
              winner === team2.name ? 'bg-green-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center bg-silver-100 rounded mr-2 text-xs font-semibold">
                {team2.seed}
              </div>
              <span className={`${winner === team2.name ? 'font-bold' : ''}`}>{team2.name}</span>
            </div>
            <span className="font-semibold">{team2.score}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BracketConnector = ({ direction }) => {
  return (
    <div className={`flex flex-col justify-center h-full ${direction === 'right' ? 'items-start' : 'items-end'}`}>
      <div className={`border-t border-b border-${direction} h-1/2 w-3 border-silver-300`}></div>
      <div className={`border-t border-b border-${direction} h-1/2 w-3 border-silver-300`}></div>
    </div>
  );
};

const TournamentBracket = ({ rounds }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-[900px] py-4">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="flex-1">
            <h3 className="text-center font-semibold mb-4">{round.name}</h3>
            <div className="flex flex-col justify-around h-full">
              {round.matches.map((match, matchIndex) => (
                <div key={matchIndex} className="flex items-center">
                  <div className="flex-1">
                    <MatchCard {...match} round={roundIndex} />
                  </div>
                  {roundIndex < rounds.length - 1 && (
                    <div className="w-3">
                      {matchIndex % 2 === 0 ? (
                        <BracketConnector direction="right" />
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;
