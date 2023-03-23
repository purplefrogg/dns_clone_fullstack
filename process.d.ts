declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    DATABASE_URL: string
    SECRET_TOKEN: string

    MINIO_ACCESS_KEY: string
    MINIO_SECRET_KEY: string

    NEXT_PUBLIC_STATIC_URL: string
  }
}
