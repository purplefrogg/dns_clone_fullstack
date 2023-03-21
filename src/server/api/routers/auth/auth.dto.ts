import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1).optional(),
})
