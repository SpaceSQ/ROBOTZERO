import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["nodemailer"],
  async redirects() {
    return [{ source: "/RAS/legal.html", destination: "/RAS/legal", permanent: false }];
  },
};

export default nextConfig;
