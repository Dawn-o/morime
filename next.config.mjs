/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.myanimelist.net',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.myanimelist.net',
                pathname: '/s/common/company_logos/**',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                pathname: '/vi/**',
            }
        ],
    },
};

export default nextConfig;
