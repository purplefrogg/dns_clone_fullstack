import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const signIn = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(3),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { email, password } = input
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    })
    const valid = user?.password === password
    if (!valid) {
      throw new TRPCError({
        message: 'Invalid email or password',
        code: 'BAD_REQUEST',
      })
    }
    return user
  })
