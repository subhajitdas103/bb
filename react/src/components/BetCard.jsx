
import React from 'react';

const BetCard = ({ match, odds, time, league, teams, logo1, logo2 }) => {
  return (
    <div className="glass-card hover-lift rounded-xl p-4 transition-all duration-300">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-md bg-silver-100 p-1">
            <img src={league.logo} alt={league.name} className="h-4 w-4" />
          </div>
          <span className="ml-2 text-xs font-medium text-silver-600">{league.name}</span>
        </div>
        <div className="flex items-center text-xs text-silver-500">
          <span>{time}</span>
        </div>
      </div>
      
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-1 flex-col space-y-3">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-silver-100">
              <img src={logo1} alt={teams[0]} className="h-5 w-5" />
            </div>
            <span className="ml-3 font-medium">{teams[0]}</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-silver-100">
              <img src={logo2} alt={teams[1]} className="h-5 w-5" />
            </div>
            <span className="ml-3 font-medium">{teams[1]}</span>
          </div>
        </div>
        
        <div className="ml-4 grid grid-cols-3 gap-2">
          <button className="flex h-14 w-16 flex-col items-center justify-center rounded-lg border border-silver-200 bg-white transition-all hover:bg-silver-50 focus:outline-none focus:ring-1 focus:ring-silver-200">
            <span className="text-xs text-silver-600">1</span>
            <span className="mt-1 font-semibold">{odds[0]}</span>
          </button>
          
          <button className="flex h-14 w-16 flex-col items-center justify-center rounded-lg border border-silver-200 bg-white transition-all hover:bg-silver-50 focus:outline-none focus:ring-1 focus:ring-silver-200">
            <span className="text-xs text-silver-600">X</span>
            <span className="mt-1 font-semibold">{odds[1]}</span>
          </button>
          
          <button className="flex h-14 w-16 flex-col items-center justify-center rounded-lg border border-silver-200 bg-white transition-all hover:bg-silver-50 focus:outline-none focus:ring-1 focus:ring-silver-200">
            <span className="text-xs text-silver-600">2</span>
            <span className="mt-1 font-semibold">{odds[2]}</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-between">
        <span className="premium-link text-xs font-medium text-azure-600">
          +{match.marketCount} markets
        </span>
        <button className="premium-link text-xs font-medium text-azure-600">
          Add to Bet Slip
        </button>
      </div>
    </div>
  );
};

export default BetCard;
