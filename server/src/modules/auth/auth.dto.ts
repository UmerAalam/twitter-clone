import { optional, z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const userEmailSchema = z.object({
  email: z.string().email(),
});

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
export const userWithoutPasswordScheme = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  bio: z.string().max(100).optional(),
  avatar: z.string().url().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});
export const userWithoutEmailScheme = z.object({
  id: z.number(),
  name: z.string(),
  bio: z.string().max(100),
  avatar: z.string().url().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  bio: z.string().max(100).optional(),
  avatar: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const updatedUserSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  bio: z.string().max(100).optional(),
  avatar: z.string().url().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export interface UserWithoutPassword
  extends z.infer<typeof userWithoutPasswordScheme> {}
export interface UserWithoutEmail
  extends z.infer<typeof userWithoutEmailScheme> {}
export interface UserEmail extends z.infer<typeof userEmailSchema> {}
export interface SignIn extends z.infer<typeof signInSchema> {}
export interface SignUp extends z.infer<typeof signUpSchema> {}
export interface User extends z.infer<typeof userSchema> {}
export interface UpdatedUser extends z.infer<typeof updatedUserSchema> {}
