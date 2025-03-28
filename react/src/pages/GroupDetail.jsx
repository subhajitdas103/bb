
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Users, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GroupDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Mock data for the group
  const group = {
    id: parseInt(id),
    name: "Basketball Fanatics",
    description: "A group for basketball enthusiasts to predict tournament outcomes and compete for the top spot on the leaderboard.",
    members: [
      { id: 1, name: "John Doe", role: "Group Leader", avatar: "JD", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 2, name: "Sarah Johnson", role: "Member", avatar: "SJ", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 3, name: "Mike Chen", role: "Member", avatar: "MC", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 4, name: "Alex Thompson", role: "Member", avatar: "AT", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: 5, name: "Emma Wilson", role: "Member", avatar: "EW", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    tournaments: [
      { id: 1, name: "March Madness 2024", status: "Active", participants: 42 },
      { id: 2, name: "NBA Playoffs 2024", status: "Upcoming", participants: 18 }
    ]
  };

  const handleInvite = () => {
    toast({
      title: "Invitation sent",
      description: "Your invitation has been sent successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-6">
          <Link to="/groups" className="inline-flex items-center text-silver-600 hover:text-silver-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Groups
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{group.name}</h1>
              <p className="text-silver-500">{group.description}</p>
            </div>
            <Button onClick={handleInvite}>Invite Members</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" /> Active Tournaments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.tournaments.map((tournament) => (
                    <div key={tournament.id} className="flex items-center justify-between bg-silver-50 p-4 rounded-lg">
                      <div>
                        <h3 className="font-medium">{tournament.name}</h3>
                        <div className="flex items-center text-sm text-silver-500">
                          <Users className="h-4 w-4 mr-1" /> {tournament.participants} participants
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
                        </Button>
                        {tournament.status === 'Active' && (
                          <Button size="sm" asChild>
                            <Link to={`/tournaments/${tournament.id}/predict`}>Make Prediction</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/tournaments">Browse More Tournaments</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" /> Members ({group.members.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={member.imageUrl} alt={member.name} />
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-silver-500">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleInvite}>Invite Members</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
