import NextAuth from 'next-auth'
import { authOptions } from '~/server/api/auth'

export default NextAuth(authOptions)
