
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
  // Function to determine the badge background color based on iconColor
  const getBadgeClass = (color: string) => {
    const colorName = color.split('-')[0].split('text-')[1] || color;
    
    return `bg-${colorName}-100 dark:bg-${colorName}-900/30 ${color} border-${colorName}-300 dark:border-${colorName}-700`;
  };
  
  return (
    <Card className="border-2 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardDescription className="text-foreground/80 font-medium">{title}</CardDescription>
        <CardTitle className="text-2xl flex items-center">
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className={`${getBadgeClass(iconColor)}`}>
          +{changePercentage}% from last {timeframe}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default InsightMetricCard;
