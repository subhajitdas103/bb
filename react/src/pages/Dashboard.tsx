
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from "@/components/ui/button";
import { TrendingUp, Trophy, Users, Calendar } from 'lucide-react';
import StatisticCard from '../components/StatisticCard';

const Dashboard = () => {
  const stats = [
    {
      title: "Active Tournaments",
      value: "3",
      change: "+1",
      icon: Trophy,
      increasing: true
    },
    {
      title: "Your Groups",
      value: "4",
      change: "+2",
      icon: Users,
      increasing: true
    },
    {
      title: "Prediction Accuracy",
      value: "68%",
      change: "+5%",
      icon: TrendingUp,
      increasing: true
    },
    {
      title: "Upcoming Deadlines",
      value: "2",
      change: "-1",
      icon: Calendar,
      increasing: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "March Madness Sweet 16",
      date: "March 23, 2024",
      time: "2:00 PM",
      status: "Prediction due soon"
    },
    {
      id: 2,
      name: "March Madness Elite 8",
      date: "March 25, 2024",
      time: "6:00 PM",
      status: "Upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Welcome to BetterBracket</h1>
            <p className="text-silver-600 max-w-2xl mx-auto mb-8">
              Predict tournament outcomes, compete with friends, and track your performance in real-time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/tournaments">
                  <Trophy className="mr-2 h-5 w-5" />
                  Browse Tournaments
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/groups">
                  <Users className="mr-2 h-5 w-5" />
                  My Groups
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6">Your Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, Dashboard) => (
              <StatisticCard
                key={Dashboard}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                increasing={stat.increasing}
              />
            ))}
          </div>
        </div>
        
        {/* Upcoming Events Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button variant="outline" asChild size="sm">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-silver-200 overflow-hidden">
            {upcomingEvents.map((event, Dashboard) => (
              <div 
                key={event.id} 
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between ${
                  Dashboard < upcomingEvents.length - 1 ? 'border-b border-silver-200' : ''
                }`}
              >
                <div className="mb-3 sm:mb-0">
                  <h3 className="font-medium">{event.name}</h3>
                  <p className="text-silver-500 text-sm">{`${event.date} • ${event.time}`}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm px-3 py-1 rounded-full mr-3 ${
                    event.status === 'Prediction due soon' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {event.status}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/tournaments/1/predict">Make Prediction</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Tournaments Section */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Tournaments</h2>
            <Button variant="outline" asChild size="sm">
              <Link to="/tournaments">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card hover-lift rounded-xl overflow-hidden">
              <div className="relative h-40">
                <img 
                  // src="https://images.unsplash.com/photo-1574027057394-4a6af8e2b58e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="March Madness" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">March Madness 20214</h3>
                    <p className="text-sm opacity-90">42 participants</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Active
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-silver-600">Round 2 predictions due in 2 days</span>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/tournaments/1/predict">Make Prediction</Link>
                </Button>
              </div>
            </div>
            
            <div className="glass-card hover-lift rounded-xl overflow-hidden">
              <div className="relative h-40">
                <img 
                  src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="NBA Playoffs" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">NBA Playoffs 2024</h3>
                    <p className="text-sm opacity-90">18 participants</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Upcoming
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-silver-600">Starts on April 20, 2024</span>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/join-tournament">Join Tournament</Link>
                </Button>
              </div>
            </div>
            
            <div className="glass-card hover-lift rounded-xl overflow-hidden">
              <div className="relative h-40">
                <img 
                  src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="MLB World Series" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">MLB World Series</h3>
                    <p className="text-sm opacity-90">12 participants</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Upcoming
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-silver-600">Starts on October 10, 2024</span>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/join-tournament">Join Tournament</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
