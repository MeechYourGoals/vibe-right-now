
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ThumbsUp, AlertCircle } from "lucide-react";
import { Location } from '@/types';
import { ReviewSummaryService } from '@/services/ReviewSummaryService';

interface ReviewSummaryProps {
  venue: Location;
  reviews: any[];
  onSummaryGenerated?: (summary: string) => void;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ 
  venue, 
  reviews,
  onSummaryGenerated 
}) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for cached summary on initial load
  useEffect(() => {
    if (venue && venue.id) {
      const cachedSummary = ReviewSummaryService.getCachedSummary(venue.id);
      if (cachedSummary) {
        setSummary(cachedSummary);
        if (onSummaryGenerated) {
          onSummaryGenerated(cachedSummary);
        }
      }
    }
  }, [venue, onSummaryGenerated]);

  const handleGenerateSummary = async () => {
    if (!reviews || reviews.length === 0) {
      setError("No reviews available to summarize.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedSummary = await ReviewSummaryService.generateSummary(
        reviews, 
        venue.name
      );
      
      setSummary(generatedSummary);
      
      // Cache the summary
      if (venue.id) {
        ReviewSummaryService.cacheSummary(venue.id, generatedSummary);
      }
      
      if (onSummaryGenerated) {
        onSummaryGenerated(generatedSummary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Card className="p-4 bg-red-50 border-red-200 mb-4">
        <div className="flex items-center mb-2">
          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
          <h3 className="font-medium">Error Generating Summary</h3>
        </div>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2" 
          onClick={() => setError(null)}
        >
          Dismiss
        </Button>
      </Card>
    );
  }

  if (!summary) {
    return (
      <div className="my-4">
        <Button 
          onClick={handleGenerateSummary} 
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-r-transparent rounded-full animate-spin mr-2"></div>
              Summarizing Reviews...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-1" />
              Generate AI Review Summary
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-4">
      <div className="flex items-center mb-3">
        <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
        <h3 className="font-medium">AI-Generated Review Summary</h3>
        <Badge variant="outline" className="ml-auto bg-indigo-100 text-indigo-800 border-indigo-200">
          Vernon AI
        </Badge>
      </div>
      
      <div className="text-sm space-y-2 whitespace-pre-line">
        {summary}
      </div>
      
      <div className="mt-3 pt-2 border-t border-indigo-100 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Based on {reviews.length} reviews
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          onClick={handleGenerateSummary}
        >
          <ThumbsUp className="h-3 w-3" />
          Refresh
        </Button>
      </div>
    </Card>
  );
};

export default ReviewSummary;
