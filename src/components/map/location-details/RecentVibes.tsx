
import React from 'react';

interface RecentVibesProps {
  locationId: string;
}

const RecentVibes: React.FC<RecentVibesProps> = ({ locationId }) => {
  // In a real app, you would fetch recent vibes/posts for this location
  
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Recent Vibes</h3>
      <p className="text-sm text-muted-foreground">No recent vibes for this location yet.</p>
    </div>
  );
};

export default RecentVibes;
