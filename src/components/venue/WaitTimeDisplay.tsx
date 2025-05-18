
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
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchWaitTime = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For now, simulate wait times based on venue ID
        // This is a temporary solution until the database schema is fixed
        const mockWaitTimes: Record<string, number> = {
          "1": 15,
          "2": 25,
          "3": 5,
          "4": 30,
          "5": 0,
          "30": 10,
          "31": 20,
          "32": 45,
          "33": 15,
          "34": 0,
          "35": 30
        };
        
        const waitMinutes = mockWaitTimes[venueId] ?? null;
        
        if (waitMinutes !== null) {
          setWaitTimeData({
            wait_minutes: waitMinutes,
            updated_at: new Date().toISOString()
          });
        } else {
          // Try to fetch from supabase if mock data isn't available
          try {
            const { data, error } = await supabase
              .from('vibe_signals')
              .select('value, timestamp')
              .eq('location_id', venueId)
              .eq('signal_type', 'wait_time')
              .order('timestamp', { ascending: false })
              .limit(1)
              .maybeSingle();
            
            if (!error && data) {
              setWaitTimeData({
                wait_minutes: data.value,
                updated_at: data.timestamp
              });
            } else if (error) {
              console.error('Supabase error:', error);
              setError('Failed to fetch wait time data');
            }
          } catch (dbError) {
            console.error('Supabase error in wait time fetch:', dbError);
            setError('Database error occurred');
          }
        }
      } catch (error) {
        console.error('Error in wait time fetch:', error);
        setError('Failed to load wait time');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWaitTime();
  }, [venueId]);
  
  if (loading) {
    return <div className={`flex items-center gap-2 text-xs ${className}`}>
      <Clock className="h-3.5 w-3.5 animate-pulse" />
      <span className="text-muted-foreground">Loading wait time...</span>
    </div>;
  }
  
  if (error || !waitTimeData || waitTimeData.wait_minutes === null) {
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
      {showLastUpdated && timeAgo && (
        <span className="text-xs text-muted-foreground ml-1">
          Updated {timeAgo}
        </span>
      )}
    </div>
  );
};

export default WaitTimeDisplay;
