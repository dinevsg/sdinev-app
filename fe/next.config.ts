import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true, // <-- bypass ESLint errors during production build
    },
};

export default nextConfig;