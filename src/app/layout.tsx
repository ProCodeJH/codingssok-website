import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "코딩쏙 | AI 시대 역량을 '쏙' 채우는 코딩 교육",
  description: "C·Python 중심 텍스트코딩 강화로 프로젝트 · 공모전 · 자격증까지 대비합니다. IT 현직자가 가르치는 코딩 학원.",
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
