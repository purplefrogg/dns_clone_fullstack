// @ts-check
import nextTranslate from 'next-translate-plugin'
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },

  async redirects() {
    return []
  },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        locale: false,
        headers: [
          {
            key: 'content-language',
            value: 'en',
          },
        ],
      },
      {
        source: '/ru/:path*',
        locale: false,
        headers: [
          {
            key: 'content-language',
            value: 'ru',
          },
        ],
      },
    ]
  },
}
export default nextTranslate(config)
