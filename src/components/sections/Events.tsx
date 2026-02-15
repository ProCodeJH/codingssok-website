"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/*
  Events — 공모전·대회 안내 (내용 강화 + 반응형)
*/

const events = [
    {
        image: "/images/events/competition-1.jpg",
        title: "정보올림피아드 대회",
        desc: "코딩쏙 학생들이 한국정보올림피아드(KOI)에 참가하여 알고리즘 문제해결 능력을 증명했습니다.",
        date: "2025년 8월",
        location: "서울 코엑스",
        badge: "🥇 금상 수상",
        color: "var(--color-brand-1)",
    },
    {
        image: "/images/events/competition-2.jpg",
        title: "전국 프로그래밍 경진대회",
        desc: "전국 단위 프로그래밍 경진대회에서 창의적인 소프트웨어 솔루션으로 두각을 나타냈습니다.",
        date: "2025년 11월",
        location: "대전 KAIST",
        badge: "🏆 본선 진출",
        color: "var(--color-brand-4)",
    },
    {
        image: "/images/events/competition-3.png",
        title: "SW 코딩 공모전",
        desc: "학생들의 창의적 프로젝트와 앱 개발 결과물을 발표하고 전문가 심사위원에게 인정받았습니다.",
        date: "2025년 12월",
        location: "온라인 개최",
        badge: "🎖️ 우수상 수상",
        color: "var(--color-brand-3)",
    },
];

export default function Events() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="events"
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-beige)",
            }}
        >
            <div className="container-nod">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 60, textAlign: "center" }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Achievements
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 1.1 }}>
                        대회·공모전 성과
                    </h2>
                    <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-grey)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
                        코딩쏙 학생들의 도전과 성취를 기록합니다.
                    </p>
                </motion.div>

                {/* Events cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 24 }}>
                    {events.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                background: "var(--color-white)",
                                borderRadius: 20,
                                overflow: "hidden",
                                transition: "transform 0.3s var(--ease-nod)",
                            }}
                            whileHover={{ y: -8 }}
                        >
                            {/* Image */}
                            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#f5f3ef" }}>
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {/* Badge overlay */}
                                <span style={{
                                    position: "absolute", top: 12, right: 12,
                                    background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
                                    padding: "6px 12px", borderRadius: 999,
                                    fontSize: 12, fontWeight: 700, color: "#1a1a1a",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                                }}>
                                    {event.badge}
                                </span>
                            </div>

                            {/* Content */}
                            <div style={{ padding: "24px 28px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                                    <span style={{
                                        fontSize: 11, fontWeight: 700, color: "var(--color-white)",
                                        background: event.color, padding: "3px 10px", borderRadius: 6,
                                        textTransform: "uppercase", letterSpacing: "0.05em",
                                    }}>
                                        Achievement
                                    </span>
                                </div>
                                <h3 style={{ fontSize: "var(--font-size-t-lg)", fontWeight: 600, color: "var(--color-black)", margin: "0 0 8px", lineHeight: 1.2 }}>
                                    {event.title}
                                </h3>
                                <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-grey)", lineHeight: 1.6, marginBottom: 16 }}>
                                    {event.desc}
                                </p>
                                {/* Date & Location */}
                                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#999" }}>
                                    <span>📅 {event.date}</span>
                                    <span>📍 {event.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
