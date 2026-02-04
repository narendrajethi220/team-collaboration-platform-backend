import {z} from 'zod';

export const userSignUpSchema = z.object({
    email: z.email(),
    password: z.string(),
    username:z.string().min(3)
})