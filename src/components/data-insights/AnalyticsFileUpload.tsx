
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UploadSection from "./file-upload/UploadSection";
import FilePreview from "./file-upload/FilePreview";
import AnalysisResults from "./file-upload/AnalysisResults";
import POSServicesConnector from "./POSServicesConnector";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AnalyticsFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (file: File) => {
    setFile(file);
    setShowResults(false);
    setAnalysisError(null);
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    setAnalysisError(null);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Simulate AI analysis with potential for random errors (for demonstration purposes)
      setTimeout(() => {
        const simulateError = Math.random() > 0.8; // 20% chance of error for demonstration
        
        setIsAnalyzing(false);
        
        if (simulateError) {
          setAnalysisError("Unable to process the file format. Please ensure you're uploading valid financial data.");
          setShowResults(false);
          
          toast({
            title: "Analysis Failed",
            description: "There was an error analyzing your data",
            variant: "destructive",
          });
        } else {
          setShowResults(true);
          setAnalysisError(null);
          
          toast({
            title: "Analysis Complete",
            description: "Your financial data has been analyzed successfully",
          });
        }
      }, 3000);
    }, 2000);
  };
  
  const handleRetryAnalysis = () => {
    if (!file) return;
    handleUpload();
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="file-upload" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="file-upload">File Upload</TabsTrigger>
          <TabsTrigger value="pos-integration">POS Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="file-upload">
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
              
              {(showResults || isAnalyzing || analysisError) && (
                <AnalysisResults 
                  isLoading={isAnalyzing}
                  error={analysisError}
                  onRetry={handleRetryAnalysis}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pos-integration">
          <POSServicesConnector />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsFileUpload;
