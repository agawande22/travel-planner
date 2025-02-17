/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'openweathermap.org',
            port: '',
            pathname: '/img/wn/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'lh5.googleusercontent.com',
            port: '',
            pathname: '/p/**'
          },
        ],
      },
};

export default nextConfig;
