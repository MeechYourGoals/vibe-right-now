
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "recharts";

const competitorData = [
  { name: "Your Venue", rating: 4.7, reviews: 328, checkins: 842, posts: 156 },
  { name: "Competitor A", rating: 4.5, reviews: 267, checkins: 756, posts: 134 },
  { name: "Competitor B", rating: 4.2, reviews: 189, checkins: 534, posts: 98 },
  { name: "Competitor C", rating: 4.6, reviews: 301, checkins: 621, posts: 142 },
];

const trendsData = [
  { month: "Jan", you: 420, competitorAvg: 380 },
  { month: "Feb", you: 460, competitorAvg: 400 },
  { month: "Mar", you: 490, competitorAvg: 420 },
  { month: "Apr", you: 520, competitorAvg: 450 },
  { month: "May", you: 550, competitorAvg: 470 },
  { month: "Jun", you: 590, competitorAvg: 500 },
];

const CompetitorAnalysis = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Competitor Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList className="mb-4">
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="trends">Engagement Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={competitorData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reviews" fill="#8884d8" name="Reviews" />
                  <Bar dataKey="checkins" fill="#82ca9d" name="Check-ins" />
                  <Bar dataKey="posts" fill="#ffc658" name="Social Posts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              {competitorData.map((competitor, index) => (
                <Card key={index} className={index === 0 ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20" : ""}>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-1">{competitor.name}</h3>
                    <div className="text-2xl font-bold">{competitor.rating}</div>
                    <div className="text-xs text-muted-foreground">Average Rating</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="you" stroke="#8884d8" activeDot={{ r: 8 }} name="Your Venue" />
                  <Line type="monotone" dataKey="competitorAvg" stroke="#82ca9d" name="Competitor Average" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
