import z from "zod";
export const followSchema = z.object({
  followerId: z.coerce.number(),
  followingId: z.coerce.number().optional(),
  createdAt: z.string().optional(),
});

export interface Follow extends z.infer<typeof followSchema> {}
