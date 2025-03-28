
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Trophy, UserCog, Plus, PencilLine } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data for admin dashboard
  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: "Jane Cooper", email: "jane@example.com", role: "User", status: "Active", joined: "2 days ago" },
    { id: 2, name: "Wade Warren", email: "wade@example.com", role: "Admin", status: "Active", joined: "5 days ago" },
    { id: 3, name: "Esther Howard", email: "esther@example.com", role: "User", status: "Inactive", joined: "1 week ago" },
    { id: 4, name: "Cameron Williams", email: "cameron@example.com", role: "User", status: "Active", joined: "2 weeks ago" },
  ]);

  const stats = [
    { title: "Total Users", value: "1,284", icon: Users, change: "+12%" },
    { title: "Active Tournaments", value: "32", icon: Trophy, change: "+6%" },
    { title: "Admin Users", value: "8", icon: UserCog, change: "+3%" },
  ];

  // Tournament creation form
  const form = useForm({
    defaultValues: {
      name: "",
      sport: "",
      format: "",
      startDate: "",
      teams: "",
    },
  });

  // User edit form
  const userForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      status: "",
    },
  });

  const onSubmit = (data) => {
    // In a real application, this would send the data to your backend
    console.log("Tournament data submitted:", data);
    
    // Show success toast
    toast({
      title: "Tournament Created",
      description: `${data.name} has been successfully created.`,
    });
    
    // Reset form and close dialog
    form.reset();
    setIsDialogOpen(false);
  };

  const onUserEditSubmit = (data) => {
    // In a real application, this would update the user in your backend
    console.log("User update submitted:", data);
    
    // Update the user in our mock data
    const updatedUsers = recentUsers.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...data } 
        : user
    );
    
    setRecentUsers(updatedUsers);
    
    // Show success toast
    toast({
      title: "User Updated",
      description: `${data.name}'s information has been successfully updated.`,
    });
    
    // Reset form and close dialog
    userForm.reset();
    setIsEditUserDialogOpen(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    userForm.reset({
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      status: user.status.toLowerCase(),
    });
    setIsEditUserDialogOpen(true);
  };

  // Tournament format options
  const tournamentFormats = [
    { value: "single-elimination", label: "Single Elimination" },
    { value: "double-elimination", label: "Double Elimination" },
    { value: "round-robin", label: "Round Robin" },
    { value: "swiss", label: "Swiss System" },
    { value: "league", label: "League Format" },
  ];

  // Sports options
  const sports = [
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
    { value: "baseball", label: "Baseball" },
    { value: "soccer", label: "Soccer" },
    { value: "hockey", label: "Hockey" },
    { value: "tennis", label: "Tennis" },
    { value: "golf", label: "Golf" },
    { value: "esports", label: "Esports" },
  ];

  // User role options
  const userRoles = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "super-admin", label: "Super Admin" },
  ];

  // User status options
  const userStatuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="mr-3 h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          </div>
          
          {/* Tournament Creation Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Tournament
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Tournament</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new tournament.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tournament Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tournament name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sport</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sport" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sports.map((sport) => (
                                <SelectItem key={sport.value} value={sport.value}>
                                  {sport.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tournament Format</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tournamentFormats.map((format) => (
                                <SelectItem key={format.value} value={format.value}>
                                  {format.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="teams"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teams or Players</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter team/player names separated by commas" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset();
                        setIsDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Tournament</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          {/* User Edit Dialog */}
          <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update user information and permissions.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onUserEditSubmit)} className="space-y-4">
                  <FormField
                    control={userForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user's email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={userForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Role</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {userRoles.map((role) => (
                                <SelectItem key={role.value} value={role.value}>
                                  {role.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={userForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {userStatuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter className="pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        userForm.reset();
                        setIsEditUserDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Update User</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Recently Created Tournaments</CardTitle>
              <CardDescription>Manage tournament configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Teams</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">March Madness 2024</TableCell>
                      <TableCell>Basketball</TableCell>
                      <TableCell>Single Elimination</TableCell>
                      <TableCell>Mar 19, 2024</TableCell>
                      <TableCell>64 teams</TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800">
                          Active
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <PencilLine className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">NBA Playoffs 2024</TableCell>
                      <TableCell>Basketball</TableCell>
                      <TableCell>Playoff Bracket</TableCell>
                      <TableCell>Apr 20, 2024</TableCell>
                      <TableCell>16 teams</TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-blue-100 text-blue-800">
                          Upcoming
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <PencilLine className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Manage all user accounts from here</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditUser(user)}
                        >
                          <PencilLine className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
