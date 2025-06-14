
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Edit, Camera } from "lucide-react";

const ProfileBio = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Christian Amechi",
    username: "@ChiefVibeOfficer",
    bio: "Exploring the best vibes around the world. Always on the lookout for hidden gems and exciting experiences.",
    location: "Los Angeles, CA",
    joinedDate: "January 2023"
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        <Card className="border shadow-sm">
          <CardHeader className="relative pb-0">
            <div className="h-48 w-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-t-lg"></div>
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80" alt={profileData.name} />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-background">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleEditToggle} variant="outline" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-16">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <p className="text-muted-foreground">{profileData.username}</p>
                </div>
                <p>{profileData.bio}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{profileData.location}</span>
                  <span>•</span>
                  <span>Joined {profileData.joinedDate}</span>
                </div>
                <div className="mt-8 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
                  <p className="font-medium">Community Guidelines</p>
                  <p className="mt-1">Post vibes that make others want to visit. No memes, flyers, or unrelated posts please.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileBio;
