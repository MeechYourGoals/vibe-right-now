
import { useState, useEffect } from 'react';
import { User } from '@/types';

interface UseUserProfileReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (updates: Partial<User>) => void;
  followers: User[];
  following: User[];
  totalEngagement: number;
  averageEngagementRate: number;
}

const useUserProfile = (userId: string): UseUserProfileReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalEngagement, setTotalEngagement] = useState(0);
  const [averageEngagementRate, setAverageEngagementRate] = useState(0);

  // Mock data for demonstration
  const mockUsers: User[] = [
    {
      id: "1",
      username: "vibemaster",
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Living life one vibe at a time ✨",
      verified: true,
      followers: 1250,
      following: 890,
      posts: 156,
      type: "regular"
    },
    {
      id: "2", 
      username: "cityexplorer",
      name: "Morgan Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      bio: "Exploring urban vibes and hidden gems 🌆",
      verified: false,
      followers: 845,
      following: 623,
      posts: 98,
      type: "regular"
    },
    {
      id: "3",
      username: "nightowl",
      name: "Jordan Smith",
      avatar: "https://i.pravatar.cc/150?img=3", 
      bio: "After dark is when the magic happens 🌙",
      verified: true,
      followers: 2100,
      following: 456,
      posts: 234,
      type: "regular"
    }
  ];

  const mockFollowers: User[] = [
    {
      id: "f1",
      username: "followerfan",
      name: "Fan One",
      avatar: "https://i.pravatar.cc/150?img=10",
      verified: false,
      followers: 120,
      following: 340,
      posts: 45,
      type: "regular"
    },
    {
      id: "f2", 
      username: "vibefan2",
      name: "Fan Two",
      avatar: "https://i.pravatar.cc/150?img=11",
      verified: false,
      followers: 89,
      following: 234,
      posts: 67,
      type: "regular"
    }
  ];

  const mockFollowing: User[] = [
    {
      id: "g1",
      username: "followeduser1",
      name: "Following One",
      avatar: "https://i.pravatar.cc/150?img=12",
      verified: true,
      followers: 5600,
      following: 234,
      posts: 345,
      type: "celebrity"
    }
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find user by ID
        const foundUser = mockUsers.find(u => u.id === userId);
        
        if (foundUser) {
          setUser(foundUser);
          setFollowers(mockFollowers);
          setFollowing(mockFollowing);
          
          // Calculate engagement metrics
          const engagement = Number(foundUser.followers || 0) * 0.05 + Number(foundUser.posts || 0) * 2.3;
          const rate = foundUser.followers ? (engagement / Number(foundUser.followers)) * 100 : 0;
          
          setTotalEngagement(Math.round(engagement));
          setAverageEngagementRate(Number(rate.toFixed(2)));
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return {
    user,
    loading,
    error,
    updateUser,
    followers,
    following,
    totalEngagement,
    averageEngagementRate
  };
};

export default useUserProfile;
