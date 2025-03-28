
import React from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-silver-500">Manage your app preferences and notifications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-silver-500">Receive emails about tournament updates</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="prediction-reminders" className="font-medium">Prediction Reminders</Label>
                  <p className="text-sm text-silver-500">Get reminders before prediction deadlines</p>
                </div>
                <Switch id="prediction-reminders" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="result-notifications" className="font-medium">Result Notifications</Label>
                  <p className="text-sm text-silver-500">Receive updates when matches end</p>
                </div>
                <Switch id="result-notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-silver-500 text-sm mb-4">
                This is a placeholder page. Settings functionality will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
