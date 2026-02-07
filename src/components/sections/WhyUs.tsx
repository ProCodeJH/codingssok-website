"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  nodcoding "Why Nod?" section → 코딩쏙 "왜 코딩쏙?"
  4 value props in a grid with staggered reveal
*/

const reasons = [
    {
        number: "01",
        title: "현직 IT 전문가 직강",
        desc: "교과서 이론이 아닌, 현업에서 바로 쓰는 실전 코딩을 가르칩니다. 8년 이상의 IT 경력과 교육 노하우를 갖춘 전문가가 직접 수업합니다.",
        color: "var(--color-brand-1)",
    },
    {
        number: "02",
        title: "프로젝트 중심 학습",
        desc: "코딩은 직접 해봐야 합니다. 자격증 준비부터 공모전 출품까지 — 포트폴리오가 되는 실전 프로젝트로 배웁니다.",
        color: "var(--color-brand-4)",
    },
    {
        number: "03",
        title: "소수 정예 맞춤 수업",
        desc: "최대 6명 소규모 클래스. 학생 하나하나의 수준과 목표에 맞춰 커리큘럼을 조정하는 진짜 맞춤형 교육입니다.",
        color: "var(--color-brand-3)",
    },
    {
        number: "04",
        title: "검증된 성과",
        desc: "정보올림피아드 수상, 자격증 취득률 95%, 학생부 세특 완성까지. 결과로 증명하는 코딩 교육입니다.",
        color: "var(--color-brand-5)",
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
                    style={{ marginBottom: 80, maxWidth: 600 }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Why 코딩쏙?
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                        왜 코딩쏙을<br />선택해야 할까요?
                    </h2>
                </motion.div>

                {/* 4 value props grid */}
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
                            <span style={{ fontSize: "var(--font-size-t-sm)", color: r.color, fontWeight: 600 }}>
                                {r.number}
                            </span>
                            <h3 style={{ fontSize: "var(--font-size-t-xl)", fontWeight: 600, color: "var(--color-black)", margin: "16px 0 12px", lineHeight: 1.1 }}>
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
