
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Upload, File, X } from "lucide-react";

interface FileUploadProps {
  onUpload: (files: string[]) => void;
}

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const simulateFileUpload = () => {
    const mockFiles = [
      'wireframes_v2.pdf',
      'user_flow_diagram.png',
      'style_guide.figma'
    ];
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    const newFiles = [...uploadedFiles, randomFile];
    setUploadedFiles(newFiles);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    onUpload(uploadedFiles);
  };

  return (
    <Card className="border-2 border-trust-blue/30 bg-gradient-to-br from-trust-blue/5 to-trust-blue/10">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-trust-blue flex items-center justify-center">
            <Paperclip className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-trust-blue">Share Files</h4>
            <p className="text-sm text-muted-foreground">Upload deliverables and project files</p>
          </div>
        </div>

        <div className="space-y-4">
          <div 
            onClick={simulateFileUpload}
            className="border-2 border-dashed border-trust-blue/30 rounded-lg p-6 text-center hover:border-trust-blue/50 transition-colors cursor-pointer"
          >
            <Upload className="h-8 w-8 text-trust-blue mx-auto mb-2" />
            <p className="text-sm font-medium text-trust-blue">Click to upload files</p>
            <p className="text-xs text-muted-foreground">PDF, PNG, FIGMA, PSD up to 10MB</p>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Files to upload:</span>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-white rounded border">
                  <File className="h-4 w-4 text-trust-blue" />
                  <span className="text-sm flex-1">{file}</span>
                  <Badge variant="secondary" className="text-xs">2.3 MB</Badge>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="flex gap-3">
              <Button onClick={handleUpload} className="bg-trust-blue hover:bg-trust-blue-light flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Share {uploadedFiles.length} File{uploadedFiles.length > 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;
