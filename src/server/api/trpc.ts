/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

import { prisma } from '~/server/db'

type CreateContextOptions = Record<string, never>

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
  }
}

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({})
}

import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,

  errorFormatter({ shape }) {
    return shape
  },
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure
