
import { useState } from "react";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UploadSectionProps {
  onFileChange: (file: File) => void;
}

const UploadSection = ({ onFileChange }: UploadSectionProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
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
  );
};

export default UploadSection;
