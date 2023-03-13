import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const signUp = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(3),
      name: z.string().min(1),
      phone: z.string().min(1),
      address: z.string().min(1).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { email, password, name, phone, address } = input
    const userExists = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userExists) {
      throw new TRPCError({
        message: 'User already exists',
        code: 'BAD_REQUEST',
      })
    }

    const user = await ctx.prisma.user.create({
      data: {
        email,
        password,
        name,
        phone,
        address,
      },
    })

    return user
  })
