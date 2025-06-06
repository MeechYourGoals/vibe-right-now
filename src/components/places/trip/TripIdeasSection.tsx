
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, MapPin, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AddVenueIdeaDialog from './AddVenueIdeaDialog';

interface TripIdeasSectionProps {
  tripId: string;
  collaborators: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  userColors: Array<{ id: string; color: string }>;
}

interface VenueIdea {
  id: string;
  venue_id: string;
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_rating: number;
  venue_image_url: string;
  proposed_by_name: string;
  proposed_by_avatar: string;
  proposed_by_id: string;
  notes: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  trip_venue_votes?: Array<{
    id: string;
    vote_type: 'up' | 'down';
    user_name: string;
    user_avatar: string;
  }>;
}

const TripIdeasSection: React.FC<TripIdeasSectionProps> = ({
  tripId,
  collaborators,
  userColors
}) => {
  const [venueIdeas, setVenueIdeas] = useState<VenueIdea[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = {
    id: "current-user",
    name: "Current User",
    avatar: "/placeholder.svg"
  };

  useEffect(() => {
    fetchVenueIdeas();
    subscribeToVenueIdeas();
  }, [tripId]);

  const fetchVenueIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from('trip_venue_ideas')
        .select(`
          *,
          trip_venue_votes (
            id,
            vote_type,
            user_name,
            user_avatar
          )
        `)
        .eq('trip_id', tripId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData = data?.map(item => ({
        ...item,
        trip_venue_votes: item.trip_venue_votes || []
      })) || [];
      
      setVenueIdeas(transformedData);
    } catch (error) {
      console.error('Error fetching venue ideas:', error);
      toast.error('Failed to load venue ideas');
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToVenueIdeas = () => {
    const channel = supabase
      .channel(`trip-venue-ideas-${tripId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trip_venue_ideas',
          filter: `trip_id=eq.${tripId}`
        },
        () => {
          fetchVenueIdeas();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trip_venue_votes'
        },
        () => {
          fetchVenueIdeas();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const addVenueIdea = async (venueData: any) => {
    try {
      const { error } = await supabase
        .from('trip_venue_ideas')
        .insert({
          trip_id: tripId,
          venue_id: venueData.id,
          venue_name: venueData.name,
          venue_address: venueData.address,
          venue_city: venueData.city,
          venue_rating: venueData.rating,
          venue_image_url: venueData.image_url,
          proposed_by_id: currentUser.id,
          proposed_by_name: currentUser.name,
          proposed_by_avatar: currentUser.avatar,
          notes: venueData.notes || '',
          status: 'pending'
        });

      if (error) throw error;
      toast.success('Venue idea added successfully!');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding venue idea:', error);
      toast.error('Failed to add venue idea');
    }
  };

  const voteOnVenue = async (venueIdeaId: string, voteType: 'up' | 'down') => {
    try {
      // Check if user already voted
      const existingVote = venueIdeas
        .find(idea => idea.id === venueIdeaId)
        ?.trip_venue_votes?.find(vote => vote.user_name === currentUser.name);

      if (existingVote) {
        toast.error('You have already voted on this venue');
        return;
      }

      const { error } = await supabase
        .from('trip_venue_votes')
        .insert({
          venue_idea_id: venueIdeaId,
          vote_type: voteType,
          user_id: currentUser.id,
          user_name: currentUser.name,
          user_avatar: currentUser.avatar
        });

      if (error) throw error;
      toast.success('Vote recorded!');
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to record vote');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getVoteCount = (votes: VenueIdea['trip_venue_votes'], type: 'up' | 'down') => {
    return votes?.filter(vote => vote.vote_type === type).length || 0;
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading venue ideas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Venue Ideas & Voting</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Propose Venue
            </Button>
          </DialogTrigger>
          <AddVenueIdeaDialog 
            onAddVenue={addVenueIdea}
            onClose={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </div>

      {venueIdeas.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No venue ideas yet. Be the first to propose a venue!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venueIdeas.map((idea) => (
            <Card key={idea.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{idea.venue_name}</CardTitle>
                  <Badge className={getStatusColor(idea.status)}>
                    {idea.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{idea.venue_address}, {idea.venue_city}</span>
                </div>
                {idea.venue_rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{idea.venue_rating.toFixed(1)}</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                {idea.notes && (
                  <p className="text-sm text-muted-foreground">{idea.notes}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={idea.proposed_by_avatar} alt={idea.proposed_by_name} />
                      <AvatarFallback>{idea.proposed_by_name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      Proposed by {idea.proposed_by_name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => voteOnVenue(idea.id, 'up')}
                      className="flex items-center space-x-1"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{getVoteCount(idea.trip_venue_votes, 'up')}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => voteOnVenue(idea.id, 'down')}
                      className="flex items-center space-x-1"
                    >
                      <ThumbsDown className="h-3 w-3" />
                      <span>{getVoteCount(idea.trip_venue_votes, 'down')}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripIdeasSection;
