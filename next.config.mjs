/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            new URL('https://cdn.myanimelist.net/images/**'),
            new URL('https://img.youtube.com/vi/**')
        ],
    },
};

export default nextConfig;
