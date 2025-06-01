
import React, { useState } from 'react';
import { Plus, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AddVenueIdeaDialog } from './AddVenueIdeaDialog';
import { mockLocations } from '@/mock/locations';
import { Location } from '@/types';

interface VenueIdea {
  id: string;
  venue: Location;
  proposedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  votes: {
    up: string[];
    down: string[];
  };
  status: 'pending' | 'approved' | 'rejected';
  proposedAt: Date;
  notes?: string;
}

interface TripIdeasSectionProps {
  tripId: string | undefined;
  collaborators: Array<{ id: string; name: string; avatar: string }>;
  userColors: Array<{ id: string; color: string }>;
}

export const TripIdeasSection: React.FC<TripIdeasSectionProps> = ({
  tripId,
  collaborators,
  userColors
}) => {
  const [ideas, setIdeas] = useState<VenueIdea[]>(() => {
    if (!tripId) return [];
    
    // Generate example ideas
    return generateExampleIdeas(tripId, collaborators);
  });
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleVote = (ideaId: string, voteType: 'up' | 'down') => {
    const currentUserId = collaborators[0]?.id || "1";
    
    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        const newVotes = { ...idea.votes };
        
        // Remove user from both arrays first
        newVotes.up = newVotes.up.filter(id => id !== currentUserId);
        newVotes.down = newVotes.down.filter(id => id !== currentUserId);
        
        // Add to appropriate array
        if (voteType === 'up') {
          newVotes.up.push(currentUserId);
        } else {
          newVotes.down.push(currentUserId);
        }
        
        // Update status based on votes
        let status = idea.status;
        if (newVotes.up.length >= Math.ceil(collaborators.length / 2)) {
          status = 'approved';
        } else if (newVotes.down.length >= Math.ceil(collaborators.length / 2)) {
          status = 'rejected';
        }
        
        return { ...idea, votes: newVotes, status };
      }
      return idea;
    }));
  };

  const handleAddIdea = (venue: Location, notes: string) => {
    const newIdea: VenueIdea = {
      id: `idea_${Date.now()}`,
      venue,
      proposedBy: {
        id: collaborators[0]?.id || "1",
        name: collaborators[0]?.name || "You",
        avatar: collaborators[0]?.avatar || ""
      },
      votes: { up: [], down: [] },
      status: 'pending',
      proposedAt: new Date(),
      notes
    };
    
    setIdeas(prev => [...prev, newIdea]);
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Venue Ideas</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Propose Venue
            </Button>
          </DialogTrigger>
          <AddVenueIdeaDialog 
            onClose={() => setIsAddDialogOpen(false)}
            onAddIdea={handleAddIdea}
          />
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <Card key={idea.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={idea.proposedBy.avatar} />
                    <AvatarFallback>{idea.proposedBy.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {idea.proposedBy.name}
                  </span>
                </div>
                <Badge className={getStatusColor(idea.status)}>
                  {idea.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">{idea.venue.name}</h4>
                <p className="text-sm text-muted-foreground">{idea.venue.address}</p>
                {idea.venue.type && (
                  <Badge variant="outline" className="mt-1">
                    {idea.venue.type}
                  </Badge>
                )}
              </div>
              
              {idea.notes && (
                <p className="text-sm bg-muted p-2 rounded">{idea.notes}</p>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(idea.id, 'up')}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    {idea.votes.up.length}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(idea.id, 'down')}
                    className="flex items-center gap-1"
                  >
                    <ThumbsDown className="h-3 w-3" />
                    {idea.votes.down.length}
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on VRN
                </Button>
              </div>
              
              {/* Show voting users */}
              {(idea.votes.up.length > 0 || idea.votes.down.length > 0) && (
                <div className="text-xs text-muted-foreground">
                  {idea.votes.up.length > 0 && (
                    <span className="text-green-600">
                      ✓ {idea.votes.up.map(id => 
                        collaborators.find(c => c.id === id)?.name || 'User'
                      ).join(', ')}
                    </span>
                  )}
                  {idea.votes.up.length > 0 && idea.votes.down.length > 0 && ' • '}
                  {idea.votes.down.length > 0 && (
                    <span className="text-red-600">
                      ✗ {idea.votes.down.map(id => 
                        collaborators.find(c => c.id === id)?.name || 'User'
                      ).join(', ')}
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate example ideas
const generateExampleIdeas = (
  tripId: string,
  collaborators: Array<{ id: string; name: string; avatar: string }>
): VenueIdea[] => {
  const venues = mockLocations.slice(0, 3);
  
  return venues.map((venue, index) => ({
    id: `idea_${index}`,
    venue,
    proposedBy: {
      id: collaborators[index % collaborators.length]?.id || "1",
      name: collaborators[index % collaborators.length]?.name || "User",
      avatar: collaborators[index % collaborators.length]?.avatar || ""
    },
    votes: {
      up: index === 0 ? [collaborators[0]?.id || "1"] : [],
      down: index === 2 ? [collaborators[1]?.id || "2"] : []
    },
    status: index === 0 ? 'approved' : index === 2 ? 'rejected' : 'pending',
    proposedAt: new Date(Date.now() - index * 1000 * 60 * 60),
    notes: index === 0 ? "This place has amazing reviews!" : undefined
  }));
};
