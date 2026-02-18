"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/*
  Events — 대회·공모전 타임라인 레이아웃
  *(yantra 좌우 교차 + heroines 이벤트 카드 + noah 스크롤 reveal)*
  이미지↔텍스트 좌우 교차 배치 + 중앙 타임라인 라인
*/

const events = [
    {
        image: "/images/events/competition-1.jpg",
        title: "정보올림피아드 대회",
        desc: "코딩쏙 학생들이 한국정보올림피아드(KOI)에 참가하여 알고리즘 문제해결 능력을 증명했습니다.",
        date: "2025년 8월",
        location: "서울 코엑스",
        badge: "🥇 금상 수상",
        color: "#EC5212",
    },
    {
        image: "/images/events/competition-2.jpg",
        title: "전국 프로그래밍 경진대회",
        desc: "전국 단위 프로그래밍 경진대회에서 창의적인 소프트웨어 솔루션으로 두각을 나타냈습니다.",
        date: "2025년 11월",
        location: "대전 KAIST",
        badge: "🏆 본선 진출",
        color: "#77C6B3",
    },
    {
        image: "/images/events/competition-3.png",
        title: "SW 코딩 공모전",
        desc: "학생들의 창의적 프로젝트와 앱 개발 결과물을 발표하고 전문가 심사위원에게 인정받았습니다.",
        date: "2025년 12월",
        location: "온라인 개최",
        badge: "🎖️ 우수상 수상",
        color: "#70A2E1",
    },
];

function TimelineCard({ event, index, isInView }: { event: typeof events[0]; index: number; isInView: boolean }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 * index, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "clamp(16px, 3vw, 40px)",
                alignItems: "center",
                marginBottom: "clamp(32px, 5vw, 56px)",
            }}
        >
            {/* Left side */}
            <div style={{ order: isEven ? 1 : 3 }}>
                {isEven ? (
                    <EventContent event={event} align="right" />
                ) : (
                    <EventImage event={event} />
                )}
            </div>

            {/* Center timeline dot */}
            <div style={{ order: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 300 }}
                    style={{
                        width: 16, height: 16, borderRadius: 999,
                        background: event.color,
                        border: "3px solid #fff",
                        boxShadow: `0 0 0 3px ${event.color}33, 0 2px 12px rgba(0,0,0,0.1)`,
                        position: "relative", zIndex: 2,
                    }}
                />
            </div>

            {/* Right side */}
            <div style={{ order: isEven ? 3 : 1 }}>
                {isEven ? (
                    <EventImage event={event} />
                ) : (
                    <EventContent event={event} align="left" />
                )}
            </div>
        </motion.div>
    );
}

function EventContent({ event, align }: { event: typeof events[0]; align: "left" | "right" }) {
    return (
        <div style={{ textAlign: align, padding: "clamp(16px, 2vw, 24px) 0" }}>
            <span style={{
                display: "inline-block",
                fontSize: 12, fontWeight: 700, color: "#fff",
                background: event.color, padding: "4px 12px", borderRadius: 6,
                marginBottom: 12, letterSpacing: "0.05em",
            }}>
                {event.badge}
            </span>
            <h3 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.2 }}>
                {event.title}
            </h3>
            <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: 16 }}>
                {event.desc}
            </p>
            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#999", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
                <span>📅 {event.date}</span>
                <span>📍 {event.location}</span>
            </div>
        </div>
    );
}

function EventImage({ event }: { event: typeof events[0] }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
                borderRadius: 20, overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                position: "relative",
                aspectRatio: "4/3",
                background: "#f5f3ef",
            }}
        >
            <Image
                src={event.image}
                alt={event.title}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </motion.div>
    );
}

export default function Events() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="events"
            style={{
                padding: "clamp(80px, 12vw, 160px) 0",
                background: "var(--color-beige)",
                position: "relative",
            }}
        >
            <div className="container-nod">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 80px)" }}
                >
                    <p style={{ fontSize: 13, color: "#EC5212", fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                        Achievements
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.15, letterSpacing: "-0.03em" }}>
                        대회·공모전 성과
                    </h2>
                    <p style={{ fontSize: 15, color: "#888", marginTop: 12 }}>
                        코딩쏙 학생들의 도전과 성취를 기록합니다
                    </p>
                </motion.div>

                {/* Timeline */}
                <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
                    {/* Center line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: 0,
                            bottom: 0,
                            width: 2,
                            background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02))",
                            transformOrigin: "top",
                            zIndex: 1,
                        }}
                    />

                    {events.map((event, i) => (
                        <TimelineCard key={i} event={event} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>

            {/* Mobile fallback: stack vertically */}
            <style>{`
        @media (max-width: 768px) {
          #events [style*="grid-template-columns: 1fr auto 1fr"] {
            grid-template-columns: auto 1fr !important;
          }
          #events [style*="order: 3"] {
            order: 2 !important;
          }
          #events [style*="order: 1"][style*="text-align: right"] {
            text-align: left !important;
          }
        }
      `}</style>
        </section>
    );
}
