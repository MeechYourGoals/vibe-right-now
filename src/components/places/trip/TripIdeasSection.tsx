
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MapPin, Star, Plus } from "lucide-react";
import { toast } from "sonner";

interface VenueIdea {
  id: string;
  venue_name: string;
  venue_address: string;
  venue_rating: number;
  venue_price_level: number;
  venue_type: string;
  notes: string;
  proposed_by_id: string;
  proposed_by_name: string;
  proposed_by_avatar: string;
  status: "pending" | "approved" | "rejected";
  votes: {
    upvotes: number;
    downvotes: number;
  };
  created_at: string;
}

interface TripIdeasSectionProps {
  tripId: string;
}

const TripIdeasSection: React.FC<TripIdeasSectionProps> = ({ tripId }) => {
  const [ideas, setIdeas] = useState<VenueIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTripIdeas();
  }, [tripId]);

  const fetchTripIdeas = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual API call
      const mockIdeas: VenueIdea[] = [
        {
          id: '1',
          venue_name: 'The Blue Door Tavern',
          venue_address: '123 Main St, Downtown',
          venue_rating: 4.5,
          venue_price_level: 2,
          venue_type: 'Bar',
          notes: 'Great craft beer selection and live music on weekends!',
          proposed_by_id: 'user1',
          proposed_by_name: 'Sarah Johnson',
          proposed_by_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=150&h=150&fit=crop&crop=face',
          status: 'pending' as const,
          votes: { upvotes: 3, downvotes: 0 },
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          venue_name: 'Moonlight Restaurant',
          venue_address: '456 Oak Ave, Midtown',
          venue_rating: 4.8,
          venue_price_level: 3,
          venue_type: 'Restaurant',
          notes: 'Amazing rooftop dining with city views',
          proposed_by_id: 'user2',
          proposed_by_name: 'Mike Chen',
          proposed_by_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          status: 'approved' as const,
          votes: { upvotes: 5, downvotes: 1 },
          created_at: new Date().toISOString()
        }
      ];

      setIdeas(mockIdeas);
    } catch (error) {
      console.error('Error fetching trip ideas:', error);
      toast.error('Failed to load venue ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    try {
      // Update local state optimistically
      setIdeas(prev => prev.map(idea => {
        if (idea.id === ideaId) {
          const newVotes = { ...idea.votes };
          if (voteType === 'up') {
            newVotes.upvotes += 1;
          } else {
            newVotes.downvotes += 1;
          }
          return { ...idea, votes: newVotes };
        }
        return idea;
      }));

      toast.success('Vote recorded!');
    } catch (error) {
      console.error('Error voting on idea:', error);
      toast.error('Failed to record vote');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriceLevelText = (level: number) => {
    return '$'.repeat(level) + '·'.repeat(4 - level);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Venue Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Venue Ideas</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Suggest Venue
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{idea.venue_name}</h4>
                    <Badge className={`text-xs ${getStatusColor(idea.status)}`}>
                      {idea.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {idea.venue_address}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {idea.venue_rating}
                    </div>
                    <span>{getPriceLevelText(idea.venue_price_level)}</span>
                    <Badge variant="outline" className="text-xs">
                      {idea.venue_type}
                    </Badge>
                  </div>
                  
                  {idea.notes && (
                    <p className="text-sm mb-3">{idea.notes}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={idea.proposed_by_avatar} alt={idea.proposed_by_name} />
                        <AvatarFallback>{idea.proposed_by_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        Suggested by {idea.proposed_by_name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleVote(idea.id, 'up')}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {idea.votes.upvotes}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleVote(idea.id, 'down')}
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        {idea.votes.downvotes}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {ideas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No venue ideas yet. Be the first to suggest a place!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripIdeasSection;
