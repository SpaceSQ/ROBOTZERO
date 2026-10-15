import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["nodemailer"],
  async redirects() {
    return [
      { source: "/RAS", destination: "https://www.robot0.com/RAS", permanent: false },
      { source: "/RAS/:path*", destination: "https://www.robot0.com/RAS", permanent: false },
    ];
  },
};

export default nextConfig;
