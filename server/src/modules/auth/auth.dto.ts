import { z } from "zod";

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
  avatar: z.string().url(),
});
export const userWithoutPasswordScheme = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  avatar: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export interface UserWithoutPassword
  extends z.infer<typeof userWithoutPasswordScheme> {}
export interface UserEmail extends z.infer<typeof userEmailSchema> {}
export interface SignIn extends z.infer<typeof signInSchema> {}
export interface SignUp extends z.infer<typeof signUpSchema> {}
export interface User extends z.infer<typeof userSchema> {}
