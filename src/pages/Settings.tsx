
import React from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Bell, Globe, Shield, PaintBucket, MessageSquare, Search } from "lucide-react";
import ProviderSettings from "@/components/settings/ProviderSettings";

const Settings = () => {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="w-full flex overflow-x-auto">
            <TabsTrigger value="account" className="flex items-center gap-2 flex-shrink-0">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 flex-shrink-0">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2 flex-shrink-0">
              <PaintBucket className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="providers" className="flex items-center gap-2 flex-shrink-0">
              <Search className="h-4 w-4" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2 flex-shrink-0">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2 flex-shrink-0">
              <Globe className="h-4 w-4" />
              Language
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Account settings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Notification settings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of the app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Appearance settings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="providers">
            <ProviderSettings />
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Privacy settings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>
                  Change language and regional preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Language settings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
