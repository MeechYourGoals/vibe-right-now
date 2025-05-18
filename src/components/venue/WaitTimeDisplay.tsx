
import { useEffect, useState } from 'react';
import { Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from 'date-fns';

interface WaitTimeDisplayProps {
  venueId: string;
  showLastUpdated?: boolean;
  className?: string;
}

interface WaitTimeData {
  wait_minutes: number | null;
  updated_at: string;
}

/**
 * Component to display the current wait time for a venue
 */
const WaitTimeDisplay = ({ venueId, showLastUpdated = true, className = "" }: WaitTimeDisplayProps) => {
  const [waitTimeData, setWaitTimeData] = useState<WaitTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWaitTime = async () => {
      try {
        const { data, error } = await supabase
          .from('venue_wait_times')
          .select('wait_minutes, updated_at')
          .eq('venue_id', venueId)
          .single();
        
        if (error) throw error;
        setWaitTimeData(data);
      } catch (error) {
        console.error('Error fetching wait time:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWaitTime();
    
    // Setup realtime subscription for wait time updates
    const channel = supabase
      .channel('venue_wait_time_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'venue_wait_times',
          filter: `venue_id=eq.${venueId}`
        },
        (payload) => {
          console.log('Wait time updated:', payload);
          setWaitTimeData(payload.new as WaitTimeData);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [venueId]);
  
  if (loading) {
    return <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Clock className="h-4 w-4 animate-pulse" />
      <span>Loading wait time...</span>
    </div>;
  }
  
  if (!waitTimeData || waitTimeData.wait_minutes === null) {
    return null;
  }

  const updatedAtTime = new Date(waitTimeData.updated_at);
  const isRecent = (new Date().getTime() - updatedAtTime.getTime()) < 2 * 60 * 60 * 1000; // 2 hours
  
  if (!isRecent) {
    return null; // Don't show outdated wait times
  }
  
  const timeAgo = formatDistanceToNow(updatedAtTime, { addSuffix: true });
  
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Clock className="h-4 w-4 text-amber-500" />
      <span className="font-medium">
        {waitTimeData.wait_minutes === 0 
          ? "No wait time" 
          : `~${waitTimeData.wait_minutes} min wait`}
      </span>
      {showLastUpdated && (
        <span className="text-xs text-muted-foreground ml-1">
          Updated {timeAgo}
        </span>
      )}
    </div>
  );
};

export default WaitTimeDisplay;
