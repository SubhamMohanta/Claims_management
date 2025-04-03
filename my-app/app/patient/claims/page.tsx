"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, Clock, FileText, UploadIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [extractedText, setExtractedText] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);
        setProgress(10);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            setProgress(60);

            if (!response.ok) {
                throw new Error("Failed to upload file");
            }

            const data = await response.json();
            setProgress(100);
            setUploadSuccess(true);
            console.log("File uploaded successfully:", data.fileUrl);
            
            // Fetch extracted text
            const extractResponse = await fetch("/api/extract", {
                method: "POST",
                body: JSON.stringify({ fileUrl: data.fileUrl }),
                headers: { "Content-Type": "application/json" }
            });
            
            if (!extractResponse.ok) {
                throw new Error("Failed to extract text");
            }

            const extractData = await extractResponse.json();
            setExtractedText(extractData.text);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mx-auto py-12 px-48 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Medical Claims History</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="hover:cursor-pointer"><UploadIcon /> Upload Claim</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Process Medical Document</DialogTitle>
                            <DialogDescription>Upload medical claims and documents for AI processing</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-brand-600 bg-brand-50 px-12 py-12 rounded-md">
                            <Input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
                            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                        </div>
                        {uploading && <Progress value={progress} className="w-full" />}
                        <Button onClick={handleUpload} disabled={!selectedFile || uploading}>{uploading ? "Uploading..." : "Process Document"}</Button>
                        {uploadSuccess && <p className="text-green-500">Upload Successful!</p>}
                        {extractedText && <div className="mt-4 p-4 border rounded bg-gray-100"><strong>Extracted Text:</strong> <p>{extractedText}</p></div>}
                    </DialogContent>
                </Dialog>
            </div>
            <Card className="shadow-none">
                <CardHeader>
                    <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <CardTitle>Claims Overview</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-3">
                        <Badge variant="outline" className="flex items-center justify-around space-x-1 rounded-full p-2 hover:cursor-pointer"><Clock className="h-4 w-4" /> <span>Pending</span></Badge>
                        <Badge variant="outline" className="flex items-center justify-around space-x-1 rounded-full p-2 hover:cursor-pointer"><CheckCircle className="h-4 w-4" /> <span>Approved</span></Badge>
                        <Badge variant="outline" className="flex items-center justify-around space-x-1 rounded-full p-2 hover:cursor-pointer"><AlertCircle className="h-4 w-4" /> <span>Rejected</span></Badge>
                    </div>
                    <Separator className="my-4" />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Claim ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden sm:table-cell">Approved Amount</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[{ id: "CLM-2024-001",status: "Approved", amount: "$1,234.56"},
                            { id: "CLM-2024-002", status: "Pending", amount: "$2,567.89"},
                            { id: "CLM-2024-003", status: "Rejected", amount: "$3,891.23"}].map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell className="font-medium">{claim.id}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                claim.status === "Approved"
                                                    ? "default"
                                                    : claim.status === "Pending"
                                                        ? "outline"
                                                        : "destructive"
                                            }
                                        >
                                            {claim.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{claim.amount}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
