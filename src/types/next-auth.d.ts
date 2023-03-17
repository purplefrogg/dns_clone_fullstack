import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: number
    name: string
    email: string
  }

  interface Session extends DefaultSession {
    user: {
      id: number
      name: string
      email: string
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
  }
}
