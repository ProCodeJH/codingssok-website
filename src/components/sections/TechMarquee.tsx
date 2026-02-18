"use client";

import { motion } from "framer-motion";

/*
  TechMarquee — 수업 키워드/기술 스택이 흘러가는 마키 라인
  *(noah 스타일 텍스트 마키 + heroines 시각적 리듬)*
  Hero와 WhyUs 사이에 배치
*/

const KEYWORDS = [
    { text: "C언어", emoji: "💻" },
    { text: "Python", emoji: "🐍" },
    { text: "HTML/CSS", emoji: "🌐" },
    { text: "알고리즘", emoji: "🧩" },
    { text: "정보올림피아드", emoji: "🏆" },
    { text: "정보처리기능사", emoji: "📜" },
    { text: "게임 개발", emoji: "🎮" },
    { text: "앱 개발", emoji: "📱" },
    { text: "AI / 머신러닝", emoji: "🤖" },
    { text: "프로젝트 포트폴리오", emoji: "📁" },
    { text: "소수 정예", emoji: "👨‍🏫" },
    { text: "1:6 밀착 코칭", emoji: "🎯" },
];

function MarqueeRow({ reverse = false, speed = 30 }: { reverse?: boolean; speed?: number }) {
    const items = [...KEYWORDS, ...KEYWORDS]; // duplicate for seamless loop

    return (
        <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
            {/* Gradient fades */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, var(--color-beige), transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, var(--color-beige), transparent)", zIndex: 2, pointerEvents: "none" }} />

            <motion.div
                animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
                style={{ display: "flex", gap: "clamp(16px, 3vw, 28px)", width: "max-content" }}
            >
                {items.map((kw, i) => (
                    <div
                        key={`${kw.text}-${i}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 20px",
                            borderRadius: 999,
                            border: "1.5px solid rgba(0,0,0,0.06)",
                            background: "rgba(255,255,255,0.6)",
                            backdropFilter: "blur(8px)",
                            whiteSpace: "nowrap",
                            fontSize: "clamp(13px, 1.5vw, 15px)",
                            fontWeight: 500,
                            color: "#555",
                            transition: "all 0.3s",
                            flexShrink: 0,
                        }}
                    >
                        <span style={{ fontSize: "clamp(16px, 2vw, 20px)" }}>{kw.emoji}</span>
                        {kw.text}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function TechMarquee() {
    return (
        <section style={{
            padding: "clamp(32px, 5vw, 56px) 0",
            background: "var(--color-beige)",
            overflow: "hidden",
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 16px)" }}>
                <MarqueeRow speed={35} />
                <MarqueeRow reverse speed={28} />
            </div>
        </section>
    );
}
