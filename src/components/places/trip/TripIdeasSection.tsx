import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import AddVenueIdeaDialog from './AddVenueIdeaDialog';
import { supabase } from '@/integrations/supabase/client';

export interface VenueIdea {
  id: string;
  trip_id: string;
  venue_id: string;
  venue_name: string;
  venue_address?: string;
  venue_city?: string;
  venue_rating?: number;
  venue_image_url?: string;
  proposed_by_id: string;
  proposed_by_name: string;
  proposed_by_avatar: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  trip_venue_votes?: Array<{
    id: string;
    vote_type: string;
    user_name: string;
    user_avatar: string;
  }>;
}

interface TripIdeasSectionProps {
  tripId: string;
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar: string;
}

const TripIdeasSection: React.FC<TripIdeasSectionProps> = ({
  tripId,
  currentUserId,
  currentUserName,
  currentUserAvatar
}) => {
  const [venueIdeas, setVenueIdeas] = useState<VenueIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

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

      if (error) {
        console.error('Error fetching venue ideas:', error);
        return;
      }

      // Cast the status field properly and ensure it matches our enum
      const processedData = data.map(item => ({
        ...item,
        status: (['pending', 'approved', 'rejected'].includes(item.status) 
          ? item.status 
          : 'pending') as 'pending' | 'approved' | 'rejected'
      }));

      setVenueIdeas(processedData);
    } catch (error) {
      console.error('Error in fetchVenueIdeas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenueIdeas();
  }, [tripId]);

  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    try {
      // Check if the user has already voted on this idea
      const { data: existingVote, error: existingVoteError } = await supabase
        .from('trip_venue_votes')
        .select('*')
        .eq('trip_venue_idea_id', ideaId)
        .eq('user_id', currentUserId)
        .single();

      if (existingVoteError && existingVoteError.code !== '404') {
        console.error('Error checking existing vote:', existingVoteError);
        return;
      }

      if (existingVote) {
        // If the user has already voted, update the vote
        const { error: updateError } = await supabase
          .from('trip_venue_votes')
          .update({ vote_type: voteType })
          .eq('id', existingVote.id);

        if (updateError) {
          console.error('Error updating vote:', updateError);
          return;
        }
      } else {
        // If the user has not voted, create a new vote
        const { error: insertError } = await supabase
          .from('trip_venue_votes')
          .insert({
            trip_venue_idea_id: ideaId,
            user_id: currentUserId,
            user_name: currentUserName,
            user_avatar: currentUserAvatar,
            vote_type: voteType
          });

        if (insertError) {
          console.error('Error inserting vote:', insertError);
          return;
        }
      }

      // Re-fetch venue ideas to update the vote counts
      fetchVenueIdeas();
    } catch (error) {
      console.error('Error in handleVote:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Venue Ideas</h3>
        <Button onClick={() => setShowAddDialog(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Venue
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading venue ideas...</p>
        </div>
      ) : venueIdeas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No venue ideas yet. Add the first one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {venueIdeas.map(idea => (
            <Card key={idea.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{idea.venue_name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {idea.venue_address}, {idea.venue_city}
                    </p>
                  </div>
                  <Badge variant={idea.status === 'approved' ? 'default' : idea.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {idea.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {idea.notes && (
                  <p className="text-sm mb-4">{idea.notes}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Proposed by {idea.proposed_by_name}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleVote(idea.id, 'up')}>
                      <ThumbsUp className="h-4 w-4" />
                      <span className="ml-1">
                        {idea.trip_venue_votes?.filter(v => v.vote_type === 'up').length || 0}
                      </span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleVote(idea.id, 'down')}>
                      <ThumbsDown className="h-4 w-4" />
                      <span className="ml-1">
                        {idea.trip_venue_votes?.filter(v => v.vote_type === 'down').length || 0}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddVenueIdeaDialog
        tripId={tripId}
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSuccess={() => {
          setShowAddDialog(false);
          fetchVenueIdeas();
        }}
        userId={currentUserId}
        userName={currentUserName}
        userAvatar={currentUserAvatar}
      />
    </div>
  );
};

export default TripIdeasSection;
