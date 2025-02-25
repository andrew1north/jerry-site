/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ignore peer dependency warnings for react-social-media-embed
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Force all modules to use the same React instance
      'react': require.resolve('react'),
      'react-dom': require.resolve('react-dom')
    };
    return config;
  }
};

module.exports = nextConfig; 