import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
const s3 = new AWS.S3();

function base64ToBuffer(base64String: string): Buffer {
  const raw = base64String.split(",")[1];
  return Buffer.from(raw, "base64");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { file, filePath } = req.body;

    const imageBuffer = base64ToBuffer(file);

    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
      Key: filePath,
      Body: imageBuffer,
    };
    try {
      const uploadResponse = await s3.upload(uploadParams).promise();
      res.status(200).json({ imagePath: uploadResponse.Location });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
