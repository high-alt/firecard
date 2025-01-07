import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, {isServer}) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    if (isServer) {
      // Exclude the functions folder from the server-side build
      config.externals = [
        ...(config.externals || []),
        /\/functions\//,  // You can use the actual path for your functions folder
      ];
    }

    return config
  }};

export default nextConfig;
