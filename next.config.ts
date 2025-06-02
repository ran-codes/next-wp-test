import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static export for SSG
  trailingSlash: true, // Required for static export
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.WORDPRESS_HOSTNAME}`,
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Remove redirects for static export
  // async redirects() {
  //   return [
  //     {
  //       source: "/admin",
  //       destination: `${process.env.WORDPRESS_URL}/wp-admin`,
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
