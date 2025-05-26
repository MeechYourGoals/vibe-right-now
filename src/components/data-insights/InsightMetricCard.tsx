
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
    const colorParts = color.split('-');
    let textColor = color; // Default to original color
    if (colorParts.length === 3 && colorParts[0] === 'text') { // e.g., text-blue-500
      const colorName = colorParts[1];
      const shade = parseInt(colorParts[2]);
      if (!isNaN(shade) && shade >= 200) {
        textColor = `text-${colorName}-${Math.max(100, shade - 200)}`; // Reduce shade by 200, min 100
      }
    }
    const colorName = color.split('-')[0].split('text-')[1] || colorParts[1] || 'gray'; // Fallback color name
    
    return `bg-${colorName}-100 dark:bg-${colorName}-900/30 ${textColor} border-${colorName}-300 dark:border-${colorName}-700`;
  };
  
  return (
    <Card className="bg-neutral-800/80 border border-neutral-600 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardDescription className="text-neutral-300 font-medium">{title}</CardDescription>
        <CardTitle className="text-2xl flex items-center text-white">
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} /> {/* Icon color itself might need adjustment if too dark */}
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
