
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';

export const useUserProfile = (userId?: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const foundUser = mockUsers.find(u => u.id === userId);
      setUser(foundUser || null);
    }
    setLoading(false);
  }, [userId]);

  return {
    user,
    loading,
    setUser
  };
};
