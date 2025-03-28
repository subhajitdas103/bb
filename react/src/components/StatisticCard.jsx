
import React from 'react';

const StatisticCard = ({ title, value, change, icon: Icon, increasing }) => {
  return (
    <div className="glass-card hover-lift rounded-xl p-5 transition-all duration-300">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="premium-label">{title}</h3>
        <div className={`rounded-full ${increasing ? 'bg-green-50' : 'bg-red-50'} p-2`}>
          <Icon 
            className={`h-4 w-4 ${increasing ? 'text-green-500' : 'text-red-500'}`} 
          />
        </div>
      </div>
      
      <div className="mb-2">
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      
      <div className="flex items-center">
        <span 
          className={`text-sm font-medium ${
            increasing ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {change}
        </span>
        <span className="ml-1 text-sm text-silver-500">from last month</span>
      </div>
    </div>
  );
};

export default StatisticCard;
