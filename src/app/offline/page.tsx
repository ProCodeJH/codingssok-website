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
            <div style={{ fontSize: 64 }}>📡</div>
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
                }}
            >
                🔄 다시 시도
            </button>
            <Link href="/" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", marginTop: 8 }}>
                ← 홈으로
            </Link>
        </div>
    );
}
