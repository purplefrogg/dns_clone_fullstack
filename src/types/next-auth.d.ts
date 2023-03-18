import { type DefaultSession } from 'next-auth'
type UserRole = 'ADMIN' | 'USER'
declare module 'next-auth' {
  interface User {
    id: number
    name: string
    email: string
    role: UserRole
  }

  interface Session extends DefaultSession {
    user: {
      id: number
      name: string
      email: string
      role: UserRole
      // ...other properties
      // role: UserRole;
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: number
    name: string
    email: string
    role: UserRole
  }
}
