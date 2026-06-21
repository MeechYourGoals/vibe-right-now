
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Camera } from "lucide-react";
import { toast } from "sonner";
import { profilesRepo } from "@/services/data";
import { useUserStore } from "@/store";
import type { User } from "@/types";

const ProfileBio = () => {
  const { user: storeUser, isAuthenticated, updateUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    avatar: "",
    joinedDate: "",
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        // Load the signed-in user's profile; fall back to the first mock user when signed out.
        const loaded = storeUser?.id
          ? await profilesRepo.getById(storeUser.id)
          : (await profilesRepo.listSuggested(1))[0] ?? null;

        if (!active) return;
        if (loaded) {
          setProfile(loaded);
          setProfileData({
            name: loaded.displayName || loaded.name || "",
            username: loaded.username ? `@${loaded.username}` : "",
            bio: loaded.bio || "",
            location: loaded.location || "",
            avatar: loaded.avatar || "",
            joinedDate: loaded.createdAt
              ? new Date(loaded.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "",
          });
        }
      } catch (err) {
        console.warn("[ProfileBio] failed to load profile:", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [storeUser?.id]);

  const handleEditToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to edit your profile.");
      return;
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!isAuthenticated || !storeUser?.id) {
      toast.error("Please sign in to save your profile.");
      return;
    }
    setSaving(true);
    try {
      const updates: Partial<User> = {
        displayName: profileData.name,
        name: profileData.name,
        bio: profileData.bio,
      };
      const updated = await profilesRepo.update(storeUser.id, updates);
      if (updated) {
        setProfile(updated);
      }
      // Keep the Zustand store in sync.
      updateUser({ name: profileData.name } as never);
      setIsEditing(false);
      toast.success("Profile updated");
    } catch (err) {
      console.warn("[ProfileBio] save failed:", err);
      toast.error("Could not save profile. Please try again.");
    } finally {
      setSaving(false);
    }
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
                  <AvatarImage src={profileData.avatar} alt={profileData.name} />
                  <AvatarFallback>{profileData.name.charAt(0) || "?"}</AvatarFallback>
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
            {loading ? (
              <div className="py-8 text-center text-muted-foreground">Loading profile...</div>
            ) : isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      disabled
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
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
                  {profileData.location && <span>{profileData.location}</span>}
                  {profileData.location && profileData.joinedDate && <span>•</span>}
                  {profileData.joinedDate && <span>Joined {profileData.joinedDate}</span>}
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
