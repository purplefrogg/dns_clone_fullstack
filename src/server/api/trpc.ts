import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { prisma } from '~/server/db'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { type Session } from 'next-auth'
import { type language } from '@prisma/client'

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null
  lang: language
}

export function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    prisma,
    lang: opts?.lang || 'EN',
    session: opts?.session,
    ...opts,
  }
}
export const createTRPCContext = async ({
  req,
  res,
}: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, authOptions)

  const lang = req.headers?.['x-language']
    ? req.headers?.['x-language']
    : req.headers.referer?.split('/')[3]
  const language = lang === 'ru' ? 'RU' : 'EN'

  return createContextInner({
    req,
    res,
    session,
    lang: language,
  })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,

  errorFormatter({ shape }) {
    return shape
  },
})

export const createTRPCRouter = t.router
export const createMiddleware = t.middleware
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})
const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user || ctx.session.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})
export const authedProcedure = t.procedure.use(enforceUserIsAuthed)
export const adminProcedure = t.procedure.use(enforceUserIsAdmin)
export const publicProcedure = t.procedure
