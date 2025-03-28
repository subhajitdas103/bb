
import React, { useState } from 'react';

const PlaceBetForm = () => {
  const [stake, setStake] = useState('10.00');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const odds = 2.5;
  const potentialWin = parseFloat(stake || 0) * odds;
  
  const quickStakes = [5, 10, 25, 50, 100];
  
  return (
    <div className="glass-card rounded-xl">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Bet Slip</h3>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-silver-500 hover:text-silver-700"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-3 rounded-lg border border-silver-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Arsenal vs. Chelsea</p>
                <p className="text-sm text-silver-600">Winner: Arsenal</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{odds}</p>
                <button className="text-xs text-red-500">Remove</button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <label htmlFor="stake" className="premium-label">
            Your Stake
          </label>
          <div className="mt-1 flex">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-silver-500">$</span>
              </div>
              <input
                type="text"
                id="stake"
                value={stake}
                onChange={e => setStake(e.target.value)}
                className="block w-full rounded-lg border border-silver-200 pl-7 pr-12 py-2 focus:border-azure-300 focus:ring focus:ring-azure-200 focus:ring-opacity-50"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="mt-3 flex space-x-2">
            {quickStakes.map(value => (
              <button
                key={value}
                className="flex-1 rounded-md border border-silver-200 py-1 text-sm transition-all duration-200 hover:bg-silver-50"
                onClick={() => setStake(value.toString())}
              >
                ${value}
              </button>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between bg-silver-50 rounded-lg p-3">
            <span className="text-sm">Potential Win:</span>
            <span className="font-medium">${potentialWin.toFixed(2)}</span>
          </div>
          
          <button className="mt-4 premium-button w-full bg-azure-600 text-white hover:bg-azure-500 font-medium py-3 rounded-lg transition-colors">
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceBetForm;
