import { NextRequest, NextResponse } from "next/server";
import { TextractClient, StartDocumentTextDetectionCommand, GetDocumentTextDetectionCommand } from "@aws-sdk/client-textract";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const textract = new TextractClient({ region: process.env.AWS_REGION });
const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(req: NextRequest) {
    try {
        const { fileUrl } = await req.json();
        if (!fileUrl) {
            return NextResponse.json({ error: "File URL is required" }, { status: 400 });
        }

        // Extract bucket name and key from the file URL
        const bucketName = process.env.AWS_S3_BUCKET_NAME!;
        const fileKey = fileUrl.split(`.amazonaws.com/`)[1];

        // Start Textract job
        const startCommand = new StartDocumentTextDetectionCommand({
            DocumentLocation: { S3Object: { Bucket: bucketName, Name: fileKey } }
        });

        const startResponse = await textract.send(startCommand);
        const jobId = startResponse.JobId;
        console.log("Textract Job Started:", jobId);

        // Wait and fetch results (Polling)
        let jobStatus = "IN_PROGRESS";
        let extractedText = "";

        while (jobStatus === "IN_PROGRESS") {
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds

            const getResultCommand = new GetDocumentTextDetectionCommand({ JobId: jobId! });
            const result = await textract.send(getResultCommand);

            jobStatus = result.JobStatus!;
            if (jobStatus === "SUCCEEDED" && result.Blocks) {
                extractedText = result.Blocks.filter((block) => block.BlockType === "LINE")
                    .map((block) => block.Text)
                    .join("\n");
            }
        }

        return NextResponse.json({ text: extractedText });
    } catch (error) {
        console.error("Textract Extraction Error:", error);
        return NextResponse.json({ error: "Text extraction failed" }, { status: 500 });
    }
}
