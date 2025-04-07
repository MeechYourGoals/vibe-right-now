
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InsightMetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor: string;
  changePercentage: number;
  timeframe: string;
}

const InsightMetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  changePercentage, 
  timeframe 
}: InsightMetricCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl flex items-center">
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className={`bg-${iconColor.split('-')[0]}-500/10 ${iconColor}`}>
          +{changePercentage}% from last {timeframe}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default InsightMetricCard;
