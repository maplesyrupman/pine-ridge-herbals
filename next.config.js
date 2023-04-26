/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    appDir: true
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tailwindui.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'cdn.swell.store',
          port: ''
        }
      ],
    },
  }
