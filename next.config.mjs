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
            hostname: 'www.google.com',
            port: '',
            pathname: '/maps/place/?q=place_id:**'
          },
        ],
      },
};

export default nextConfig;
