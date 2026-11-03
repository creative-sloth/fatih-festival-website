/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for Cloudflare Pages — no server at runtime.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
