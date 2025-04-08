
import React from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { User } from "@/types";

interface PrivateProfileContentProps {
  user: User;
}

const PrivateProfileContent = ({ user }: PrivateProfileContentProps) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-muted">
            <Lock className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">This profile is private</h2>
        <p className="text-muted-foreground mb-8">
          @{user.username} has chosen to keep their profile private. 
          Follow them to request access to their content.
        </p>
        <Button>
          Request to Follow
        </Button>
      </div>
    </div>
  );
};

export default PrivateProfileContent;
