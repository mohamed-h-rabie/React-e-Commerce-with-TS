import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(2, { message: "firstName is required" }),
    lastName: z.string().min(2, { message: "LastName is required" }),
    email: z.string().min(2, { message: "email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });
type signUpType = z.infer<typeof signUpSchema>;
export { signUpSchema, type signUpType };
