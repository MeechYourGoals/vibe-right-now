
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Link as LinkIcon, Users, Heart } from "lucide-react";
import { useUserProfile } from '@/hooks/useUserProfile';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    user,
    isLoading,
    error,
    followUser,
    unfollowUser,
    userPosts,
    followedVenues,
    visitedPlaces
  } = useUserProfile(userId || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center">Loading user profile...</div>
        </div>
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center text-red-500">{error || 'User not found'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info */}
          <div className="lg:col-span-1">
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="text-center">
                <img 
                  src={user.profileImage} 
                  alt={user.displayName}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <div className="flex items-center justify-center space-x-2">
                  <CardTitle className="text-white">{user.displayName}</CardTitle>
                  {user.isVerified && (
                    <Badge variant="secondary">Verified</Badge>
                  )}
                </div>
                <p className="text-neutral-400">@{user.username}</p>
                {user.bio && (
                  <p className="text-sm text-neutral-300 mt-2">{user.bio}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{user.followersCount}</div>
                    <div className="text-sm text-neutral-400">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{user.followingCount}</div>
                    <div className="text-sm text-neutral-400">Following</div>
                  </div>
                </div>

                {user.location && (
                  <div className="flex items-center text-neutral-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                )}

                <div className="flex items-center text-neutral-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>

                {user.website && (
                  <div className="flex items-center text-neutral-400">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    <a href={user.website} className="text-sm text-blue-400 hover:underline">
                      {user.website}
                    </a>
                  </div>
                )}

                <Button 
                  className="w-full"
                  onClick={followUser}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Posts */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">Posts ({userPosts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {userPosts.length > 0 ? (
                  <div className="space-y-4">
                    {userPosts.map((post) => (
                      <div key={post.id} className="p-4 bg-neutral-800 rounded-lg">
                        <p className="text-neutral-200 mb-2">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-400">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-400 text-center py-8">No posts yet</p>
                )}
              </CardContent>
            </Card>

            {/* Followed Venues */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">Followed Venues ({followedVenues.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {followedVenues.map((venue) => (
                    <div key={venue.id} className="p-3 bg-neutral-800 rounded-lg">
                      <h4 className="font-medium text-white">{venue.name}</h4>
                      <p className="text-sm text-neutral-400">{venue.address}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {venue.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visited Places */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Visits ({visitedPlaces.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visitedPlaces.map((place) => (
                    <div key={place.id} className="p-3 bg-neutral-800 rounded-lg">
                      <h4 className="font-medium text-white">{place.name}</h4>
                      <p className="text-sm text-neutral-400">{place.address}</p>
                      {place.rating && (
                        <div className="flex items-center mt-1">
                          <Heart className="h-3 w-3 text-red-500 mr-1" />
                          <span className="text-xs text-neutral-400">{place.rating}/5</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
