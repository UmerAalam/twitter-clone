import z from "zod";
export const followSchema = z.object({
  currentUser: z.coerce.number().optional(), // The person who will be follow
  targetUser: z.coerce.number(), //The person who is following
  createdAt: z.string().optional(),
});

export const deleteFollowSchema = z.object({
  targetUser: z.coerce.number(),
});
export const findfollowersSchema = z.object({
  targetUser: z.coerce.number(),
});

export const followersFollowingCountScheme = z.object({
  targetUser: z.coerce.number(),
});
export const findfollowingsSchema = z.object({
  targetUser: z.coerce.number(),
});

export interface Follow extends z.infer<typeof followSchema> {}
