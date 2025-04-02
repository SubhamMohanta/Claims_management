"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, Clock, FileText, UploadIcon } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="container mx-auto py-12 px-48 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Medical Claims History</h2>
                <Button className="hover:cursor-pointer"><UploadIcon/>Upload Claim</Button>
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
