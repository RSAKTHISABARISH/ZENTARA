"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, File, CheckCircle, AlertCircle, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  }, []);

  const simulateUpload = async () => {
    if (!file) return;
    setUploadStatus("uploading");
    setUploadProgress(25);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploadProgress(100);
      setUploadStatus("success");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Upload Contract</h1>
        <p className="text-muted-foreground">
          Upload a carrier contract PDF to automatically extract rules, deadlines, and liabilities.
        </p>
      </div>

      <Card className="glass mt-8">
        <CardHeader>
          <CardTitle>Document Parser</CardTitle>
          <CardDescription>Drag and drop a PDF file here or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:bg-accent/50"
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PDF (MAX. 20MB)</p>
                </div>
                <Button variant="outline" className="mt-4">
                  Select File
                </Button>
                {/* Hidden file input would go here */}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center p-4 border rounded-lg bg-background/50">
                <File className="h-10 w-10 text-primary mr-4" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                {uploadStatus === "idle" && (
                  <Button variant="ghost" size="icon" onClick={resetUpload}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {uploadStatus === "uploading" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Extracting text and rules...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Contract parsed successfully! Ready for analysis.</span>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Failed to process contract. Please try again.</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                {uploadStatus === "success" ? (
                  <Button onClick={() => window.location.href='/insights'}>
                    View Extraction Results
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={resetUpload} disabled={uploadStatus === "uploading"}>
                      Cancel
                    </Button>
                    <Button onClick={simulateUpload} disabled={uploadStatus === "uploading"}>
                      {uploadStatus === "uploading" ? "Processing..." : "Start Processing"}
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
