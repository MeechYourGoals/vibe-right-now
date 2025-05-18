
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WaitTimeUpdaterProps {
  venueId: string;
  initialWaitTime?: number | null;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

/**
 * Component for venues to update their current wait time
 * Only available for pro account users
 */
const WaitTimeUpdater = ({ venueId, initialWaitTime, subscriptionTier }: WaitTimeUpdaterProps) => {
  const [waitTime, setWaitTime] = useState<number | null>(initialWaitTime || null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  if (subscriptionTier !== 'pro') {
    return (
      <div className="p-4 border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Wait Time Updates</h3>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.info("Upgrade to Pro to enable wait time updates")}>
            Upgrade to Pro
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Allow customers to see current wait times at your venue. 
          This feature requires a Pro subscription.
        </p>
      </div>
    );
  }
  
  const updateWaitTime = async () => {
    if (waitTime !== null && waitTime >= 0) {
      setIsUpdating(true);
      
      try {
        // Update the wait time in the database
        const { error } = await supabase
          .from('venue_wait_times')
          .upsert(
            { 
              venue_id: venueId, 
              wait_minutes: waitTime,
              updated_at: new Date().toISOString() 
            },
            { onConflict: 'venue_id' }
          );
        
        if (error) throw error;
        
        toast.success('Wait time updated successfully');
        console.log('Wait time updated:', waitTime);
      } catch (error) {
        console.error('Error updating wait time:', error);
        toast.error('Failed to update wait time');
      } finally {
        setIsUpdating(false);
      }
    } else {
      toast.error('Please enter a valid wait time');
    }
  };
  
  const clearWaitTime = async () => {
    setIsUpdating(true);
    
    try {
      // Clear the wait time in the database
      const { error } = await supabase
        .from('venue_wait_times')
        .update({ wait_minutes: null, updated_at: new Date().toISOString() })
        .eq('venue_id', venueId);
      
      if (error) throw error;
      
      setWaitTime(null);
      toast.success('Wait time cleared');
    } catch (error) {
      console.error('Error clearing wait time:', error);
      toast.error('Failed to clear wait time');
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg bg-background">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Current Wait Time
      </h3>
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          value={waitTime === null ? '' : waitTime}
          onChange={(e) => setWaitTime(e.target.value === '' ? null : parseInt(e.target.value))}
          placeholder="Minutes"
          className="w-24"
          min={0}
        />
        <span className="text-sm text-muted-foreground">minutes</span>
        <div className="flex gap-2 ml-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearWaitTime}
            disabled={isUpdating || waitTime === null}
          >
            Clear
          </Button>
          <Button 
            size="sm" 
            onClick={updateWaitTime}
            disabled={isUpdating || waitTime === null}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Keep your wait time current to help customers plan their visit.
        Updates will be visible to all users immediately.
      </p>
    </div>
  );
};

export default WaitTimeUpdater;
