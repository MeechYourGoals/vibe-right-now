
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post, User } from "@/types";

interface RecentVibesProps {
  locationId: string;
}

const RecentVibes: React.FC<RecentVibesProps> = ({ locationId }) => {
  // Mock venue data
  const mockVenue = {
    id: locationId,
    name: "Sample Venue",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    zip: "94101",
    lat: 37.7749,
    lng: -122.4194,
    type: "restaurant"
  };
  
  // Mock user data
  const mockUsers = [
    {
      id: 'author-1',
      username: 'miadavis',
      email: 'mia@example.com',
      displayName: 'Mia Davis',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true,
      following: 120,
      followers: 450,
      bio: 'Coffee lover | Foodie | Explorer'
    },
    {
      id: 'author-2',
      username: 'alexjohnson',
      email: 'alex@example.com',
      displayName: 'Alex Johnson',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: false,
      following: 75,
      followers: 210,
      bio: 'Travel enthusiast | Photographer'
    },
    {
      id: 'author-3',
      username: 'sophiewhite',
      email: 'sophie@example.com',
      displayName: 'Sophie White',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true,
      following: 430,
      followers: 1200,
      bio: 'Food critic | City explorer'
    }
  ] as User[];
  
  // Mock post data
  const postData = [
    {
      id: '1',
      content: 'Just had the best coffee here! ☕ Highly recommend the latte.',
      timestamp: '2 hours ago',
      likesCount: 15,
      media: [{ type: 'image', url: 'https://source.unsplash.com/random/200x200/?coffee' }],
      commentsCount: 3,
      user: mockUsers[0],
      location: mockVenue,
      vibeScore: 85
    },
    {
      id: '2',
      content: 'Great atmosphere and friendly staff. Will definitely come back!',
      timestamp: '5 hours ago',
      likesCount: 8,
      media: [],
      commentsCount: 1,
      user: mockUsers[1],
      location: mockVenue,
      vibeScore: 90
    },
    {
      id: '3',
      content: 'Their pastries are to die for! 🥐 So delicious.',
      timestamp: '1 day ago',
      likesCount: 22,
      media: [{ type: 'image', url: 'https://source.unsplash.com/random/200x200/?pastry' }],
      commentsCount: 5,
      user: mockUsers[2],
      location: mockVenue,
      vibeScore: 95
    }
  ] as Post[];

  return (
    <div className="bg-card rounded-md p-4 space-y-4">
      <h3 className="text-lg font-semibold">Recent Vibes</h3>
      <div className="space-y-3">
        {postData.map(post => (
          <div key={post.id} className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={post.user.avatar} alt={post.user.displayName} />
              <AvatarFallback>{post.user.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="text-sm font-medium leading-none">{post.user.displayName}</div>
              <p className="text-sm text-muted-foreground">{post.content}</p>
              {post.media && post.media.length > 0 && post.media[0].type === 'image' && (
                <img src={post.media[0].url} alt="Post Media" className="mt-2 rounded-md w-full" />
              )}
              <div className="text-xs text-muted-foreground">{post.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVibes;
