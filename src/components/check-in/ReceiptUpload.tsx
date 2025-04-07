
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, Check } from "lucide-react";

interface ReceiptUploadProps {
  onUploadComplete: () => void;
}

export function ReceiptUpload({ onUploadComplete }: ReceiptUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasReceipt, setHasReceipt] = useState(false);

  const handleUploadReceipt = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setHasReceipt(true);
          onUploadComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="border rounded-md p-3 mt-4">
      <Label htmlFor="receipt" className="block mb-2">
        Upload your receipt from today (optional)
      </Label>
      
      {hasReceipt ? (
        <div className="flex items-center gap-2 text-green-500">
          <Check className="h-4 w-4" />
          <span>Receipt uploaded successfully</span>
        </div>
      ) : isUploading ? (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-center">{uploadProgress}% uploaded</p>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleUploadReceipt}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Receipt (3x points)
        </Button>
      )}
    </div>
  );
}
