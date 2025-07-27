import { z } from "zod";
export const userIdScheme = z.object({
  id: z.number(),
});
export const userCountScheme = z.object({
  userCount: z.number(),
});
export interface UserID extends z.infer<typeof userIdScheme> {}
