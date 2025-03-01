/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  typescript: {
    // Use the IDE for type checking during development
    ignoreBuildErrors: false, 
  },
};

module.exports = nextConfig; 