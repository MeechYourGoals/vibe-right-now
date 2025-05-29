
import React from "react";
import Header from "@/components/Header";
import { useUserProfile } from "@/hooks/useUserProfile";

const UserProfile = () => {
  const { user, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            {user.bio && <p className="mt-2">{user.bio}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
