/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['finote-image-bucket.s3.ap-northeast-2.amazonaws.com', 'encrypted-tbn0.gstatic.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
