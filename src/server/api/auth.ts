import { prisma } from '~/server/db'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { type Session, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { TRPCError } from '@trpc/server'

export const authOptions: NextAuthOptions = {
  pages: {
    error: '/auth/error',
    signIn: '/auth/signIn',
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = {
          id: +user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
      return token
    },

    session: ({ session, token }): Session => {
      if (token) {
        session.user = {
          id: +token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        }
      }
      return session
    },
    signIn: ({ account, user }) => {
      if (account?.provider === 'google') {
        user.role = 'USER'
      }

      return true
    },
  },

  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,

        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },

      type: 'email',
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'Any credentials work',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        })
        if (!user) {
          return null
        }
        if (!user.password) {
          throw new TRPCError({
            code: 'CONFLICT',
          })
        }

        const validPassword = await compare(
          credentials?.password ?? '',
          user.password
        )
        if (!validPassword) {
          return null
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
}
