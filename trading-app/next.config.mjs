import withTM from 'next-transpile-modules';

const transpileModules = ['react-financial-charts']; // Should be an array

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Change to 'https' if you're fetching from a secure source
        hostname: 'coin-images.coingecko.com',
        pathname: '/**', // Allow any path under this domain
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**', // Allow any path under the '/uploads/' directory
      },
    ],
  },
};

export default withTM(transpileModules)(nextConfig);
