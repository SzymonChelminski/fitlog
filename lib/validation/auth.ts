import { z } from 'zod';
import { checkEmailExists } from '@/app/auth/actions';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
  email: z.email('Invalid email address').refine(
    async (mail) => {
      const exists = await checkEmailExists(mail);
      return !exists;
    },
    {
      error: 'This email address is already taken',
    },
  ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
  name: z.string().min(2, 'Name is too short'),
  age: z.coerce
    .number()
    .min(14, 'You must be at least 14 years old')
    .max(100, 'Age must be under 100'),
  gender: z.string().min(1, 'Please select your gender'),
  goal: z.string().min(1, 'Please select a goal'),
  experience: z.string().min(1, 'Please select your experience level'),
  height: z.coerce
    .number()
    .min(120, 'Height must be at least 120cm')
    .max(220, 'Height must be under 220cm'),
  weight: z.coerce
    .number()
    .min(30, 'Weight must be at least 30kg')
    .max(200, 'Weight must be under 200kg'),
});

export const resetPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required to reset the password')
    .email('Invalid email address')
    .refine(
      async (mail) => {
        const exists = await checkEmailExists(mail);
        return exists;
      },
      {
        message: 'This email address does not exist in our system',
      },
    ),
});

export const resetPasswordSchema = signUpSchema.pick({ password: true });

export type resetPasswordEmailData = z.infer<typeof resetPasswordEmailSchema>;
export type resetPasswordData = z.infer<typeof resetPasswordSchema>;
export type signUpData = z.infer<typeof signUpSchema>;
export type signInData = z.infer<typeof signInSchema>;
