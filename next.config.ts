import type { NextConfig } from "next";

/**
 * ================================================
 * 🎯 Skills Applied:
 * - vercel-react-best-practices: 이미지 최적화
 * - security-review: 보안 헤더
 * - cache-components: 캐싱 설정
 * ================================================
 */

const nextConfig: NextConfig = {
  // 이미지 최적화 (vercel-react-best-practices)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  // 보안 헤더 (security-review)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Strict Mode
  reactStrictMode: true,
};

export default nextConfig;
