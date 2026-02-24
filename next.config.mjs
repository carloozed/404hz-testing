// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co', pathname: '/**' },
      { protocol: 'https', hostname: 'i1.sndcdn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn-images.dzcdn.net', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'e-cdns-images.dzcdn.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'thumbnailer.mixcloud.com',
        pathname: '/**'
      }
    ]
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true }
};

console.log('>>> NEXT CONFIG: output=export (static export ON)');
export default nextConfig;
