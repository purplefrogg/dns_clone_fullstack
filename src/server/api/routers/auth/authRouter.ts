import { authedProcedure, createTRPCRouter } from '../../trpc'
import { signUp } from './signUp'

export const authRouter = createTRPCRouter({
  signUp: signUp,
  getProfile: authedProcedure.query(({ ctx }) => {
    return ctx.session.user
  }),
})
