"use client";
import Link from "next/link";

/* 오프라인 페이지 — PWA 오프라인 시 표시 */
export default function OfflinePage() {
    return (
        <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #EEF2FF, #F8FAFC)",
            flexDirection: "column", gap: 16, padding: 20, textAlign: "center",
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 80, height: 80, borderRadius: 20, background: "rgba(79,70,229,0.08)" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M1 1l22 22" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                    <path d="M5 12.55a10.94 10.94 0 015.17-2.39" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10.71 5.05A16 16 0 0122.56 9" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                    <path d="M1.42 9a15.91 15.91 0 014.7-2.88" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8.53 16.11a6 6 0 016.95 0" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="20" r="1" fill="#4F46E5" />
                </svg>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e1b4b" }}>오프라인 모드</h1>
            <p style={{ fontSize: 14, color: "#64748b", maxWidth: 300, lineHeight: 1.7 }}>
                인터넷 연결이 끊어졌어요.<br />
                Wi-Fi 또는 데이터를 확인해주세요.
            </p>
            <button
                onClick={() => window.location.reload()}
                style={{
                    padding: "12px 28px", borderRadius: 12, border: "none",
                    background: "#4F46E5", color: "#fff", fontWeight: 700,
                    fontSize: 14, cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 6,
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                다시 시도
            </button>
            <Link href="/" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", marginTop: 8 }}>
                ← 홈으로
            </Link>
        </div>
    );
}
