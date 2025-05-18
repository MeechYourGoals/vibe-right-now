
import { useEffect, useState } from 'react';
import { Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
        // Using vibe_signals table as a temporary storage for wait times
        // We'll query for signals of type "wait_time" for the specific venue
        const { data, error } = await supabase
          .from('vibe_signals')
          .select('value, timestamp')
          .eq('location_id', venueId)
          .eq('signal_type', 'wait_time')
          .order('timestamp', { ascending: false })
          .limit(1)
          .single();
        
        if (error) {
          console.error('Error fetching wait time:', error);
          setWaitTimeData(null);
        } else if (data) {
          setWaitTimeData({
            wait_minutes: data.value,
            updated_at: data.timestamp
          });
        }
      } catch (error) {
        console.error('Error in wait time fetch:', error);
        setWaitTimeData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWaitTime();
    
    // Setup realtime subscription for wait time updates
    const channel = supabase
      .channel('vibe_signal_wait_time_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vibe_signals',
          filter: `location_id=eq.${venueId} AND signal_type=eq.wait_time`
        },
        (payload) => {
          console.log('Wait time updated:', payload);
          if (payload.new) {
            setWaitTimeData({
              wait_minutes: (payload.new as any).value,
              updated_at: (payload.new as any).timestamp
            });
          }
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

// Import this at the top of the file
import { formatDistanceToNow } from 'date-fns';

export default WaitTimeDisplay;
