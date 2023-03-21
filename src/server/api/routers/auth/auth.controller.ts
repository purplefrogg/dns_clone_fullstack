import { authedProcedure, createTRPCRouter } from '../../trpc'

import { publicProcedure } from '../../trpc'
import { signUpSchema } from './auth.dto'
import { authService } from './auth.service'

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    return await authService.signUp(input)
  }),
  getProfile: authedProcedure.query(({ ctx }) => {
    return ctx.session.user
  }),
})
