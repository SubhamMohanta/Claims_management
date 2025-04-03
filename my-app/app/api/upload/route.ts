import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    // Ensure form-data is used
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer()); // Correctly convert File to Buffer
    const fileName = `uploads/${Date.now()}-${file.name}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: file.type,
    });

    await s3.send(uploadCommand);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
