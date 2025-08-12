import { z } from "zod";
export const userIdScheme = z.object({
  id: z.number(),
});
export const userCountScheme = z.object({
  userCount: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
});
export interface UserID extends z.infer<typeof userIdScheme> {}
