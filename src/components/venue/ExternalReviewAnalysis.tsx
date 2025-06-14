
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Lock, Sparkles } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

interface ExternalReviewAnalysisProps {
  venueId: string;
  venueName: string;
  isUserPremium?: boolean;
}

const ExternalReviewAnalysis: React.FC<ExternalReviewAnalysisProps> = ({
  venueId,
  venueName,
  isUserPremium = false
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { isAuthenticated } = useAuth0();

  const handleAnalyzeReviews = async () => {
    if (!isUserPremium || !isAuthenticated) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis - in production this would call your backend
    setTimeout(() => {
      setAnalysis(`
        Based on reviews across multiple platforms, ${venueName} receives consistently positive feedback for its atmosphere and ambiance, with customers frequently praising the "cozy vibe" and "perfect lighting for dates." 

        Service quality appears to be a strong point, with staff described as "friendly" and "attentive" in 87% of recent reviews. However, some customers note that service can be slower during peak hours on weekends.

        The most commonly mentioned positives include: exceptional coffee quality, Instagram-worthy interior design, and comfortable seating areas. Areas for improvement based on customer feedback include: faster service during busy periods and expanded food menu options.
      `);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            External Review Analysis
            {isUserPremium ? (
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Premium
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-100 text-gray-600">
                Premium Required
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {!isAuthenticated ? (
          <div className="text-center py-6">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-muted-foreground mb-4">
              Sign in to access AI-powered review analysis
            </p>
            <Button disabled>
              Sign In Required
            </Button>
          </div>
        ) : !isUserPremium ? (
          <div className="text-center py-6">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-muted-foreground mb-4">
              Get AI-powered analysis of reviews from Yelp, Google, TripAdvisor and more
            </p>
            <Button disabled className="bg-gray-400">
              <Lock className="mr-2 h-4 w-4" />
              Upgrade to Premium
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {!analysis ? (
              <div className="text-center py-6">
                <Sparkles className="mx-auto h-12 w-12 text-purple-500 mb-4" />
                <p className="text-muted-foreground mb-4">
                  Analyze reviews from connected review platforms using AI
                </p>
                <Button 
                  onClick={handleAnalyzeReviews}
                  disabled={isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Reviews...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze External Reviews
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border">
                  <h4 className="font-semibold text-purple-900 mb-2">AI Review Analysis</h4>
                  <p className="text-purple-800 whitespace-pre-line">{analysis}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Analysis based on reviews from connected platforms
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setAnalysis(null)}
                  >
                    Generate New Analysis
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExternalReviewAnalysis;
