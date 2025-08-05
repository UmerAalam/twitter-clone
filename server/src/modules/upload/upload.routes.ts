import { Hono } from "hono";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import { imageFileSchema } from "./upload.dto.js";
config();
console.log(process.env.AWS_ACCESS_KEY_ID);
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function CheckAWSConfig() {
  if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY) {
    return false;
  } else return true;
}

export const awsRouter = new Hono()
  .basePath("upload")
  .use(authMiddleware)
  .get("/", async (c) => {
    try {
      console.log("Reached upload endpoint");

      const fileName = c.req.query("fileName");
      const contentType = c.req.query("contentType") || "image/*";

      console.log("fileName:", fileName);

      if (!fileName) return c.text("Missing fileName", 400);

      if (!process.env.AWS_S3_BUCKET) {
        throw new Error("AWS_BUCKET_NAME not configured");
      }

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        ContentType: contentType,
      });

      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      return c.json({ uploadUrl: signedUrl, fileUrl });
    } catch (error) {
      console.error("Upload error:", error);
      return c.json({ error: error.message }, 500);
    }
  });
