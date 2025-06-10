
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { mockUsers } from "@/mock/users";
import PostUsersList from "@/components/post/PostUsersList";
import { Post } from "@/types";

interface UserDropdownProps {
  userCount: number;
  post: Post;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ userCount, post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get a sample of users with deterministic selection including our five featured users
  const getSampleUsers = () => {
    // Always include our main users in sample
    const featuredUsernames = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];
    const featuredUsers = mockUsers.filter(user => featuredUsernames.includes(user.username));
    
    // If we have all five, return them in a predictable order
    if (featuredUsers.length === 5) {
      return featuredUsers;
    }
    
    // Otherwise, fill with other users
    const seed = parseInt(post.id) || post.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const otherUsers = mockUsers.filter(user => !featuredUsernames.includes(user.username));
    const shuffled = [...otherUsers].sort(() => 0.5 - Math.random() + (seed * 0.0001));
    const additionalNeeded = 5 - featuredUsers.length;
    
    return [...featuredUsers, ...shuffled.slice(0, additionalNeeded)];
  };

  const sampleUsers = getSampleUsers();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleShowAllUsers = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllUsers(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleToggle}
          className="bg-black/60 rounded-full px-2 py-1 text-white text-xs flex items-center hover:bg-black/80 transition-colors"
        >
          <Users className="h-3 w-3 mr-1" />
          <span>{userCount} users this week</span>
        </button>

        {isOpen && (
          <div className="absolute top-full mt-1 right-0 z-40 w-64 bg-background shadow-lg rounded-md border border-border overflow-hidden">
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-2">People at {post.location?.name}</h4>
              <div className="space-y-2">
                {sampleUsers.map((user) => (
                  <Link
                    key={user.id}
                    to={`/user/${user.username}`}
                    className="flex items-center p-2 hover:bg-muted rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-medium">@{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Button
                variant="link"
                size="sm"
                className="w-full mt-2 text-xs"
                onClick={handleShowAllUsers}
              >
                View all users
              </Button>
            </div>
          </div>
        )}
      </div>

      {showAllUsers && post.location && (
        <PostUsersList venue={post.location} setShowAllUsers={setShowAllUsers} />
      )}
    </>
  );
};

export default UserDropdown;
