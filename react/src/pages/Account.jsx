import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    role: "Group Leader",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joined: "March 2023",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
 
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Account</h1>
          <p className="text-silver-500">Manage your profile and account settings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="h-24 w-24 rounded-full border-2 border-primary cursor-pointer"
                      onClick={() => document.getElementById('avatarInput').click()}
                    />
                    <input
                      type="file"
                      id="avatarInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer" onClick={() => document.getElementById('avatarInput').click()}>
                      <Camera className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-silver-500" />
                      <Input name="name" value={profile.name} onChange={handleChange} className="w-full" disabled={!isEditing} />
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-silver-500" />
                      <Input name="email" value={profile.email} onChange={handleChange} className="w-full" disabled={!isEditing} />
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-silver-500" />
                      <Input name="phone" value={profile.phone} onChange={handleChange} className="w-full" disabled={!isEditing} />
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-silver-500" />
                      <Input name="location" value={profile.location} onChange={handleChange} className="w-full" disabled={!isEditing} />
                    </div>
                  </div>
                  {!isEditing ? (
                    <Button className="w-full mt-4" onClick={handleEdit}>
                      Edit Profile
                    </Button>
                  ) : (
                    <Button className="w-full mt-4" onClick={handleUpdate}>
                      Update Profile
                    </Button>
                  )}
                  <Button className="w-full mt-2" variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This feature is currently under development. Please check back soon!</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tournament History</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This feature is currently under development. Please check back soon!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;