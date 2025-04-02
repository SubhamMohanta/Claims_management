"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, Clock, FileText, Zap } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="container mx-auto py-12 px-48 space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Medical Claims Dashboard</h2>
                <p className="text-sm font-medium text-muted-foreground">AI-Powered Processing System</p>
            </div>

            <Alert className="flex items-center justify-between border-none bg-accent">
                <div className="flex items-center gap-4">
                    <Zap className="h-5 w-5" />
                    <div>
                        <AlertTitle>AI Processing Active</AlertTitle>
                        <AlertDescription>System is actively processing claims with 99.2% accuracy</AlertDescription>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="hover:cursor-pointer">View Details</Button>
            </Alert>

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
                                <TableHead>Patient</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden sm:table-cell">Amount</TableHead>
                                <TableHead className="hidden sm:table-cell">Submitted</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[{ id: "CLM-2024-001", patient: "John Doe", status: "Approved", amount: "$1,234.56", date: "Mar 15, 2024" },
                            { id: "CLM-2024-002", patient: "Alice Smith", status: "Pending", amount: "$2,567.89", date: "Mar 14, 2024" },
                            { id: "CLM-2024-003", patient: "Robert Johnson", status: "Rejected", amount: "$3,891.23", date: "Mar 14, 2024" }].map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell className="font-medium">{claim.id}</TableCell>
                                    <TableCell>{claim.patient}</TableCell>
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
                                    <TableCell className="hidden sm:table-cell">{claim.date}</TableCell>
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
