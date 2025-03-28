
import React from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const TournamentCard = ({ id, name, startDate, participants, status }) => {
  const { toast } = useToast();
  const statusColor = status === 'Active' 
    ? 'bg-green-100 text-green-800' 
    : status === 'Upcoming' 
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';
      
  const handlePrediction = (e) => {
    e.preventDefault();
    toast({
      title: "Make Prediction",
      description: `You're about to make a prediction for ${name}`,
    });
  };
  
  return (
    <Card className="hover-lift glass-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg md:text-xl">{name}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>{status}</span>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <CalendarDays className="h-4 w-4" />
          {startDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 mr-2 text-silver-500" />
          <Link to={`/tournaments/${id}/participants`} className="text-sm hover:underline">
            {participants} participants
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/tournaments/${id}`}>View Details</Link>
        </Button>
        {status === 'Active' && (
          <Button size="sm" asChild>
            <Link to={`/tournaments/${id}/predict`}>Make Prediction</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Tournaments = () => {
  const { toast } = useToast();
  
  const tournaments = [
    {
      id: 1,
      name: "March Madness 2024",
      startDate: "March 19, 2024",
      participants: 42,
      status: "Active"
    },
    {
      id: 2,
      name: "NBA Playoffs 2024",
      startDate: "April 20, 2024",
      participants: 18,
      status: "Upcoming"
    },
    {
      id: 3,
      name: "World Cup 2023",
      startDate: "November 15, 2023",
      participants: 56,
      status: "Completed"
    },
    {
      id: 4,
      name: "MLB World Series",
      startDate: "October 10, 2024",
      participants: 12,
      status: "Upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Tournaments</h1>
            <p className="text-silver-500">Participate in prediction tournaments and compete with friends</p>
          </div>
          <Button asChild>
            <Link to="/join-tournament">
              <Trophy className="mr-2 h-4 w-4" />
              Join Tournament
            </Link>
          </Button>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Featured Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.filter(t => t.status === 'Active').map(tournament => (
              <TournamentCard key={tournament.id} {...tournament} />
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.filter(t => t.status === 'Upcoming').map(tournament => (
              <TournamentCard key={tournament.id} {...tournament} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.filter(t => t.status === 'Completed').map(tournament => (
              <TournamentCard key={tournament.id} {...tournament} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournaments;
