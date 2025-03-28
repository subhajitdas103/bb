
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TournamentBracket from '../components/TournamentBracket';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Info, Users, Trophy, CheckCircle, ChevronRight } from 'lucide-react';

const TournamentDetail = () => {
  const { id } = useParams();
  const [selectedRound, setSelectedRound] = useState('current');
  
  // Mock data for the tournament
  const tournament = {
    id: parseInt(id),
    name: "March Madness 2024",
    description: "NCAA Division I Men's Basketball Tournament",
    status: "Active",
    currentRound: "Sweet 16",
    startDate: "March 19, 2024",
    endDate: "April 8, 2024",
    participants: 42,
    groups: ["Basketball Fanatics", "Office League"],
    rounds: [
      {
        name: "Round 1 (64)",
        matches: [
          {
            team1: { name: "Duke", seed: 1, score: 78 },
            team2: { name: "Vermont", seed: 16, score: 63 },
            winner: "Duke"
          },
          {
            team1: { name: "Virginia", seed: 8, score: 59 },
            team2: { name: "Colorado", seed: 9, score: 62 },
            winner: "Colorado"
          },
          {
            team1: { name: "Wisconsin", seed: 5, score: 71 },
            team2: { name: "Colgate", seed: 12, score: 60 },
            winner: "Wisconsin"
          },
          {
            team1: { name: "Illinois", seed: 4, score: 85 },
            team2: { name: "Morehead St", seed: 13, score: 69 },
            winner: "Illinois"
          }
        ]
      },
      {
        name: "Round 2 (32)",
        matches: [
          {
            team1: { name: "Duke", seed: 1, score: 76 },
            team2: { name: "Colorado", seed: 9, score: 64 },
            winner: "Duke"
          },
          {
            team1: { name: "Wisconsin", seed: 5, score: 68 },
            team2: { name: "Illinois", seed: 4, score: 72 },
            winner: "Illinois"
          }
        ]
      },
      {
        name: "Sweet 16",
        matches: [
          {
            team1: { name: "Duke", seed: 1, score: 0 },
            team2: { name: "Illinois", seed: 4, score: 0 },
            winner: ""
          }
        ]
      }
    ],
    leaderboard: [
      { rank: 1, name: "Sarah Johnson", avatar: "SJ", points: 48, accuracy: "78%" },
      { rank: 2, name: "Mike Chen", avatar: "MC", points: 46, accuracy: "75%" },
      { rank: 3, name: "Alex Thompson", avatar: "AT", points: 42, accuracy: "72%" },
      { rank: 4, name: "John Doe", avatar: "JD", points: 38, accuracy: "65%" },
      { rank: 5, name: "Emma Wilson", avatar: "EW", points: 36, accuracy: "62%" }
    ]
  };
  
  // Prepare data for the bracket visualization
  const bracketRounds = tournament.rounds;
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        {/* Tournament Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{tournament.name}</h1>
              <p className="text-silver-500">{tournament.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/tournaments/${id}/participants`}>
                  <Users className="mr-2 h-4 w-4" />
                  View Participants
                </Link>
              </Button>
              {tournament.status === 'Active' && (
                <Button asChild>
                  <Link to={`/tournaments/${id}/predict`}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Make Prediction
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-silver-500">Status</p>
                  <p className="font-medium">{tournament.status}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="rounded-full bg-purple-100 p-2 mr-3">
                  <Trophy className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-silver-500">Current Round</p>
                  <p className="font-medium">{tournament.currentRound}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="rounded-full bg-amber-100 p-2 mr-3">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-silver-500">Tournament Dates</p>
                  <p className="font-medium">{tournament.startDate} - {tournament.endDate}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-silver-500">Participants</p>
                  <Link to={`/tournaments/${id}/participants`} className="font-medium hover:underline">
                    {tournament.participants} users
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tournament Content */}
        <Tabs defaultValue="bracket">
          <TabsList className="mb-6">
            <TabsTrigger value="bracket">Bracket</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="predictions">My Predictions</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bracket" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Bracket</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex space-x-2 mb-4">
                    <Button 
                      variant={selectedRound === 'all' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedRound('all')}
                    >
                      All Rounds
                    </Button>
                    <Button 
                      variant={selectedRound === 'current' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedRound('current')}
                    >
                      Current Round
                    </Button>
                  </div>
                </div>
                <TournamentBracket rounds={bracketRounds} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-silver-500">Rank</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-silver-500">User</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-silver-500">Points</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-silver-500">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournament.leaderboard.map((user) => (
                        <tr key={user.rank} className="border-b hover:bg-silver-50">
                          <td className="px-4 py-3 text-left">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                              user.rank <= 3 ? 'bg-amber-100 text-amber-800' : 'bg-silver-100 text-silver-800'
                            }`}>
                              {user.rank}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-left">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                                <AvatarFallback>{user.avatar}</AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold">{user.points}</td>
                          <td className="px-4 py-3 text-right">{user.accuracy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/tournaments/${id}/participants`}>View Full Leaderboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="predictions">
            <Card>
              <CardHeader>
                <CardTitle>My Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tournament.rounds.map((round, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between bg-silver-50 px-4 py-3 border-b">
                        <h3 className="font-medium">{round.name}</h3>
                        <div className="flex items-center">
                          {index === 2 ? (
                            <span className="text-sm text-amber-600 font-medium">Prediction due in 2 days</span>
                          ) : index < 2 ? (
                            <span className="text-sm text-green-600 font-medium flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" /> Completed
                            </span>
                          ) : (
                            <span className="text-sm text-silver-500">Not yet available</span>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        {index <= 2 ? (
                          <Button className="w-full" variant={index === 2 ? 'default' : 'outline'} asChild>
                            <Link to={index === 2 ? `/tournaments/${id}/predict` : `#`}>
                              {index === 2 ? 'Make Prediction' : 'View Prediction'}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        ) : (
                          <Button className="w-full" disabled>
                            Predictions not open yet
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Scoring System</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><span className="font-medium">Round of 64:</span> 2 points for each correct pick</li>
                      <li><span className="font-medium">Round of 32:</span> Points equal to seed value of correct winners</li>
                      <li><span className="font-medium">Sweet 16:</span> 8 points for each correct pick</li>
                      <li><span className="font-medium">Elite 8:</span> 
                        <ul className="list-disc pl-5 mt-1">
                          <li>1-5 seed: 10 points</li>
                          <li>6-10 seed: 15 points</li>
                          <li>11+ seed: 20 points</li>
                        </ul>
                      </li>
                      <li><span className="font-medium">Final Four:</span> 12 points for each correct pick</li>
                      <li><span className="font-medium">Championship:</span> 24 points for correct winner</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prediction Deadlines</h3>
                    <p className="mb-2">All predictions must be submitted before the start of the first game of each round.</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><span className="font-medium">Round of 64:</span> March 19, 2024 at 12:00 PM ET</li>
                      <li><span className="font-medium">Round of 32:</span> March 23, 2024 at 11:00 AM ET</li>
                      <li><span className="font-medium">Sweet 16:</span> March 28, 2024 at 6:00 PM ET</li>
                      <li><span className="font-medium">Elite 8:</span> March 30, 2024 at 5:30 PM ET</li>
                      <li><span className="font-medium">Final Four:</span> April 6, 2024 at 5:00 PM ET</li>
                      <li><span className="font-medium">Championship:</span> April 8, 2024 at 8:00 PM ET</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetail;
