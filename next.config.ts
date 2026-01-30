import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "teletv-production.obsv3.et-global-1.ethiotelecom.et",
        port: "",
        pathname: "/connect-dev/banks/**",
      },
      {
        protocol: "https",
        hostname: "img.adeylab.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
