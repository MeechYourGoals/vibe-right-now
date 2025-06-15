
import { BaseRepository, DatabaseResult, PaginatedResult } from '../BaseRepository';

export interface Trip {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface TripMessage {
  id: string;
  content: string;
  user_name: string;
  user_avatar: string;
  user_id: string;
  created_at: string;
  message_type: string;
  trip_id: string;
}

export interface TripVenueIdea {
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
  trip_id: string;
}

export class TripRepository extends BaseRepository {
  async getMessages(tripId: string): Promise<PaginatedResult<TripMessage>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('trip_messages')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: true });

      return { data: data as TripMessage[] | null, error };
    }) as Promise<PaginatedResult<TripMessage>>;
  }

  async sendMessage(message: Omit<TripMessage, 'id' | 'created_at'>): Promise<DatabaseResult<TripMessage>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('trip_messages')
        .insert(message)
        .select()
        .single();

      return { data: data as TripMessage | null, error };
    });
  }

  async getVenueIdeas(tripId: string): Promise<PaginatedResult<TripVenueIdea>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
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

      return { data: data as TripVenueIdea[] | null, error };
    }) as Promise<PaginatedResult<TripVenueIdea>>;
  }

  async addVenueIdea(venueIdea: Omit<TripVenueIdea, 'id' | 'created_at'>): Promise<DatabaseResult<TripVenueIdea>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('trip_venue_ideas')
        .insert(venueIdea)
        .select()
        .single();

      return { data: data as TripVenueIdea | null, error };
    });
  }

  async voteOnVenue(vote: {
    venue_idea_id: string;
    vote_type: 'up' | 'down';
    user_id: string;
    user_name: string;
    user_avatar: string;
  }): Promise<DatabaseResult<any>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('trip_venue_votes')
        .insert(vote)
        .select()
        .single();

      return { data, error };
    });
  }

  async addReaction(reaction: {
    message_id: string;
    reaction_type: string;
    user_id: string;
    user_name: string;
  }): Promise<DatabaseResult<any>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('trip_message_reactions')
        .insert(reaction)
        .select()
        .single();

      return { data, error };
    });
  }
}
