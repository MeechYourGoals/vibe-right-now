
import React from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SearchDebugPanelProps {
  searchQuery: string;
  activeTab: string;
  searchedCity: string;
  searchedState: string;
  vibeFilter: string;
  dateRange: DateRange | undefined;
  isNaturalLanguageSearch: boolean;
  realDataResultsCount: number;
  filteredLocationsCount: number;
  isDetectingLocation: boolean;
  isLoadingResults: boolean;
}

const SearchDebugPanel: React.FC<SearchDebugPanelProps> = ({
  searchQuery,
  activeTab,
  searchedCity,
  searchedState,
  vibeFilter,
  dateRange,
  isNaturalLanguageSearch,
  realDataResultsCount,
  filteredLocationsCount,
  isDetectingLocation,
  isLoadingResults
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const testParseCityState = () => {
    if (typeof window !== 'undefined' && window.testSearch) {
      window.testSearch.parseCityState();
    } else {
      console.log('Test utility not available');
    }
  };
  
  const testUrlUpdates = () => {
    if (typeof window !== 'undefined' && window.testSearch) {
      window.testSearch.testUrlUpdates();
    } else {
      console.log('Test utility not available');
    }
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="my-4 border border-gray-200 rounded-lg"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-between">
          <span>Search Debug Panel</span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card>
          <CardHeader>
            <CardTitle>Search State</CardTitle>
            <CardDescription>Current search and filter state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Search Query:</div>
                <div>{searchQuery || '<empty>'}</div>
                
                <div className="font-semibold">Active Tab:</div>
                <div>{activeTab}</div>
                
                <div className="font-semibold">City:</div>
                <div>{searchedCity || '<not set>'}</div>
                
                <div className="font-semibold">State:</div>
                <div>{searchedState || '<not set>'}</div>
                
                <div className="font-semibold">Vibe Filter:</div>
                <div>{vibeFilter || '<not set>'}</div>
                
                <div className="font-semibold">Date Range:</div>
                <div>
                  {dateRange?.from ? dateRange.from.toLocaleDateString() : '<not set>'}
                  {dateRange?.to ? ` to ${dateRange.to.toLocaleDateString()}` : ''}
                </div>
                
                <div className="font-semibold">Natural Language:</div>
                <div>{isNaturalLanguageSearch ? 'Yes' : 'No'}</div>
                
                <div className="font-semibold">Real Results:</div>
                <div>{realDataResultsCount}</div>
                
                <div className="font-semibold">Filtered Results:</div>
                <div>{filteredLocationsCount}</div>
                
                <div className="font-semibold">Status:</div>
                <div>
                  {isDetectingLocation ? 'Detecting Location' : ''}
                  {isLoadingResults ? 'Loading Results' : ''}
                  {!isDetectingLocation && !isLoadingResults ? 'Ready' : ''}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button size="sm" variant="outline" onClick={testParseCityState}>
              Test City/State Parsing
            </Button>
            <Button size="sm" variant="outline" onClick={testUrlUpdates}>
              Test URL Updates
            </Button>
          </CardFooter>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SearchDebugPanel;
