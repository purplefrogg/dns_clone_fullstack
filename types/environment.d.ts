declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_TOKEN: string
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      DATABASE_URL: string
      SECRET_TOKEN: string

      MINIO_ACCESS_KEY: string
      MINIO_SECRET_KEY: string
      NEXT_PUBLIC_STATIC_URL: string

      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string

      EMAIL_SERVER_HOST: string
      EMAIL_SERVER_PORT: number
      EMAIL_SERVER_USER: string
      EMAIL_SERVER_PASSWORD: string
      EMAIL_FROM: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
