/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          "https://smartruga-api-d11b7da5a7fa.herokuapp.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
