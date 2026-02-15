"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  Why 코딩쏙 — 운영 차별점
  "남들 4번 배울 때, 코딩쏙 아이들은 한 번 더 배웁니다."
*/

const reasons = [
    {
        number: "01",
        title: "월 5회/8회 시스템",
        desc: "한 달 4회는 진도 나가기 바쁩니다. 코딩쏙은 4번의 프로젝트와 1번의 '플러스 쏙(1:1 보완)'으로 배움을 완성합니다.",
        color: "var(--color-brand-1)",
        icon: "📅",
    },
    {
        number: "02",
        title: "90분 몰입 수업",
        desc: "초등학생 집중력이 가장 높은 90분 수업. 더 자주, 더 즐겁게 만나며 코딩 습관을 만듭니다.",
        color: "var(--color-brand-4)",
        icon: "⏱️",
    },
    {
        number: "03",
        title: "1:6 소수 정예",
        desc: "선생님의 기준이 아닌 아이의 속도에 맞춘 밀착 코칭과 매주 발송되는 성장 리포트로 안심을 더합니다.",
        color: "var(--color-brand-3)",
        icon: "👨‍🏫",
    },
];

export default function WhyUs() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-white)",
            }}
        >
            <div className="container-nod">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 80, maxWidth: 700 }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Why 코딩쏙?
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                        남들 4번 배울 때,<br />코딩쏙 아이들은 한 번 더 배웁니다.
                    </h2>
                </motion.div>

                {/* 3 value props grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
                    {reasons.map((r, i) => (
                        <motion.div
                            key={r.number}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                padding: "40px 0",
                                borderTop: `2px solid ${r.color}`,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <span style={{ fontSize: 32 }}>{r.icon}</span>
                                <span style={{ fontSize: "var(--font-size-t-sm)", color: r.color, fontWeight: 600 }}>
                                    {r.number}
                                </span>
                            </div>
                            <h3 style={{ fontSize: "var(--font-size-t-xl)", fontWeight: 600, color: "var(--color-black)", margin: "0 0 12px", lineHeight: 1.1 }}>
                                {r.title}
                            </h3>
                            <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-grey)", lineHeight: 1.6 }}>
                                {r.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
