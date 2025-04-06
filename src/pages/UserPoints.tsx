
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Award, TrendingUp, MapPin, Calendar, Clock, CheckCircle2, Ticket } from "lucide-react";

const UserPointsPage = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Your Points</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Points</CardTitle>
              <CardDescription>Lifetime points earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">1,250</span>
                <Award className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Level</CardTitle>
              <CardDescription>Vibe Trendsetter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Level 4</span>
                  <span>Level 5</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-muted-foreground">750 more points to next level</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Streak</CardTitle>
              <CardDescription>Your activity consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">15</span>
                <TrendingUp className="h-8 w-8 text-primary opacity-80" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Weeks of consistent activity</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="recent" className="mb-8">
          <TabsList>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Point Activity</CardTitle>
                <CardDescription>Points earned in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      action: "Checked in at Griffith Observatory", 
                      points: 25, 
                      date: "Apr 4, 2025", 
                      icon: <MapPin className="h-4 w-4" /> 
                    },
                    { 
                      action: "Posted a video at Crypto.com Arena", 
                      points: 75, 
                      date: "Apr 2, 2025",
                      icon: <Calendar className="h-4 w-4" />
                    },
                    { 
                      action: "5-day streak bonus", 
                      points: 50, 
                      date: "Apr 1, 2025",
                      icon: <TrendingUp className="h-4 w-4" />
                    },
                    { 
                      action: "Verified Venice Beach review", 
                      points: 30, 
                      date: "Mar 28, 2025",
                      icon: <CheckCircle2 className="h-4 w-4" />
                    },
                    { 
                      action: "Shared 3 locations", 
                      points: 45, 
                      date: "Mar 25, 2025",
                      icon: <Clock className="h-4 w-4" />
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-3">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm text-primary">+{item.points} pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Redeem Your Points</CardTitle>
                <CardDescription>Exclusive rewards you've unlocked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      reward: "15% Off at Partner Restaurants", 
                      cost: 500, 
                      description: "One-time discount at select restaurants", 
                      available: true 
                    },
                    { 
                      reward: "Early Access to Events", 
                      cost: 750, 
                      description: "Get tickets before general sale", 
                      available: true 
                    },
                    { 
                      reward: "Free Drink at Partner Bars", 
                      cost: 300, 
                      description: "One complimentary drink at select locations", 
                      available: true 
                    },
                    { 
                      reward: "Trevor Noah Comedy Show", 
                      cost: 700, 
                      description: "Comps at Long Beach Terrace Theater", 
                      available: true 
                    },
                    { 
                      reward: "Resort Day Pass", 
                      cost: 850, 
                      description: "Free pass at Waikiki Beach Hilton", 
                      available: true 
                    },
                    { 
                      reward: "Dodgers Game Discount", 
                      cost: 600, 
                      description: "30% off tickets at Dodger Stadium", 
                      available: true 
                    },
                    { 
                      reward: "Boxing Class", 
                      cost: 400, 
                      description: "Free 1st class at Punch Club Boxing & Fitness", 
                      available: true 
                    },
                    { 
                      reward: "Beyoncé Concert Discount", 
                      cost: 900, 
                      description: "15% off Cowboy Carter Tour at SoFi Stadium", 
                      available: true 
                    },
                    { 
                      reward: "VIP Event Access", 
                      cost: 2000, 
                      description: "Exclusive VIP access to select events", 
                      available: false 
                    },
                    { 
                      reward: "Premium Verified Badge", 
                      cost: 5000, 
                      description: "Stand out with a premium profile badge", 
                      available: false 
                    }
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.reward}</h3>
                        <div className={`px-3 py-1 rounded-full text-xs ${item.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'}`}>
                          {item.available ? 'Available' : 'Locked'}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-primary font-medium">
                          <Award className="h-4 w-4 mr-1" />
                          <span>{item.cost} points</span>
                        </div>
                        <button 
                          className={`text-xs px-3 py-1 rounded-full ${item.available ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                          disabled={!item.available}
                        >
                          {item.available ? 'Redeem' : `Need ${item.cost - 1250} more points`}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
          <p className="font-medium">Community Guidelines</p>
          <p className="mt-1">Post vibes that make others want to visit. No memes, flyers, or unrelated posts please.</p>
        </div>
      </div>
    </Layout>
  );
};

export default UserPointsPage;
