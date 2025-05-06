import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ImageIcon, ListIcon, MapPin, MessageSquare, Plus, Star } from "lucide-react";
import { Venue } from "@/types";
import { getVenueById } from "@/services/VenueService";
import VenueHeader from "@/components/venue/VenueHeader";
import VenueAbout from "@/components/venue/VenueAbout";
import VenuePosts from "@/components/venue/VenuePosts";
import VenueMap from "@/components/venue/VenueMap";
import { createPost, getVenuePosts } from "@/services/PostService";
import { Post } from "@/types";
import { useSession } from "@/contexts/SessionContext";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteVenue } from '@/services/VenueService';
import { generateBusinessHours, getTodaysHours } from '@/utils/businessHoursUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns';
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom';
import { SkeletonVenueHeader } from '@/components/SkeletonVenueHeader';
import { SkeletonVenueAbout } from '@/components/SkeletonVenueAbout';
import { SkeletonVenuePosts } from '@/components/SkeletonVenuePosts';
import { SkeletonVenueMap } from '@/components/SkeletonVenueMap';
import { SkeletonVenueReviews } from '@/components/SkeletonVenueReviews';
import { SkeletonVenueAssistant } from '@/components/SkeletonVenueAssistant';
import VenueReviews from '@/components/venue/VenueReviews';
import VernonVenueAssistant from '@/components/venue/VernonVenueAssistant';

interface VenuePostsContentProps {
  posts: Post[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  canDelete: boolean;
  getPostComments: (postId: string) => Promise<any[]>;
}

const VenuePostsContent: React.FC<VenuePostsContentProps> = ({ posts, viewMode, setViewMode, canDelete, getPostComments }) => {
  return (
    <VenuePosts
      posts={posts}
      viewMode={viewMode}
      setViewMode={setViewMode}
      canDelete={canDelete}
      getPostComments={getPostComments}
    />
  );
};

const VenueProfile: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"about" | "posts" | "map" | "reviews">("about");
  const [venuePosts, setVenuePosts] = useState<Post[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const { session } = useSession();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postComments, setPostComments] = useState<Record<string, any[]>>({});

  const fetchVenue = useCallback(async () => {
    if (!venueId) {
      toast.error('Venue ID is missing.');
      return;
    }

    setIsLoading(true);
    try {
      const fetchedVenue = await getVenueById(venueId);
      if (fetchedVenue) {
        setVenue(fetchedVenue);
        setIsOwner(session?.user.id === fetchedVenue.ownerId);
      } else {
        toast.error('Venue not found.');
      }
    } catch (error) {
      console.error('Error fetching venue:', error);
      toast.error('Failed to load venue.');
    } finally {
      setIsLoading(false);
    }
  }, [venueId, session]);

  const fetchVenuePosts = useCallback(async () => {
    if (!venueId) return;

    try {
      const posts = await getVenuePosts(venueId);
      setVenuePosts(posts);
    } catch (error) {
      console.error('Error fetching venue posts:', error);
      toast.error('Failed to load venue posts.');
    }
  }, [venueId]);

  useEffect(() => {
    fetchVenue();
    fetchVenuePosts();
  }, [fetchVenue, fetchVenuePosts]);

  const handleCreatePost = async () => {
    if (!postContent.trim()) {
      toast.error('Post content cannot be empty.');
      return;
    }

    if (!venueId) {
      toast.error('Venue ID is missing.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newPost = await createPost({
        venueId: venueId,
        content: postContent,
      });

      setVenuePosts(prevPosts => [newPost, ...prevPosts]);
      setPostContent('');
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVenue = async () => {
    if (!venueId) {
      toast.error('Venue ID is missing.');
      return;
    }

    try {
      await deleteVenue(venueId);
      toast.success('Venue deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast.error('Failed to delete venue.');
    }
  };

  const getPostComments = async (postId: string) => {
    // Placeholder for fetching comments
    return [];
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 p-4">
        <SkeletonVenueHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2">
            <SkeletonVenueAbout />
            <SkeletonVenuePosts />
          </div>
          <div className="space-y-4">
            <SkeletonVenueMap />
            <SkeletonVenueReviews />
            <SkeletonVenueAssistant />
          </div>
        </div>
      </div>
    );
  }

  if (!venue) {
    return <div className="text-center mt-8">Venue not found.</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <VenueHeader venue={venue} />

      <Tabs defaultValue="about" className="w-full mt-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="about"><ListIcon className="mr-2 h-4 w-4" /> About</TabsTrigger>
          <TabsTrigger value="posts"><MessageSquare className="mr-2 h-4 w-4" /> Posts</TabsTrigger>
          <TabsTrigger value="map"><MapPin className="mr-2 h-4 w-4" /> Map</TabsTrigger>
          <TabsTrigger value="reviews"><Star className="mr-2 h-4 w-4" /> Reviews</TabsTrigger>
        </TabsList>
        <div className="flex justify-end mt-2">
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open dropdown menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate(`/venue/edit/${venueId}`)}>
                  Edit Venue
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem>
                      Delete Venue
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your venue
                        and remove all of its data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteVenue}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2">
            <TabsContent value="about" className="space-y-4">
              <VenueAbout venue={venue} />
            </TabsContent>
            <TabsContent value="posts" className="space-y-4">
              {isOwner && (
                <Card>
                  <CardHeader>
                    <CardTitle>Create a Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Write something to share..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={handleCreatePost} disabled={isSubmitting}>
                      {isSubmitting ? "Posting..." : "Post"}
                    </Button>
                  </CardContent>
                </Card>
              )}
              <VenuePostsContent 
                posts={venuePosts}
                viewMode={viewMode}
                setViewMode={setViewMode}
                canDelete={isOwner}
                getPostComments={getPostComments}
              />
            </TabsContent>
          </div>
          <div className="space-y-4">
            <TabsContent value="map" className="space-y-4">
              <VenueMap venue={venue} />
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4">
              <VenueReviews venue={venue} />
            </TabsContent>
            <VernonVenueAssistant />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default VenueProfile;
