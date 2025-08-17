import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const SigninFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .trim(),
});


/**
 * @typedef {Object} FormState
 * @property {Object} [errors]
 * @property {string[]} [errors.name]
 * @property {string[]} [errors.email]
 * @property {string[]} [errors.password]
 * @property {string[]} [errors.confirmPassword]
 * @property {string} [message]
 */

/**
 * @typedef {Object} SigninState
 * @property {Object} [errors]
 * @property {string[]} [errors.email]
 * @property {string[]} [errors.password]
 * @property {string} [message]
 */

/**
 * @typedef {Object} AuthResult
 * @property {string|null} error
 * @property {string|null} success
 * @property {Record<string, string[]>} [errors]
 */
