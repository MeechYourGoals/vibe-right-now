
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Check, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const AnalyticsFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowResults(false);
    }
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
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
            <div className="flex justify-center mb-4">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-medium">Upload your business data</h3>
            <p className="text-sm text-muted-foreground">
              Upload QuickBooks exports, sales records, or marketing campaign data
            </p>
            <div className="flex items-center justify-center mt-4">
              <Input
                type="file"
                accept=".csv,.xlsx,.xls,.qbo,.qbx,.json"
                className="max-w-sm"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          {file && (
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
                onClick={handleUpload} 
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
          )}
          
          {showResults && (
            <div className="mt-6 space-y-6">
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-900">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Check className="h-5 w-5" />
                  <h3 className="font-medium">Analysis Complete</h3>
                </div>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  Our AI has analyzed your data and generated insights
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Based on the financial data you've uploaded, we've identified several key opportunities for your venue:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-5 w-5 flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <span>
                        <strong>Revenue Opportunity:</strong> Your weekend bookings are at 95% capacity, but weekday bookings are only at 45%. Consider implementing weekday promotions that could increase revenue by an estimated 22%.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-5 w-5 flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <span>
                        <strong>Cost Optimization:</strong> Beverage costs are 5% above industry standards. Renegotiating with suppliers could save approximately $1,200 monthly.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-5 w-5 flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <span>
                        <strong>Marketing Efficiency:</strong> Your social media campaigns show 3.2x better ROI than print advertising. Reallocating 40% of print budget to social could increase marketing effectiveness by 28%.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>Your Venue</TableHead>
                          <TableHead>Industry</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Profit Margin</TableCell>
                          <TableCell>18.3%</TableCell>
                          <TableCell className="text-green-500">16.5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cost of Goods</TableCell>
                          <TableCell>32.1%</TableCell>
                          <TableCell className="text-amber-500">28.5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Labor Cost</TableCell>
                          <TableCell>29.8%</TableCell>
                          <TableCell className="text-green-500">31.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Marketing ROI</TableCell>
                          <TableCell>3.4x</TableCell>
                          <TableCell className="text-green-500">2.8x</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Marketing Campaign Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Spend</TableHead>
                          <TableHead>Return</TableHead>
                          <TableHead>ROI</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Weekend Special</TableCell>
                          <TableCell>$1,200</TableCell>
                          <TableCell>$5,400</TableCell>
                          <TableCell className="text-green-500">4.5x</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Happy Hour</TableCell>
                          <TableCell>$800</TableCell>
                          <TableCell>$2,700</TableCell>
                          <TableCell className="text-green-500">3.4x</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Print Ads</TableCell>
                          <TableCell>$2,000</TableCell>
                          <TableCell>$2,400</TableCell>
                          <TableCell className="text-red-500">1.2x</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Social Media</TableCell>
                          <TableCell>$1,500</TableCell>
                          <TableCell>$5,700</TableCell>
                          <TableCell className="text-green-500">3.8x</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Revenue Growth Strategy</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your data, implementing a tiered pricing structure for peak vs. off-peak hours could increase your average transaction value by 15%. Your historical data shows customers are willing to pay premium prices during Thursday-Sunday evenings.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Marketing Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Your social media campaigns targeting the 25-34 demographic have the highest conversion rate. We recommend increasing budget allocation to Instagram and TikTok campaigns by 30%, which could result in a 22% increase in new customer acquisition.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Operational Efficiency</h4>
                    <p className="text-sm text-muted-foreground">
                      Staffing levels are 18% higher than needed during Monday-Wednesday. Optimizing your staff schedule could reduce labor costs by approximately $2,300 per month without impacting customer service quality.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    These insights are based on your uploaded financial data combined with Vibe Right Now analytics and industry benchmarks. For a detailed consultation, please book a session with a Vernon Concierge specialist.
                  </p>
                </CardFooter>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsFileUpload;
