/**
 * @type {import('next').NextConfig}
 */

const isProd = process.env.NODE_ENV === 'production'
const nextTranslate = require('next-translate')

const nextConfig = {
  assetPrefix: isProd ? '/ilmari/' : '',
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  i18n: {
    locales: ['en', 'fi'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  eslint: {
    // Warning: 'true' allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
}

module.exports = nextTranslate(nextConfig)
