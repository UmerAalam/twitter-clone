import z from "zod";

export const baseCommentSchema = z.object({
  name: z.string().min(1),
  username: z.string(),
  time: z.string(),
  text: z.string(),
  comments: z.number(),
  reposts: z.number(),
  likes: z.number(),
  shares: z.number(),
});

export const commentSchema = baseCommentSchema.merge(
  z.object({
    id: z.string(),
  }),
);

export const createCommentSchema = baseCommentSchema;

export const updateCommentSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const deleteCommentSchema = z.object({
  id: z.string(),
});

export const findOneCommentSchema = z.object({
  id: z.string(),
});

export const findManyCommentSchema = z.object({});

export interface BaseComment extends z.infer<typeof baseCommentSchema> {}
export interface Comment extends z.infer<typeof commentSchema> {}
export interface CreateComment extends z.infer<typeof createCommentSchema> {}
export interface UpdateComment extends z.infer<typeof updateCommentSchema> {}
export interface DeleteComment extends z.infer<typeof deleteCommentSchema> {}
export interface FindOneComment extends z.infer<typeof findOneCommentSchema> {}
export interface FindManyComment
  extends z.infer<typeof findManyCommentSchema> {}
