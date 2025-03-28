
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Trophy, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const GroupCard = ({ id, name, members, tournaments, imageUrl }) => {
  return (
    <Card className="hover-lift glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
              <Users className="h-3 w-3" /> {members} members
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">Active tournaments:</p>
        {tournaments.length > 0 ? (
          <ul className="space-y-2">
            {tournaments.slice(0, 2).map((tournament, i) => (
              <li key={i} className="flex items-center justify-between text-sm bg-silver-50 p-2 rounded">
                <span className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-primary" />
                  {tournament}
                </span>
                <ArrowRight className="h-4 w-4 text-silver-400" />
              </li>
            ))}
            {tournaments.length > 2 && (
              <li className="text-sm text-center text-silver-500">
                +{tournaments.length - 2} more tournaments
              </li>
            )}
          </ul>
        ) : (
          <p className="text-sm text-silver-500 italic">No active tournaments</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/groups/${id}`}>View Group</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Groups = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Basketball Fanatics",
      members: 18,
      tournaments: ["March Madness 2024", "NBA Playoffs 2024"],
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 2,
      name: "Office League",
      members: 12,
      tournaments: ["March Madness 2024"],
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 3,
      name: "College Friends",
      members: 8,
      tournaments: ["MLB World Series", "NFL Super Bowl 2025"],
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
      id: 4,
      name: "Sports Enthusiasts",
      members: 24,
      tournaments: [],
      imageUrl: "https://images.unsplash.com/photo-1556005693-00fff02f134c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    }
  ]);
  const [groupCode, setGroupCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });
  
  const handleCreateGroup = () => {
    if (!newGroup.name) {
      toast({
        title: "Missing Information",
        description: "Please provide a group name.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...groups.map(g => g.id)) + 1;
    const createdGroup = {
      id: newId,
      name: newGroup.name,
      description: newGroup.description,
      members: 1, // Start with the creator
      tournaments: [],
      imageUrl: newGroup.imageUrl || "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    };

    setGroups([...groups, createdGroup]);
    setNewGroup({ name: '', description: '', imageUrl: '' });
    setIsCreating(false);

    toast({
      title: "Group Created",
      description: `Successfully created ${createdGroup.name}!`,
    });
  };
  
  const handleJoinGroup = () => {
    if (!groupCode || groupCode.trim() === '') {
      toast({
        title: "Missing Code",
        description: "Please enter a valid group code.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would validate this code against a backend
    // For now, we'll simulate joining a random existing group
    const randomExistingGroup = groups[Math.floor(Math.random() * groups.length)];
    
    toast({
      title: "Group Joined",
      description: `You've successfully joined ${randomExistingGroup.name}!`,
    });
    
    setGroupCode('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Groups</h1>
            <p className="text-silver-500">Participate in tournaments with friends and colleagues</p>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Group</DialogTitle>
                <DialogDescription>
                  Create a group to participate in tournaments with friends, family, or colleagues.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Group Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter group name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your group"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Group Image URL (optional)</Label>
                  <Input 
                    id="imageUrl" 
                    placeholder="Enter image URL"
                    value={newGroup.imageUrl}
                    onChange={(e) => setNewGroup({...newGroup, imageUrl: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button onClick={handleCreateGroup}>Create Group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groups.map(group => (
            <GroupCard key={group.id} id={group.id} {...group} />
          ))}
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Join a Group</h2>
          <Card className="hover-lift glass-card p-6 max-w-lg mx-auto">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-full bg-silver-100 p-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Join an existing group</h3>
                <p className="text-silver-500 mb-4">Enter a group code provided by your friend or group leader</p>
              </div>
              <div className="flex gap-2 w-full max-w-sm">
                <input 
                  type="text" 
                  placeholder="Enter group code" 
                  className="flex-1 px-3 py-2 bg-background border border-silver-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                />
                <Button onClick={handleJoinGroup}>Join</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Groups;
