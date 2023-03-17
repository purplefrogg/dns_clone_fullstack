import { authedProcedure, createTRPCRouter } from '../../trpc'

export const authRouter = createTRPCRouter({
  getProfile: authedProcedure.query(({ ctx }) => {
    return ctx.session.user
  }),
})
