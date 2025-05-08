
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
    type: "restaurant" as const
  };
  
  // Mock user data with properties matching the User type
  const mockUsers: User[] = [
    {
      id: 'author-1',
      username: 'miadavis',
      email: 'mia@example.com',
      name: 'Mia Davis',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true,
      bio: 'Coffee lover | Foodie | Explorer'
    },
    {
      id: 'author-2',
      username: 'alexjohnson',
      email: 'alex@example.com',
      name: 'Alex Johnson',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: false,
      bio: 'Travel enthusiast | Photographer'
    },
    {
      id: 'author-3',
      username: 'sophiewhite',
      email: 'sophie@example.com',
      name: 'Sophie White',
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
      verified: true,
      bio: 'Food critic | City explorer'
    }
  ];
  
  // Mock post data conforming to Post type
  const postData: Post[] = [
    {
      id: '1',
      content: 'Just had the best coffee here! ☕ Highly recommend the latte.',
      authorId: 'author-1',
      user: mockUsers[0],
      locationId: locationId,
      location: mockVenue,
      timestamp: '2 hours ago',
      likes: 15,
      comments: 3,
      media: [{ type: 'image', url: 'https://source.unsplash.com/random/200x200/?coffee' }]
    },
    {
      id: '2',
      content: 'Great atmosphere and friendly staff. Will definitely come back!',
      authorId: 'author-2',
      user: mockUsers[1],
      locationId: locationId,
      location: mockVenue,
      timestamp: '5 hours ago',
      likes: 8,
      comments: 1,
      media: []
    },
    {
      id: '3',
      content: 'Their pastries are to die for! 🥐 So delicious.',
      authorId: 'author-3',
      user: mockUsers[2],
      locationId: locationId,
      location: mockVenue,
      timestamp: '1 day ago',
      likes: 22,
      comments: 5,
      media: [{ type: 'image', url: 'https://source.unsplash.com/random/200x200/?pastry' }]
    }
  ];

  return (
    <div className="bg-card rounded-md p-4 space-y-4">
      <h3 className="text-lg font-semibold">Recent Vibes</h3>
      <div className="space-y-3">
        {postData.map(post => (
          <div key={post.id} className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={post.user?.avatar} alt={post.user?.name || ''} />
              <AvatarFallback>{post.user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="text-sm font-medium leading-none">{post.user?.name}</div>
              <p className="text-sm text-muted-foreground">{post.content}</p>
              {post.media && post.media.length > 0 && typeof post.media[0] !== 'string' && (
                <img src={(post.media[0] as any).url} alt="Post Media" className="mt-2 rounded-md w-full" />
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
