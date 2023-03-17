declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    DATABASE_URL: string
    SECRET_TOKEN: string
  }
}
