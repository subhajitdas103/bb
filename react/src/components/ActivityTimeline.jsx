
import React from 'react';

const ActivityTimeline = ({ activities }) => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="mb-4 text-lg font-medium">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-start space-x-4">
              <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${activity.iconBg}`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{activity.title}</p>
                  <span className="text-xs text-silver-500">{activity.time}</span>
                </div>
                
                <p className="text-sm text-silver-600">{activity.description}</p>
                
                {activity.status && (
                  <div className="mt-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      activity.status === "Won" 
                        ? "bg-green-100 text-green-800" 
                        : activity.status === "Lost" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {index < activities.length - 1 && (
              <div className="relative mt-4 ml-4.5 pl-4">
                <div className="absolute bottom-0 left-0 top-0 w-px bg-silver-200"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="premium-link text-sm font-medium text-silver-600">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default ActivityTimeline;
