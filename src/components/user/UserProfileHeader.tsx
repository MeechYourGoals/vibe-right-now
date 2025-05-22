import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Globe, Youtube, CheckCircle } from "lucide-react";
import { User } from "@/types";

interface UserProfileHeaderProps {
  user: User;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  return (
    <div className="relative">
      {/* Cover Photo */}
      {user.coverPhoto && (
        <div className="h-48 bg-muted rounded-md overflow-hidden">
          <img
            src={user.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="absolute left-4 bottom-0 transform translate-y-1/2">
        <Avatar className="w-24 h-24 border-2 border-white">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="mt-12 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {user.name}
              {user.isVerified && (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              )}
            </h2>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          <div>
            <Button size="sm">Follow</Button>
          </div>
        </div>

        <p className="text-sm mt-2">{user.bio}</p>

        <div className="mt-4 flex items-center space-x-4">
          {/* Example Social Links - Replace with actual links */}
          <a href="#" className="hover:text-primary">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary">
            <Youtube className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary">
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
