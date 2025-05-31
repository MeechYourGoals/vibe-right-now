
export interface MockUserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  isCelebrity?: boolean;
  isPrivate?: boolean;
}

export const mockUsers: Record<string, MockUserProfile> = {
  alex: {
    id: "1",
    username: "alex_m",
    name: "Alex Martinez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Living life one adventure at a time ✨",
    verified: true,
    followers: 2543,
    following: 892,
    posts: 156
  },
  sarah: {
    id: "2",
    username: "sarah_k",
    name: "Sarah Kim",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9461208?w=150&h=150&fit=crop&crop=face",
    bio: "Coffee enthusiast & brunch expert ☕",
    verified: false,
    followers: 1876,
    following: 634,
    posts: 89
  },
  mike: {
    id: "3",
    username: "mike_r",
    name: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Music lover | Live music photographer 🎵",
    verified: true,
    followers: 5432,
    following: 1203,
    posts: 234
  },
  emma: {
    id: "4",
    username: "emma_w",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Cocktail connoisseur & night owl 🍸",
    verified: false,
    followers: 987,
    following: 456,
    posts: 67
  },
  olivia: {
    id: "5",
    username: "olivia_t",
    name: "Olivia Taylor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    bio: "Foodie explorer & chef 👩‍🍳",
    verified: true,
    followers: 3210,
    following: 789,
    posts: 145
  },
  liam: {
    id: "6",
    username: "liam_b",
    name: "Liam Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "History buff & urban explorer 🏛️",
    verified: false,
    followers: 654,
    following: 321,
    posts: 98
  },
  sophia: {
    id: "7",
    username: "sophia_l",
    name: "Sophia Lee",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    bio: "Sports fan & game day enthusiast 🏈",
    verified: false,
    followers: 1234,
    following: 567,
    posts: 76
  },
  noah: {
    id: "8",
    username: "noah_j",
    name: "Noah Johnson",
    avatar: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=150&h=150&fit=crop&crop=face",
    bio: "Event photographer & party enthusiast 📸",
    verified: true,
    followers: 4567,
    following: 1098,
    posts: 189
  },
  isabella: {
    id: "9",
    username: "isabella_d",
    name: "Isabella Davis",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
    bio: "Travel blogger & adventure seeker 🌍",
    verified: true,
    followers: 6789,
    following: 1345,
    posts: 267
  }
};
