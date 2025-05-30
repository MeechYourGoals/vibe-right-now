
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Search } from "lucide-react";
import { regularUsers } from '@/mock/users/regularUsers';

const UserNotFound: React.FC = () => {
  const suggestedUsers = regularUsers.slice(0, 3);

  return (
    <Card className="bg-neutral-900 border-neutral-700 text-center">
      <CardHeader>
        <div className="mx-auto w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
          <Search className="h-6 w-6 text-neutral-400" />
        </div>
        <CardTitle className="text-white">User Not Found</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-neutral-400">
          The user you're looking for doesn't exist or may have been removed.
        </p>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-neutral-300">Suggested Users</h4>
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-lg">
              <img 
                src={user.profileImage} 
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 text-left">
                <p className="font-medium text-white">{user.displayName}</p>
                <p className="text-sm text-neutral-400">@{user.username}</p>
              </div>
              <Button variant="outline" size="sm" className="text-white border-neutral-600">
                <User className="h-3 w-3 mr-1" />
                Follow
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserNotFound;
