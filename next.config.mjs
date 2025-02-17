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
            hostname: 'google.com',
            port: '',
            pathname: '/maps/place/**'
          },
        ],
      },
};

export default nextConfig;
