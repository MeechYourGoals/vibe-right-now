
import { useState } from 'react';
import { mockUsers } from '@/mock/users';

export const vibeTags = [
  "🔥 Lit", "🎵 Vibes", "💎 Bougie", "🌮 Foodie", "🍸 Classy",
  "🎉 Party", "📸 Aesthetic", "🌃 Chill", "⚡ Electric", "🎭 Artsy"
];

export const useFilterHandling = () => {
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) 
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return {
    selectedVibes,
    selectedUsers,
    toggleVibe,
    toggleUser,
    vibeTags,
    users: mockUsers
  };
};
