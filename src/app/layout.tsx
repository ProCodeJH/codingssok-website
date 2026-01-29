import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "코딩쏙 - AI 시대 역량을 '쏙' 채우는 코딩학원",
  description: "IT 아빠들이 선택한 초중고 코딩교육. C·Python 중심 텍스트코딩, 아두이노, 프로젝트 기반 학습, 자격증 대비까지. 대전 유성구 관평동 코딩쏙학원",
  keywords: ["코딩학원", "코딩쏙", "대전코딩", "아두이노", "파이썬", "C언어", "자격증", "컴활", "정보처리"],
  authors: [{ name: "코딩쏙학원" }],
  openGraph: {
    title: "코딩쏙 - AI 시대 역량을 '쏙' 채우는 코딩학원",
    description: "IT 아빠들이 선택한 초중고 코딩교육. 완전 초보부터 실무 개발자까지!",
    url: "https://codingssok.com",
    siteName: "코딩쏙학원",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "코딩쏙 - AI 시대 역량을 '쏙' 채우는 코딩학원",
    description: "IT 아빠들이 선택한 초중고 코딩교육",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
