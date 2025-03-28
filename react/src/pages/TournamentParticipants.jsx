
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, Medal, Trophy } from 'lucide-react';

const TournamentParticipants = () => {
  const { id } = useParams();
  
  // Mock tournament data
  const tournament = {
    id: parseInt(id),
    name: "March Madness 2024",
    participants: [
      { id: 1, name: "John Doe", avatar: "JD", group: "Basketball Fanatics", correctPredictions: 18, rank: 1, imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 2, name: "Sarah Johnson", avatar: "SJ", group: "Basketball Fanatics", correctPredictions: 16, rank: 2, imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 3, name: "Mike Chen", avatar: "MC", group: "Office League", correctPredictions: 15, rank: 3, imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 4, name: "Alex Thompson", avatar: "AT", group: "College Friends", correctPredictions: 14, rank: 4, imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 5, name: "Emma Wilson", avatar: "EW", group: "Basketball Fanatics", correctPredictions: 12, rank: 5, imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 6, name: "David Brown", avatar: "DB", group: "Office League", correctPredictions: 11, rank: 6, imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 7, name: "Lisa Garcia", avatar: "LG", group: "College Friends", correctPredictions: 10, rank: 7, imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 8, name: "Ryan Miller", avatar: "RM", group: "Office League", correctPredictions: 8, rank: 8, imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    groups: [
      { name: "Basketball Fanatics", count: 3 },
      { name: "Office League", count: 3 },
      { name: "College Friends", count: 2 }
    ]
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-6">
          <Link to={`/tournaments/${id}`} className="inline-flex items-center text-silver-600 hover:text-silver-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tournament
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Tournament Participants</h1>
              <p className="text-silver-500">{tournament.name} - {tournament.participants.length} participants</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" /> Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-silver-500">Rank</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-silver-500">Participant</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-silver-500">Group</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-silver-500">Correct Predictions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournament.participants.map((participant) => (
                        <tr key={participant.id} className="border-b hover:bg-silver-50">
                          <td className="px-4 py-3 text-left">
                            {participant.rank <= 3 ? (
                              <div className="flex items-center justify-center w-8 h-8">
                                <Medal className={`h-6 w-6 ${
                                  participant.rank === 1 
                                    ? 'text-yellow-500' 
                                    : participant.rank === 2 
                                      ? 'text-silver-400' 
                                      : 'text-amber-700'
                                }`} />
                              </div>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium bg-silver-100 text-silver-800">
                                {participant.rank}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-left">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={participant.imageUrl} />
                                <AvatarFallback>{participant.avatar}</AvatarFallback>
                              </Avatar>
                              <span>{participant.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-left">{participant.group}</td>
                          <td className="px-4 py-3 text-right font-semibold">{participant.correctPredictions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" /> Top Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tournament.groups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-silver-50 rounded-lg">
                      <span className="font-medium">{group.name}</span>
                      <span className="text-sm text-silver-600">{group.count} members</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" /> Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-silver-600">Total Participants</span>
                    <span className="font-medium">{tournament.participants.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-silver-600">Active Groups</span>
                    <span className="font-medium">{tournament.groups.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-silver-600">Avg. Correct Predictions</span>
                    <span className="font-medium">
                      {(tournament.participants.reduce((sum, p) => sum + p.correctPredictions, 0) / tournament.participants.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentParticipants;
