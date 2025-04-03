import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

// Ensure AWS credentials are loaded
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("Missing AWS credentials in environment variables.");
}

// Configure AWS SDK v3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function GET(req: NextRequest) {
    try {
        const command = new ListBucketsCommand({});
        const response = await s3.send(command);
        return NextResponse.json({ buckets: response.Buckets });
    } catch (error) {
        console.error("S3 Error:", error);
        return NextResponse.json({ error: "Failed to connect to S3" }, { status: 500 });
    }
}
