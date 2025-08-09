import z from "zod";

export const imageFileSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
});

export interface ImageFile extends z.infer<typeof imageFileSchema> {}
