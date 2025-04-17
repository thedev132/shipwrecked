import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
  typescript: {
    // Don't fail build on TS errors for production
    ignoreBuildErrors: false,
  },
  eslint: {
    // Don't fail build on ESLint errors for production
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // For static export
  },
  // Ensure Next.js listens on all network interfaces
  hostname: '0.0.0.0',
  port: process.env.PORT || 8080
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)