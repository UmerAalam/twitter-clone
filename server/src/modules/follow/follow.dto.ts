import z from "zod";
export const followSchema = z.object({
  followerId: z.coerce.number(), // The person who will be follow
  followingId: z.coerce.number().optional(), //The person who is following
  createdAt: z.string().optional(),
});

export const findfollowersSchema = z.object({
  userId: z.coerce.number(),
});

export const findfollowingsSchema = z.object({
  userId: z.coerce.number(),
});

export interface Follow extends z.infer<typeof followSchema> {}
