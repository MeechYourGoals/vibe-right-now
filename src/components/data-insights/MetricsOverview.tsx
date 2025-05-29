
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Eye, Heart, MessageCircle } from "lucide-react";

interface Metric {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  description?: string;
}

interface MetricsOverviewProps {
  metrics?: Metric[];
  timeframe?: string;
}

const defaultMetrics: Metric[] = [
  {
    id: '1',
    title: 'Total Views',
    value: '24.8K',
    change: 12.5,
    icon: Eye,
    description: 'Total post views this week'
  },
  {
    id: '2',
    title: 'Engagement',
    value: '3.2K',
    change: -2.3,
    icon: Heart,
    description: 'Likes, comments, and shares'
  },
  {
    id: '3',
    title: 'New Followers',
    value: '1.1K',
    change: 8.7,
    icon: Users,
    description: 'New followers gained'
  },
  {
    id: '4',
    title: 'Comments',
    value: '842',
    change: 15.2,
    icon: MessageCircle,
    description: 'Total comments received'
  }
];

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ 
  metrics = defaultMetrics, 
  timeframe = 'Last 7 days' 
}) => {
  const formatChange = (change: number): string => {
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  const getChangeColor = (change: number): string => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = (change: number) => {
    return change > 0 ? TrendingUp : TrendingDown;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Metrics Overview</h2>
        <Badge variant="outline" className="text-neutral-300 border-neutral-600">
          {timeframe}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          const TrendIcon = getTrendIcon(metric.change);
          
          return (
            <Card key={metric.id} className="bg-neutral-900 border-neutral-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-200">
                  {metric.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-neutral-400" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className={`flex items-center space-x-1 ${getChangeColor(metric.change)}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {formatChange(metric.change)}
                    </span>
                  </div>
                </div>
                {metric.description && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {metric.description}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsOverview;
