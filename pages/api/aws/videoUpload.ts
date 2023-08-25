import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send(req);
  if (req.method === "POST") {
    const fileContent = await streamToBuffer(req);
    const rawFileName = req.headers["File-Name"];
    const fileName = Array.isArray(rawFileName) ? rawFileName[0] : rawFileName;

    // Check if the header exists
    // if (!rawFileName) {
    //   res.status(400).json({ error: "File name header is missing." });
    //   return;
    // }

    // // Handle the possibility of an array
    // const fileName = Array.isArray(rawFileName)
    //   ? decodeURIComponent(rawFileName[0])
    //   : decodeURIComponent(rawFileName);
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName!,
      Body: fileContent,
      ContentType: req.headers["content-type"],
    };
    try {
      const uploadResponse = await s3.upload(uploadParams).promise();
      res.status(200).json({ success: true, url: uploadResponse.Location });
    } catch (error) {
      res.status(500).json({ error });
    }
    // const uploadParams = {
    //   Bucket: process.env.S3_BUCKET!,
    //   Key: filePath,
    //   Body: file,
    // };
    // try {
    //   const uploadResponse = await s3.upload(uploadParams).promise();
    //   res.status(200).json({ imagePath: uploadResponse.Location });
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}

function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
