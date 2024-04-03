/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "t3.ftcdn.net",
      "tailwindui.com",
      "ujfmhfambjwfboketpby.supabase.co",
      "drive.google.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   // async redirects() {
//   //   return [
//   //     {
//   //       source: "/",
//   //       destination: "/index",
//   //       permanent: true,
//   //     },
//   //   ];
//   // },
//   images: {
//     domains: ["t3.ftcdn.net", "tailwindui.com"],
//   },
// };
