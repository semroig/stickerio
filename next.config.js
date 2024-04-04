/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "t3.ftcdn.net",
      },
      {
        hostname: "tailwindui.com",
      },
      {
        hostname: "ujfmhfambjwfboketpby.supabase.co",
      },
      {
        hostname: "drive.google.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
