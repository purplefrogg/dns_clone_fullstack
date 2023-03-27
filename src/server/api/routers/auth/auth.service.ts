import { TRPCError } from '@trpc/server'
import { hash } from 'bcrypt'
import { type z } from 'zod'
import { prisma } from '~/server/db'
import { type signUpSchema } from './auth.dto'

const signUp = async (input: z.infer<typeof signUpSchema>) => {
  const { email, password, name, phone, address } = input
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (userExists) {
    throw new TRPCError({
      message: 'User already exists',
      code: 'CONFLICT',
    })
  }
  const hashedPassword = await hash(password, 5)
  const user = await prisma.user.create({
    data: {
      role: 'ADMIN',
      email,
      password: hashedPassword,
      name,
      phone,
      address,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  })
  return user
}

export const authService = {
  signUp,
}
