
import React from 'react';
import { Post, Location, User } from '@/types';

interface ProfileTabContentProps {
  posts?: Post[];
  locations?: Location[];
  user: User;
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
  posts = [],
  locations = [],
  user
}) => {
  if (posts.length > 0) {
    return (
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{post.content}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(post.timestamp).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (locations.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{location.name}</h3>
            <p className="text-sm text-muted-foreground">{location.address}</p>
            <p className="text-sm text-muted-foreground">{location.city}, {location.state}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No content available</p>
    </div>
  );
};

export default ProfileTabContent;
