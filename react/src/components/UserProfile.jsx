
import React from 'react';
import { ChevronRight } from 'lucide-react';

const UserProfile = ({ user }) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-silver-100 to-silver-50 p-5">
        <div className="flex items-center">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="h-16 w-16 rounded-full border-2 border-white shadow-sm" 
          />
          
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <div className="flex items-center space-x-1">
              <span className={`block h-2 w-2 rounded-full ${user.online ? 'bg-green-400' : 'bg-silver-400'}`}></span>
              <span className="text-sm text-silver-600">{user.memberSince}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-xl font-medium">${user.balance}</p>
            <p className="premium-label">Balance</p>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-medium">{user.winRate}%</p>
            <p className="premium-label">Win Rate</p>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-medium">{user.betsPlaced}</p>
            <p className="premium-label">Bets</p>
          </div>
        </div>
        
        <div className="mt-5 space-y-2">
          <a href="#" className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-silver-50">
            <span className="font-medium">Deposit Funds</span>
            <ChevronRight className="h-4 w-4 text-silver-400" />
          </a>
          
          <a href="#" className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-silver-50">
            <span className="font-medium">Withdraw Funds</span>
            <ChevronRight className="h-4 w-4 text-silver-400" />
          </a>
          
          <a href="#" className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-silver-50">
            <span className="font-medium">Betting History</span>
            <ChevronRight className="h-4 w-4 text-silver-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
