/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'api.furrymarket.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
