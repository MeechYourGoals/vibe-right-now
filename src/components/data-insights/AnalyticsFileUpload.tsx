
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UploadSection from "./file-upload/UploadSection";
import FilePreview from "./file-upload/FilePreview";
import AnalysisResults from "./file-upload/AnalysisResults";

const AnalyticsFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (file: File) => {
    setFile(file);
    setShowResults(false);
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
        
        toast({
          title: "Analysis Complete",
          description: "Your financial data has been analyzed successfully",
        });
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            AI-Powered Financial Analysis
          </CardTitle>
          <CardDescription>
            Upload your business records for advanced AI insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UploadSection onFileChange={handleFileChange} />
          
          {file && (
            <FilePreview 
              file={file} 
              isUploading={isUploading} 
              isAnalyzing={isAnalyzing} 
              onUpload={handleUpload} 
            />
          )}
          
          {showResults && <AnalysisResults />}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsFileUpload;
