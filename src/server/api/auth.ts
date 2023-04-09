import { prisma } from '~/server/db'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { type Session, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
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
    signIn({ account, user }) {
      if (account?.provider === 'google') {
        user.role = 'ADMIN'
      }
      return true
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
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Next Auth',
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
