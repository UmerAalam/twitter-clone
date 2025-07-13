import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    name: z.string(),
    avatar: z.string().url(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export interface SignIn extends z.infer<typeof signInSchema> {}
export interface SignUp extends z.infer<typeof signUpSchema> {}

export interface User extends z.infer<typeof signUpSchema> {
  id: string;
}
