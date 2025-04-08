
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";

interface FilePreviewProps {
  file: File;
  isUploading: boolean;
  isAnalyzing: boolean;
  onUpload: () => void;
}

const FilePreview = ({ file, isUploading, isAnalyzing, onUpload }: FilePreviewProps) => {
  return (
    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-500" />
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
      <Button 
        onClick={onUpload} 
        disabled={isUploading || isAnalyzing}
      >
        {isUploading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isAnalyzing && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Analyze with AI"}
      </Button>
    </div>
  );
};

export default FilePreview;
