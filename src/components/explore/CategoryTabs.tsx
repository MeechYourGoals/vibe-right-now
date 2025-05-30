
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import VibesTabContent from "./VibesTabContent";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  const [searchParams] = useSearchParams();
  const vibeParam = searchParams.get('vibe') || '';

  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={onTabChange}>
      <TabsList className="w-full grid grid-cols-4 lg:grid-cols-8">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="restaurant">Dining</TabsTrigger>
        <TabsTrigger value="bar">Bars</TabsTrigger>
        <TabsTrigger value="nightlife">Nightlife</TabsTrigger>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="comedy">Comedy</TabsTrigger>
        <TabsTrigger value="sports">Sports</TabsTrigger>
        <TabsTrigger value="vibes">Vibes</TabsTrigger>
      </TabsList>

      {/* Vibes tab content */}
      <TabsContent value="vibes">
        <VibesTabContent selectedVibe={vibeParam} />
      </TabsContent>
    </Tabs>
  );
};

export default CategoryTabs;
