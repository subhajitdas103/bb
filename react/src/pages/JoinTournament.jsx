
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Search, Check, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const JoinTournament = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock tournaments data
  const availableTournaments = [
    {
      id: 1,
      name: "March Madness 2024",
      description: "NCAA Division I Men's Basketball Tournament",
      participants: 42,
      startDate: "March 19, 2024",
      status: "Active"
    },
    {
      id: 2,
      name: "NBA Playoffs 2024",
      description: "Annual playoff tournament of the National Basketball Association",
      participants: 18,
      startDate: "April 20, 2024",
      status: "Upcoming"
    },
    {
      id: 4,
      name: "MLB World Series",
      description: "Annual championship series of Major League Baseball",
      participants: 12,
      startDate: "October 10, 2024",
      status: "Upcoming"
    },
    {
      id: 5,
      name: "NFL Super Bowl 2025",
      description: "Annual championship game of the National Football League",
      participants: 24,
      startDate: "February 2, 2025",
      status: "Upcoming"
    }
  ];
  
  const filteredTournaments = searchTerm 
    ? availableTournaments.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableTournaments;
  
  const handleJoin = (tournamentId) => {
    toast({
      title: "Tournament Joined",
      description: "You've successfully joined the tournament.",
    });
    navigate(`/tournaments/${tournamentId}`);
  };
  
  const handleTournamentCode = () => {
    toast({
      title: "Join with Code",
      description: "This feature will be available soon.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Join Tournament</h1>
          <p className="text-silver-500">Explore available tournaments and join the competition</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Browse Tournaments</CardTitle>
                <CardDescription>Find a tournament to join and start making predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver-400" />
                  <input
                    type="text"
                    placeholder="Search tournaments..."
                    className="w-full pl-10 py-2 border border-silver-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredTournaments.length > 0 ? (
                    filteredTournaments.map(tournament => (
                      <div key={tournament.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold mb-1">{tournament.name}</h3>
                              <p className="text-sm text-silver-500 mb-2">{tournament.description}</p>
                              <div className="flex items-center text-sm text-silver-600">
                                <span className="mr-4">{tournament.participants} participants</span>
                                <span>Starts: {tournament.startDate}</span>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              tournament.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : tournament.status === 'Upcoming' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {tournament.status}
                            </span>
                          </div>
                        </div>
                        <div className="bg-silver-50 p-3 flex justify-between items-center">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                            View Details
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleJoin(tournament.id)}>
                            <Check className="mr-1 h-4 w-4" />
                            Join Tournament
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-6 border rounded-lg">
                      <p className="text-silver-500">No tournaments found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" /> Join with Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-silver-500 mb-4">
                  Have a tournament code? Enter it below to join a private tournament.
                </p>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter tournament code"
                    className="w-full px-3 py-2 border border-silver-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleTournamentCode}>Join Tournament</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTournament;
