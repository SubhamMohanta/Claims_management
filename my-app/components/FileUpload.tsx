"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function MedicalDocumentUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [extractedData, setExtractedData] = useState({
        patientName: "",
        claimAmount: "",
        serviceDate: "",
    });
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!file) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                },
            });

            if (response.data.fileUrl) {
                extractInformation(response.data.fileUrl);
            }
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    const extractInformation = async (fileUrl: string) => {
        try {
            const response = await axios.post("/api/extract", { fileUrl });
            setExtractedData(response.data);
        } catch (error) {
            console.error("Extraction failed", error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Card className="p-6 w-full max-w-lg mx-auto">
            <CardContent className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Process Medical Document</h2>
                <p className="text-sm text-gray-500">
                    Upload medical claims and documents for AI processing
                </p>

                <div className="border border-dashed rounded-lg p-4 text-center">
                    <Input type="file" onChange={handleFileChange} />
                    <Button className="mt-3" onClick={uploadFile} disabled={!file || processing}>
                        Upload & Process
                    </Button>
                </div>

                {processing && (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Processing Status</span>
                            <Badge variant="destructive">Processing</Badge>
                        </div>
                        <Progress value={uploadProgress} />
                    </div>
                )}

                <div className="border rounded-lg p-4 bg-gray-100">
                    <h3 className="text-sm font-semibold">Extracted Information</h3>
                    <div className="text-sm text-gray-700">
                        <p><strong>Patient Name:</strong> {extractedData.patientName || "Extracting..."}</p>
                        <p><strong>Claim Amount:</strong> {extractedData.claimAmount || "Extracting..."}</p>
                        <p><strong>Service Date:</strong> {extractedData.serviceDate || "Extracting..."}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
