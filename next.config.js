/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/wp-content/:path*",
        destination: `${process.env.WP_URL}/wp-content/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
