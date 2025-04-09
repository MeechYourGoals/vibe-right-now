
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const demographicData = [
  { age: "18-24", value: 35 },
  { age: "25-34", value: 45 },
  { age: "35-44", value: 25 },
  { age: "45-54", value: 15 },
  { age: "55+", value: 10 },
];

const AudienceInsights = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Age Demographics</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={demographicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" name="Visitors" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Top Visitor Sources</h3>
        <ul className="text-sm space-y-1">
          <li className="flex justify-between"><span>Instagram</span> <span>42%</span></li>
          <li className="flex justify-between"><span>Google Maps</span> <span>31%</span></li>
          <li className="flex justify-between"><span>Direct</span> <span>18%</span></li>
          <li className="flex justify-between"><span>Referrals</span> <span>9%</span></li>
        </ul>
      </div>
    </div>
  );
};

export default AudienceInsights;
