import { useState, useEffect } from "react";
import { User } from "@/types";
import { mockUsers } from "@/mock/users";
import { hashString, generateUserBio } from "@/mock/users/utils";

export const useUserProfileData = (username: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (!username) return;
    
    // Find user by username or id (for backward compatibility)
    const isUserId = username && !isNaN(Number(username));
    
    let foundUser: User | undefined;
    
    if (isUserId) {
      // If it's an ID, look for a user with that ID
      foundUser = mockUsers.find((user) => user.id === username);
    } else {
      // Otherwise look for a user with that username
      foundUser = mockUsers.find((user) => user.username === username);
    }
    
    if (foundUser) {
      // Ensure user has all required properties
      const completeUser: User = {
        ...foundUser,
        verified: foundUser.verified || false,
        isCelebrity: foundUser.isCelebrity || false
      };
      
      setUser(completeUser);
    }
  }, [username]);

  const getUserBio = () => {
    if (!user) return "";
    return user.bio || generateUserBio(user);
  };

  // Determine if user profile is private (explicitly set or based on ID pattern)
  const isPrivateProfile = user ? user.isPrivate || parseInt(user.id) % 5 === 0 : false;
  
  return {
    user,
    getUserBio,
    isPrivateProfile
  };
};
