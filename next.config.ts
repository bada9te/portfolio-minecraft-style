import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    /* config options here */
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
            },
        ]
    },
};

export default nextConfig;
