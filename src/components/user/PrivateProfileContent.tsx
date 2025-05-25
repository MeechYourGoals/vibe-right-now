
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { User } from "@/types";

interface PrivateProfileContentProps {
  user: User;
}

const PrivateProfileContent: React.FC<PrivateProfileContentProps> = ({ user }) => {
  return (
    <Card className="mt-6">
      <CardContent className="text-center py-12">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">This Account is Private</h3>
        <p className="text-muted-foreground">
          Follow @{user.username} to see their posts and activity.
        </p>
      </CardContent>
    </Card>
  );
};

export default PrivateProfileContent;
