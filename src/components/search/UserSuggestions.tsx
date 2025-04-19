
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { User } from "@/types";

interface UserSuggestionsProps {
  showSuggestions: boolean;
  searchQuery: string;
  suggestedUsers: User[];
  onUserSelect: (username: string) => void;
}

const UserSuggestions: React.FC<UserSuggestionsProps> = ({
  showSuggestions,
  searchQuery,
  suggestedUsers,
  onUserSelect,
}) => {
  const filteredUsers = searchQuery.length > 0
    ? suggestedUsers.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestedUsers;

  return (
    <Collapsible open={showSuggestions} className="w-full">
      <CollapsibleContent className="overflow-hidden">
        <Card className="mt-1 w-full p-2 shadow-md border border-border">
          <div className="space-y-1">
            {searchQuery.length === 0 ? (
              <>
                <p className="text-xs text-muted-foreground px-2 py-1">Featured Users</p>
                {suggestedUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => onUserSelect(user.username)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">@{user.username}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : filteredUsers.length > 0 ? (
              <>
                <p className="text-xs text-muted-foreground px-2 py-1">Search Results</p>
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => onUserSelect(user.username)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">@{user.username}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <p>No users found</p>
              </div>
            )}
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default UserSuggestions;
