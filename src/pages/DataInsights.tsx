
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueInsights from "@/components/VenueInsights";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileLock, CreditCard, Crown } from "lucide-react";

const DataInsights = () => {
  const [isPremium, setIsPremium] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Data Insights</h1>
              
              {!isPremium && (
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={() => setIsPremium(true)}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
            
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="advertising" disabled={!isPremium}>
                Advertising
                {!isPremium && <FileLock className="ml-2 h-3 w-3" />}
              </TabsTrigger>
            </TabsList>
            
            {!isPremium && (
              <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
                    <Crown className="mr-2 h-5 w-5" />
                    Upgrade to Premium
                  </CardTitle>
                  <CardDescription className="text-amber-600 dark:text-amber-500">
                    Unlock advanced analytics and advertising tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                      <h3 className="font-semibold mb-2">Full Analytics</h3>
                      <p className="text-sm text-muted-foreground">Access detailed insights about visitor demographics and behavior patterns</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                      <h3 className="font-semibold mb-2">Advertising Tools</h3>
                      <p className="text-sm text-muted-foreground">Create targeted promotions and track their performance in real-time</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                      <h3 className="font-semibold mb-2">Competitor Analysis</h3>
                      <p className="text-sm text-muted-foreground">Compare your venue performance with industry averages</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    onClick={() => setIsPremium(true)}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Now - $49.99/month
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <TabsContent value="overview" className="mt-0">
              <VenueInsights />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Analytics</CardTitle>
                    <CardDescription>
                      {isPremium 
                        ? "Detailed insights about your venue's performance" 
                        : "Basic analytics are available in the free tier"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-6">
                      <h3 className="text-xl font-medium mb-2">
                        {isPremium 
                          ? "Full analytics dashboard is available" 
                          : "Upgrade to premium for detailed analytics"}
                      </h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        {isPremium
                          ? "View detailed information about your visitors' demographics, behavior patterns, and engagement metrics"
                          : "Basic analytics are shown in the Overview tab. For more detailed insights, consider upgrading to our premium plan"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="advertising" className="mt-0">
              {isPremium ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advertising Module</CardTitle>
                      <CardDescription>
                        Create and manage promotional campaigns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-6">
                        <h3 className="text-xl font-medium mb-2">
                          Your advertising dashboard
                        </h3>
                        <p className="text-muted-foreground text-center max-w-md">
                          Create targeted promotions, track performance, and optimize your advertising spend
                        </p>
                        <Button className="mt-4 bg-gradient-vibe">
                          Create New Campaign
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">
                    Upgrade to premium to access advertising tools
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DataInsights;
