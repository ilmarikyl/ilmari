/**
 * @type {import('next').NextConfig}
 */

const nextTranslate = require('next-translate-plugin')

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  i18n: {
    locales: ['en', 'fi'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  eslint: {
    // Warning: 'true' allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Configure SVGR for SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextTranslate(nextConfig)
A