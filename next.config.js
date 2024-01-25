/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["t3.ftcdn.net"],
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/index",
        permanent: true,
      },
    ];
  },
};
