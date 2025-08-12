import z from "zod";
export const followSchema = z.object({
  followerId: z.coerce.number(),
  followingId: z.coerce.number(),
  createdAt: z.string(),
});

export interface Follow extends z.infer<typeof followSchema> {}
