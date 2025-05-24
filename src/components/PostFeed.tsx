
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, MapPin, Star } from "lucide-react";
import Verified from "@/components/Verified";
import { Post, Comment } from "@/types";

// Mock data
const mockPosts: Post[] = [
  {
    id: "1",
    content: "Amazing rooftop views and craft cocktails! The sunset here is absolutely breathtaking. Perfect spot for a date night or catching up with friends. 🌅🍸",
    author: {
      id: "1",
      username: "foodie_sarah",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      isVerified: true,
      followersCount: 2500,
      followingCount: 180,
      postsCount: 245,
      isCelebrity: false
    },
    user: {
      id: "1",
      username: "foodie_sarah",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      isVerified: true,
      followersCount: 2500,
      followingCount: 180,
      postsCount: 245,
      isCelebrity: false
    },
    location: {
      id: "1",
      name: "Sky Lounge",
      address: "123 High Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      latitude: 40.7128,
      longitude: -74.0060,
      lat: 40.7128,
      lng: -74.0060,
      category: "nightlife",
      type: "lounge",
      rating: 4.8,
      reviewCount: 324,
      price: "$$$",
      imageUrl: "/placeholder.svg",
      isFeatured: true,
      verified: true,
      country: "US",
      formattedPhoneNumber: "(555) 123-4567",
      website: "https://skylounge.com",
      reservable: true
    },
    timestamp: "2024-01-15T18:30:00Z",
    media: [
      {
        id: "1",
        type: "image",
        url: "/placeholder.svg"
      }
    ],
    likes: 127,
    comments: [],
    vibedHere: true,
    isLiked: false
  },
  {
    id: "2",
    content: "Best tacos in the city! The al pastor is incredible and the atmosphere is so lively. Definitely coming back here soon! 🌮🔥",
    author: {
      id: "2",
      username: "taco_lover_mike",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg",
      isVerified: false,
      followersCount: 890,
      followingCount: 420,
      postsCount: 156,
      isCelebrity: false
    },
    user: {
      id: "2",
      username: "taco_lover_mike",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg",
      isVerified: false,
      followersCount: 890,
      followingCount: 420,
      postsCount: 156,
      isCelebrity: false
    },
    location: {
      id: "2",
      name: "Taco Libre",
      address: "456 Food Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      latitude: 34.0522,
      longitude: -118.2437,
      lat: 34.0522,
      lng: -118.2437,
      category: "food",
      type: "restaurant",
      rating: 4.6,
      reviewCount: 892,
      price: "$$",
      imageUrl: "/placeholder.svg",
      isFeatured: false,
      verified: true,
      country: "US",
      formattedPhoneNumber: "(555) 987-6543",
      website: "https://tacolibre.com",
      reservable: false
    },
    timestamp: "2024-01-15T19:45:00Z",
    media: [
      {
        id: "2",
        type: "image",
        url: "/placeholder.svg"
      }
    ],
    likes: 89,
    comments: [],
    vibedHere: true,
    isLiked: true
  }
];

const PostFeed = () => {
  const [posts] = useState<Post[]>(mockPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['2']));

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
      } else {
        newLikes.add(postId);
      }
      return newLikes;
    });
  };

  const handleComment = (postId: string, comment: string) => {
    console.log('Adding comment to post:', postId, comment);
  };

  const handleShare = (postId: string) => {
    console.log('Sharing post:', postId);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {post.user.name}
                  </h3>
                  {post.user.isVerified && <Verified />}
                  <span className="text-xs text-neutral-400">
                    @{post.user.username}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-3 w-3 text-neutral-400" />
                  <span className="text-xs text-neutral-400">
                    {post.location.name}, {post.location.city}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-neutral-400">
                      {post.location.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-neutral-200 mb-4">{post.content}</p>
            
            {post.media && post.media.length > 0 && (
              <div className="mb-4">
                <img
                  src={post.media[0].url}
                  alt="Post media"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-neutral-700">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={`text-neutral-400 hover:text-red-500 ${
                  likedPosts.has(post.id) ? 'text-red-500' : ''
                }`}
              >
                <Heart className={`h-4 w-4 mr-1 ${
                  likedPosts.has(post.id) ? 'fill-current' : ''
                }`} />
                {post.likes + (likedPosts.has(post.id) && !post.isLiked ? 1 : 0)}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleComment(post.id, '')}
                className="text-neutral-400 hover:text-blue-500"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments.length}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare(post.id)}
                className="text-neutral-400 hover:text-green-500"
              >
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostFeed;
