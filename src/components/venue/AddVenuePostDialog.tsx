
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Location } from "@/types";
import { Image, Camera, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createVenuePost } from "@/utils/venue/postManagementUtils";

interface AddVenuePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venue: Location;
}

const AddVenuePostDialog: React.FC<AddVenuePostDialogProps> = ({
  open,
  onOpenChange,
  venue
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      
      // Create preview URLs for the selected files
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };
  
  const handleSubmit = () => {
    if (!content.trim() && selectedFiles.length === 0) {
      toast.error("Please add some text or media to your post");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call the function to create a post at this venue
      createVenuePost(venue.id, content, selectedFiles);
      
      // Close the dialog
      onOpenChange(false);
      
      // Reset the form
      setContent("");
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your VRN Post</DialogTitle>
          <DialogDescription>
            Share your experience at {venue.name}. Add text and photos to create your post.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="rounded-md border p-4">
            <Textarea
              placeholder={`What's happening at ${venue.name}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 placeholder:text-muted-foreground"
            />
            
            {previewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden">
                    <img src={url} alt={`Preview ${index}`} className="h-24 w-full object-cover" />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-80"
                      onClick={() => removeFile(index)}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" type="button" className="gap-1">
              <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                <Image className="h-4 w-4 mr-1" />
                <span>Photos</span>
              </label>
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <Button variant="outline" size="sm" type="button" className="gap-1">
              <Camera className="h-4 w-4 mr-1" />
              <span>Camera</span>
            </Button>
            
            <p className="text-xs text-muted-foreground ml-auto">
              Location: {venue.name}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVenuePostDialog;
