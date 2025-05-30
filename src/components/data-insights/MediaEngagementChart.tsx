
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MediaEngagementChartProps {
  data: any[];
}

const MediaEngagementChart = ({ data }: MediaEngagementChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Engagement</CardTitle>
        <CardDescription>
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
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
