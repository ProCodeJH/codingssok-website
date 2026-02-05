import type { Metadata, Viewport } from "next";
import "./globals.css";

/**
 * ================================================
 * 🎯 Skills Applied:
 * - vercel-react-best-practices: SEO 메타데이터
 * - security-review: 보안 기본 설정
 * - frontend-design: 프리미엄 폰트
 * ================================================
 */

export const metadata: Metadata = {
  title: {
    default: "코딩쏙 | AI 시대 역량을 '쏙' 채우는 코딩 교육",
    template: "%s | 코딩쏙",
  },
  description: "C·Python 중심 텍스트코딩 강화로 프로젝트 · 공모전 · 자격증까지 대비합니다. IT 현직자가 가르치는 코딩 학원.",
  keywords: ["코딩학원", "코딩교육", "C언어", "Python", "Arduino", "알고리즘", "정보올림피아드", "코딩쏙"],
  authors: [{ name: "CodingSSok Academy" }],
  creator: "CodingSSok Academy",

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://codingssok.com",
    siteName: "코딩쏙",
    title: "코딩쏙 | AI 시대 역량을 '쏙' 채우는 코딩 교육",
    description: "C·Python 중심 텍스트코딩 강화. 프로젝트 · 공모전 · 자격증 대비.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "코딩쏙" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "코딩쏙 | AI 시대 코딩 교육",
    description: "C·Python 중심 텍스트코딩 강화.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0066FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen flex flex-col items-center" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#0066FF] focus:text-white focus:rounded-lg focus:top-4 focus:left-4"
        >
          본문으로 바로가기
        </a>
        <main id="main-content" className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
