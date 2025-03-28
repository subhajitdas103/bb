
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, Trophy } from 'lucide-react';

const AllEvents = () => {
  // Mock events data
  const events = [
    {
      id: 1,
      name: "March Madness Sweet 16",
      date: "March 23, 2024",
      time: "2:00 PM",
      description: "Round of 16 predictions due",
      tournament: "March Madness 2024",
      tournamentId: 1,
      type: "deadline",
      status: "urgent"
    },
    {
      id: 2,
      name: "March Madness Elite 8",
      date: "March 25, 2024",
      time: "6:00 PM",
      description: "Elite 8 predictions due",
      tournament: "March Madness 2024",
      tournamentId: 1,
      type: "deadline",
      status: "upcoming"
    },
    {
      id: 3,
      name: "NBA Playoffs Begin",
      date: "April 20, 2024",
      time: "12:00 PM",
      description: "NBA Playoffs 2024 tournament begins",
      tournament: "NBA Playoffs 2024",
      tournamentId: 2,
      type: "tournament",
      status: "upcoming"
    },
    {
      id: 4,
      name: "March Madness Final Four",
      date: "March 30, 2024",
      time: "5:00 PM",
      description: "Final Four predictions due",
      tournament: "March Madness 2024",
      tournamentId: 1,
      type: "deadline",
      status: "upcoming"
    },
    {
      id: 5,
      name: "March Madness Championship",
      date: "April 1, 2024",
      time: "8:00 PM",
      description: "Championship predictions due",
      tournament: "March Madness 2024",
      tournamentId: 1,
      type: "deadline",
      status: "upcoming"
    },
    {
      id: 6,
      name: "Office League Draft",
      date: "April 5, 2024",
      time: "1:00 PM",
      description: "NBA Playoffs draft for Office League",
      tournament: "NBA Playoffs 2024",
      tournamentId: 2,
      type: "group",
      status: "upcoming"
    },
    {
      id: 7,
      name: "MLB World Series Start",
      date: "October 10, 2024",
      time: "7:00 PM",
      description: "MLB World Series tournament begins",
      tournament: "MLB World Series",
      tournamentId: 4,
      type: "tournament",
      status: "upcoming"
    }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-silver-100 text-silver-800';
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'deadline':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'tournament':
        return <Trophy className="h-5 w-5 text-purple-500" />;
      case 'group':
        return <Calendar className="h-5 w-5 text-green-500" />;
      default:
        return <Calendar className="h-5 w-5 text-silver-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">All Events</h1>
          <p className="text-silver-500">View all upcoming events and deadlines for your tournaments</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" /> Events Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="border rounded-lg overflow-hidden">
                  <div className="flex items-center p-4 border-b">
                    <div className="mr-4">
                      {getTypeIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.name}</h3>
                      <p className="text-sm text-silver-500">{event.description}</p>
                      <p className="text-sm text-silver-600 mt-1">
                        Tournament: {event.tournament}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-medium">{event.date}</div>
                      <div className="text-sm text-silver-500">{event.time}</div>
                      <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${getStatusColor(event.status)}`}>
                        {event.status === 'urgent' ? 'Due soon' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-silver-50 p-3 flex justify-end">
                    <Button size="sm" asChild>
                      <Link to={`/tournaments/${event.tournamentId}`}>
                        View Tournament
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllEvents;
