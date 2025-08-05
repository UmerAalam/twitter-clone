import { Hono } from "hono";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
config();
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const awsRouter = new Hono()
  .basePath("upload")
  .use(authMiddleware)
  .get("/", async (c) => {
    const fileName = c.req.query("fileName");
    const contentType = c.req.query("contentType") || "image/png";

    if (!fileName) return c.text("Missing fileName", 400);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return c.json({ uploadUrl: signedUrl, fileUrl });
  });
