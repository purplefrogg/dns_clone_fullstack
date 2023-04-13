import { TRPCError } from '@trpc/server'
import { compare, hash } from 'bcrypt'
import { z } from 'zod'
import { authedProcedure, createTRPCRouter } from '../../trpc'

import { publicProcedure } from '../../trpc'
import { signUpSchema } from './auth.dto'
import { authService } from './auth.service'

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    return await authService.signUp(input)
  }),
  getProfile: authedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirstOrThrow({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        Account: true,
      },
    })
    return {
      ...user,
      password: Boolean(user.password),
    }
  }),
  setPassword: authedProcedure
    .input(
      z.object({ newPassword: z.string(), oldPassword: z.string().optional() })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      })
      if (user.password) {
        const validPassword = await compare(
          input.oldPassword || '',
          user.password
        )
        if (!validPassword) {
          throw new TRPCError({
            code: 'CONFLICT',
          })
        }
      }

      const newPassword = await hash(input.newPassword, 5)
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          password: newPassword,
        },
      })
    }),
})
