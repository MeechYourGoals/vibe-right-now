
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MediaEngagementChartProps {
  data: any[];
}

const MediaEngagementChart = ({ data }: MediaEngagementChartProps) => {
  return (
    <Card className="bg-neutral-800/80 border-neutral-600">
      <CardHeader>
        <CardTitle className="text-white">Media Engagement</CardTitle>
        <CardDescription className="text-neutral-300">
          Photos vs Videos uploaded at your venue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }} 
              />
              <Legend />
              <Bar dataKey="photos" fill="#3b82f6" name="Photos" />
              <Bar dataKey="videos" fill="#ec4899" name="Videos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaEngagementChart;
