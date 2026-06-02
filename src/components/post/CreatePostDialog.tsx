import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import type { Post } from "@/types";
import { createPost, NotSignedInError } from "@/services/posts/createPost";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional venue/location to attach to the post. */
  location?: { id?: string; name?: string; city?: string; state?: string };
  /** Whether the post should be flagged as a venue post. */
  isVenuePost?: boolean;
  onCreated?: (post: Post) => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  open,
  onOpenChange,
  location,
  isVenuePost,
  onCreated,
}) => {
  const [content, setContent] = useState("");
  const [vibeTagsInput, setVibeTagsInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setContent("");
    setVibeTagsInput("");
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviews([]);
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;
    setFiles((prev) => [...prev, ...picked]);
    setPreviews((prev) => [...prev, ...picked.map((f) => URL.createObjectURL(f))]);
    // allow re-selecting the same file later
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const close = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = async () => {
    if (!content.trim() && files.length === 0) {
      toast("Add a caption or a photo first");
      return;
    }
    setSubmitting(true);
    try {
      const vibeTags = vibeTagsInput
        .split(/[,#\s]+/)
        .map((t) => t.trim())
        .filter(Boolean);

      const post = await createPost({
        content: content.trim(),
        files,
        vibeTags,
        location,
        isVenuePost,
      });
      toast.success("Your vibe was posted!");
      onCreated?.(post);
      reset();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof NotSignedInError) {
        toast("Sign in to post a vibe");
      } else {
        console.error("createPost failed", error);
        toast.error("Couldn't post your vibe. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="glass-effect max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold vibe-gradient-text">Create a Vibe</DialogTitle>
          <DialogDescription>
            {location?.name
              ? `Share what's happening at ${location.name}.`
              : "Share what's happening right now."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-content">Caption</Label>
            <Textarea
              id="post-content"
              placeholder="What's the vibe?"
              className="bg-background/50 min-h-[90px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {previews.map((url, i) => (
                <div key={url} className="relative h-20 w-20 overflow-hidden rounded-md">
                  <img src={url} alt="Selected" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute right-0 top-0 rounded-bl bg-black/60 p-1 text-white"
                    aria-label="Remove photo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFilesSelected}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Add photo or video
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-tags">Vibe tags</Label>
            <Input
              id="post-tags"
              placeholder="e.g. cozy, lively, sunset"
              className="bg-background/50"
              value={vibeTagsInput}
              onChange={(e) => setVibeTagsInput(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => close(false)}
            className="sm:flex-1"
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-gradient-to-r from-primary to-secondary sm:flex-1"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Right Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
