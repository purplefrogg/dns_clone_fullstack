import { createTRPCRouter } from '../../trpc'
import { signIn } from './signIn'
import { signUp } from './signUp'

export const authRouter = createTRPCRouter({
  signUp: signUp,
  signIn: signIn,
})
