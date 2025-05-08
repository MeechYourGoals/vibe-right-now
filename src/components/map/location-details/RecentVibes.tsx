import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockVenue } from "@/mock/data";
import { Post } from "@/types";

interface RecentVibesProps {
  locationId: string;
}

const RecentVibes: React.FC<RecentVibesProps> = ({ locationId }) => {
  // Mock post data
  const postData = [
    {
      id: '1',
      author: 'Mia Davis',
      content: 'Just had the best coffee here! ☕ Highly recommend the latte.',
      timestamp: '2 hours ago',
      likes: 15,
      media: ['https://source.unsplash.com/random/200x200/?coffee'],
      comments: []
    },
    {
      id: '2',
      author: 'Alex Johnson',
      content: 'Great atmosphere and friendly staff. Will definitely come back!',
      timestamp: '5 hours ago',
      likes: 8,
      media: [],
      comments: []
    },
    {
      id: '3',
      author: 'Sophie White',
      content: 'Their pastries are to die for! 🥐 So delicious.',
      timestamp: '1 day ago',
      likes: 22,
      media: ['https://source.unsplash.com/random/200x200/?pastry'],
      comments: []
    }
  ];

  // Update the posts mapping to include location
  const posts: Post[] = postData.map(post => ({
    ...post,
    location: mockVenue // Add the missing location property
  }));

  return (
    <div className="bg-card rounded-md p-4 space-y-4">
      <h3 className="text-lg font-semibold">Recent Vibes</h3>
      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="text-sm font-medium leading-none">{post.author}</div>
              <p className="text-sm text-muted-foreground">{post.content}</p>
              {post.media && post.media.length > 0 && (
                <img src={post.media[0]} alt="Post Media" className="mt-2 rounded-md w-full" />
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
