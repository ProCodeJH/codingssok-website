"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";

/* ═══════════════════════════════════════════════════════
   Events — Ultra-Nexus 3D Infinite Continuum  v2.0
   Aero-glass   ·   Fiber-core timeline   ·   3D depth
   ═══════════════════════════════════════════════════════ */

const events = [
    {
        image: "/images/events/competition-1.jpg",
        title: "정보올림피아드 대회",
        desc: "코딩쏙 학생들이 한국정보올림피아드(KOI)에 참가하여 알고리즘 문제해결 능력을 증명했습니다. C/C++ 기반의 고급 알고리즘 실력으로 전국 상위권에 진입하는 쾌거를 달성했습니다.",
        date: "2025년 8월",
        location: "서울 코엑스",
        badge: "🥇 금상 수상",
        participants: "48명 참가",
        status: "upcoming" as const,
    },
    {
        image: "/images/events/competition-2.jpg",
        title: "전국 프로그래밍 경진대회",
        desc: "전국 단위 프로그래밍 경진대회에서 창의적인 소프트웨어 솔루션으로 두각을 나타냈습니다. 팀 프로젝트 부문에서 혁신적인 AI 활용 솔루션을 선보였습니다.",
        date: "2025년 11월",
        location: "대전 KAIST",
        badge: "🏆 본선 진출",
        participants: "2,400명 경쟁",
        status: "live" as const,
    },
    {
        image: "/images/events/competition-3.png",
        title: "SW 코딩 공모전",
        desc: "학생들의 창의적 프로젝트와 앱 개발 결과물을 발표하고 전문가 심사위원에게 인정받았습니다.",
        date: "2025년 12월",
        location: "온라인 개최",
        badge: "🎖️ 우수상 수상",
        participants: "320팀 참가",
        status: "archived" as const,
    },
];

const pastEvents = [
    {
        image: "/images/events/competition-2.jpg",
        title: "전국 청소년 코딩 챌린지",
        desc: "초·중·고등학생 대상 전국 코딩 챌린지에서 Python 부문 최우수 팀으로 선정되었습니다. 실시간 코딩 배틀에서 압도적인 실력을 선보였습니다.",
        date: "2024년 9월",
        location: "부산 벡스코",
        badge: "🥈 은상 수상",
        participants: "1,800명 참가",
    },
    {
        image: "/images/events/competition-1.jpg",
        title: "AI 창의 융합 해커톤",
        desc: "24시간 해커톤에서 AI를 활용한 교육용 챗봇을 개발하여 기술 혁신상을 수상했습니다. 학생들의 실전 프로젝트 능력이 빛을 발한 대회였습니다.",
        date: "2024년 6월",
        location: "서울 DDP",
        badge: "💡 기술혁신상",
        participants: "150팀 참가",
    },
    {
        image: "/images/events/competition-3.png",
        title: "대한민국 SW 인재 축제",
        desc: "과학기술정보통신부 주최 대한민국 SW 인재 축제에서 미래 IT 인재상을 수상하며 코딩쏙의 교육 성과를 증명했습니다.",
        date: "2024년 3월",
        location: "서울 코엑스",
        badge: "🌟 미래인재상",
        participants: "전국 500명",
    },
];

const stats = [
    { label: "참가 대회", value: "24", suffix: "+", icon: "emoji_events" },
    { label: "수상 실적", value: "15", suffix: "회", icon: "military_tech" },
    { label: "참가 학생", value: "120", suffix: "명", icon: "groups" },
    { label: "수상률", value: "87", suffix: "%", icon: "trending_up" },
];

/* ── Timeline Card ── */
function TimelineCard({
    event,
    index,
    isInView,
    isPast = false,
}: {
    event: (typeof events)[0] | (typeof pastEvents)[0];
    index: number;
    isInView: boolean;
    isPast?: boolean;
}) {
    const isEven = index % 2 === 0;
    const status = "status" in event ? event.status : "archived";
    const isArchived = status === "archived";
    const delay = isPast ? 0.2 + index * 0.12 : 0.3 + index * 0.2;

    return (
        <div className="nx-entry group" style={{ perspective: 2000 }}>
            {/* — Text — */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                className={`nx-text ${isEven ? "nx-left nx-align-r" : "nx-right"}`}
            >
                {/* Status badge */}
                {status === "upcoming" && (
                    <span className="nx-badge nx-badge-up">
                        <span className="nx-badge-ring" />Upcoming · {event.date}
                    </span>
                )}
                {status === "live" && (
                    <span className="nx-badge nx-badge-live">
                        <span className="nx-live-dot" />Live · {event.date}
                    </span>
                )}
                {status === "archived" && (
                    <span className="nx-badge nx-badge-arch">Archived · {event.date}</span>
                )}

                <h3 className="nx-ev-title">{event.title}</h3>
                <p className="nx-ev-desc">{event.desc}</p>

                <div className={`nx-ev-meta ${isEven ? "nx-meta-r" : ""}`}>
                    <span className="nx-meta-item"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span> {event.location}</span>
                    <span className="nx-meta-item"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>group</span> {event.participants}</span>
                </div>

                {/* Achievement pill */}
                <div className={`nx-achieve ${isEven ? "nx-achieve-r" : ""}`}>
                    <span className="nx-achieve-pill">{event.badge}</span>
                </div>
            </motion.div>

            {/* — Node (absolute centered on fiber) — */}
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: delay + 0.1, type: "spring", stiffness: 300 }}
                className="nx-node-abs"
            >
                <div className={`nx-node ${status === "upcoming" ? "nx-n-up" : status === "live" ? "nx-n-live" : "nx-n-arch"}`}>
                    {status === "upcoming" && <div className="nx-ping" />}
                    {status === "live" && <div className="nx-pulse-ring" />}
                    <div className="nx-n-inner" />
                </div>
            </motion.div>

            {/* — Image — */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 80 : -80, rotateY: isEven ? 12 : -12 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ delay: delay + 0.05, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                className={`nx-img-col ${isEven ? "nx-right" : "nx-left"}`}
            >
                <div className={`nx-glass-card ${isArchived ? "nx-card-dim" : ""}`}>
                    <div className="nx-refraction" />
                    <div className="nx-card-img">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={isArchived && !isPast ? "nx-img-gray" : isPast ? "nx-img-gray" : ""}
                        />
                        <div className="nx-img-grad" />
                        {status === "upcoming" && <div className="nx-tag">INITIALIZE</div>}
                        {status === "live" && (
                            <div className="nx-bottom-info">
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>groups</span>
                                <span>{event.participants}</span>
                            </div>
                        )}
                        {(isArchived || isPast) && (
                            <div className="nx-center-badge-wrap">
                                <div className="nx-center-badge">
                                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#eab308" }}>military_tech</span>
                                    <span>{event.badge}</span>
                                </div>
                            </div>
                        )}
                        <div className="nx-accent-bar" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/* ── Main Export ── */
export default function Events() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const [showPast, setShowPast] = useState(false);
    const pastRef = useRef<HTMLDivElement>(null);
    const isPastInView = useInView(pastRef, { once: true, margin: "-60px" });

    return (
        <section ref={ref} id="events" className="nx-section">
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* ── BG ── */}
            <div className="nx-bg" aria-hidden>
                <div className="nx-grid-floor" />
                <div className="nx-vol-light" />
                <div className="nx-flare nx-flare1" />
                <div className="nx-flare nx-flare2" />
                <div className="nx-spark nx-s1" /><div className="nx-spark nx-s2" /><div className="nx-spark nx-s3" />
            </div>

            <div className="nx-container">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="nx-header"
                >
                    <div className="nx-sync-badge"><span className="nx-sync-dot" />CORE SYNC ACTIVE</div>
                    <TextReveal as="h2" className="text-center nx-h2">대회 공모전 성과</TextReveal>
                    <p className="nx-subtitle">코딩쏙 학생들의 도전과 성취를 기록합니다</p>
                </motion.div>

                {/* ── Stats ── */}
                <div className="nx-stats">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 40, scale: 0.7, filter: "blur(8px)" }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                            className="nx-stat group"
                        >
                            <div className="nx-refraction" />
                            <span className="material-symbols-outlined nx-stat-icon">{s.icon}</span>
                            <span className="nx-stat-lbl">{s.label}</span>
                            <span className="nx-stat-val">{s.value}<span className="nx-stat-sfx">{s.suffix}</span></span>
                            <div className="nx-stat-glow" />
                        </motion.div>
                    ))}
                </div>

                {/* ── Timeline ── */}
                <div className="nx-tl">
                    {/* Fiber-core */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="nx-fiber"
                    />

                    {events.map((ev, i) => (
                        <TimelineCard key={i} event={ev} index={i} isInView={isInView} />
                    ))}

                    {/* ── "Show Past Events" ── */}
                    <div className="nx-past-gate">
                        <div className="nx-fiber-fade" />
                        <motion.button
                            onClick={() => setShowPast(!showPast)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="nx-gate-btn group"
                        >
                            <div className="nx-gate-inner">
                                <span className="material-symbols-outlined nx-gate-icon">
                                    {showPast ? "expand_less" : "history"}
                                </span>
                            </div>
                            <div className="nx-gate-glow" />
                        </motion.button>
                        <span className="nx-gate-label">
                            {showPast ? "접기" : "이전 대회 보기"}
                        </span>
                    </div>

                    {/* ── Past Events ── */}
                    <AnimatePresence>
                        {showPast && (
                            <motion.div
                                ref={pastRef}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                style={{ overflow: "hidden" }}
                            >
                                <div className="nx-past-header">
                                    <div className="nx-past-line" />
                                    <span className="nx-past-title">
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>schedule</span>
                                        지난 대회 기록
                                    </span>
                                    <div className="nx-past-line" />
                                </div>
                                {pastEvents.map((ev, i) => (
                                    <TimelineCard key={`past-${i}`} event={ev} index={i} isInView={true} isPast />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>


                </div>
            </div>

            {/* ═══════ CSS ═══════ */}
            <style>{`
/* ═══ Section Shell ═══ */
.nx-section {
    position: relative; overflow: hidden;
    padding: clamp(80px, 10vw, 140px) 0;
    background: linear-gradient(160deg, #ffffff 0%, #f0f9ff 35%, #e0f2fe 70%, #bae6fd 100%);
    font-family: 'Space Grotesk', 'Noto Sans', sans-serif; color: #1e293b;
}
.nx-container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); position: relative; z-index: 10; }

/* ═══ Background ═══ */
.nx-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; perspective: 1000px; }
.nx-grid-floor {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    transform: perspective(1000px) rotateX(55deg) scale(3) translateZ(-200px); transform-origin: 50% 50%;
    opacity: 0.5;
}
.nx-vol-light { position: absolute; top: -10%; left: 50%; transform: translateX(-50%); width: 900px; height: 700px; background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(224,242,254,0.08) 100%); clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%); mix-blend-mode: overlay; opacity: 0.5; }
.nx-flare { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0.3) 25%, transparent 65%); mix-blend-mode: screen; }
.nx-flare1 { width: 280px; height: 280px; top: 8%; left: 20%; animation: nxFloat 9s ease-in-out infinite; }
.nx-flare2 { width: 400px; height: 400px; top: 25%; right: 15%; animation: nxFloat 10s ease-in-out infinite 2s; opacity: 0.4; }
.nx-spark { position: absolute; border-radius: 50%; animation: nxEmber 6s ease-in-out infinite alternate; }
.nx-s1 { width: 8px; height: 8px; top: 20%; left: 35%; background: #0ea5e9; box-shadow: 0 0 18px #0ea5e9; animation-duration: 4s; }
.nx-s2 { width: 6px; height: 6px; bottom: 30%; right: 28%; background: #38bdf8; box-shadow: 0 0 12px #38bdf8; animation-duration: 7s; animation-delay: 2s; }
.nx-s3 { width: 10px; height: 10px; top: 55%; left: 18%; background: #fff; box-shadow: 0 0 24px rgba(255,255,255,0.8); animation-duration: 5s; animation-delay: 1s; }

/* ═══ Header ═══ */
.nx-header { text-align: center; margin-bottom: clamp(40px, 6vw, 72px); }
.nx-sync-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 24px; border-radius: 999px; background: rgba(255,255,255,0.65); border: 2px solid rgba(255,255,255,0.85); backdrop-filter: blur(24px); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #0ea5e9; margin-bottom: 28px; box-shadow: 0 8px 30px rgba(14,165,233,0.1); }
.nx-sync-dot { width: 10px; height: 10px; border-radius: 50%; background: #0ea5e9; box-shadow: 0 0 12px #0ea5e9; animation: nxBlink 1.2s ease-in-out infinite; }
.nx-h2 { font-family: 'Space Grotesk', sans-serif !important; font-size: clamp(2.2rem, 5vw, 3.8rem) !important; font-weight: 800 !important; letter-spacing: -0.03em; }
.nx-subtitle { font-size: 16px; color: #64748b; margin-top: 10px; font-weight: 500; letter-spacing: 0.03em; }

/* ═══ Stats ═══ */
.nx-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: clamp(48px,8vw,88px); max-width: 940px; margin-left: auto; margin-right: auto; }
@media (min-width: 640px) { .nx-stats { grid-template-columns: repeat(4,1fr); gap: 18px; } }
.nx-stat {
    position: relative; overflow: hidden; cursor: crosshair;
    background: rgba(255,255,255,0.45); backdrop-filter: blur(40px) saturate(160%);
    border: 1px solid rgba(255,255,255,0.85); border-top: 2px solid #fff; border-left: 2px solid #fff;
    box-shadow: 0 10px 40px rgba(14,165,233,0.1), inset 0 0 30px rgba(255,255,255,0.7), -1px 0 0 rgba(255,0,0,0.12), 1px 0 0 rgba(0,255,255,0.12);
    border-radius: 24px; padding: 28px 20px;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    transform-style: preserve-3d; transition: all 0.55s cubic-bezier(0.34,1.56,0.64,1);
}
.nx-stat:hover { background: rgba(255,255,255,0.7); box-shadow: 0 30px 60px rgba(14,165,233,0.18), 0 0 40px rgba(56,189,248,0.25), inset 0 0 40px #fff; transform: translateY(-10px) scale(1.06); }
.nx-stat-icon { font-size: 28px; color: #38bdf8; margin-bottom: 6px; }
.nx-stat:hover .nx-stat-icon { color: #0ea5e9; }
.nx-stat-lbl { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: #0ea5e9; margin-bottom: 6px; position: relative; z-index: 10; }
.nx-stat-val { font-size: clamp(32px,4.5vw,44px); font-weight: 800; color: #1e293b; position: relative; z-index: 10; transition: all 0.3s; }
.nx-stat-sfx { font-size: 0.45em; color: #64748b; }
.nx-stat:hover .nx-stat-val { background: linear-gradient(135deg,#0ea5e9,#38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.nx-stat-glow { position: absolute; bottom: -40px; right: -40px; width: 120px; height: 120px; background: rgba(14,165,233,0.06); border-radius: 50%; filter: blur(30px); transition: background 0.3s; }
.nx-stat:hover .nx-stat-glow { background: rgba(14,165,233,0.14); }

/* ═══ Refraction Layer ═══ */
.nx-refraction { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.75) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.35) 100%); pointer-events: none; z-index: 12; opacity: 0.6; mix-blend-mode: overlay; border-radius: inherit; }

/* ═══ Timeline ═══ */
.nx-tl { position: relative; max-width: 1100px; margin: 0 auto; padding-bottom: 40px; }

/* Fiber-core */
.nx-fiber {
    position: absolute; left: 50%; top: 0; bottom: 0; transform: translateX(-50%); transform-origin: top;
    width: 10px; z-index: 1;
    background: linear-gradient(180deg, #0ea5e9 0%, #38bdf8 20%, #ffffff 50%, #38bdf8 80%, #0ea5e9 100%);
    background-size: 100% 200%;
    box-shadow: 0 0 25px rgba(14,165,233,0.5), 0 0 50px rgba(56,189,248,0.3), inset 0 0 8px #fff;
    animation: nxFiber 1.5s linear infinite;
    border-radius: 5px;
}

/* ── Entry ── */
.nx-entry { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px,4vw,56px); align-items: center; margin-bottom: clamp(56px,7vw,100px); position: relative; }

/* Text column */
.nx-text { padding: clamp(16px,2vw,28px) 0; }
.nx-left { order: 1; }
.nx-right { order: 2; }
.nx-align-r { text-align: right; }

/* Badges */
.nx-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 10px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 18px; }
.nx-badge-up { background: rgba(255,255,255,0.85); border: 1.5px solid rgba(255,255,255,1); color: #0ea5e9; box-shadow: 0 4px 16px rgba(14,165,233,0.08); backdrop-filter: blur(12px); }
.nx-badge-ring { width: 8px; height: 8px; border-radius: 50%; background: #0ea5e9; box-shadow: 0 0 10px #0ea5e9; animation: nxBlink 1.2s ease-in-out infinite; }
.nx-badge-live { background: #fef2f2; border: 1.5px solid #fecaca; color: #dc2626; }
.nx-live-dot { width: 10px; height: 10px; border-radius: 50%; background: #ef4444; animation: nxBlink 1s ease-in-out infinite; box-shadow: 0 0 12px rgba(239,68,68,0.6); }
.nx-badge-arch { color: #94a3b8; font-weight: 700; background: none; padding-left: 0; letter-spacing: 0.15em; font-size: 12px; }

/* Title, desc, meta */
.nx-ev-title { font-size: clamp(22px,3vw,34px); font-weight: 800; color: #0f172a; margin-bottom: 12px; line-height: 1.2; letter-spacing: -0.02em; transition: color 0.3s; }
.group:hover .nx-ev-title { color: #0ea5e9; }
.nx-ev-desc { font-size: 15px; color: #64748b; line-height: 1.75; margin-bottom: 18px; max-width: 420px; font-weight: 500; }
.nx-align-r .nx-ev-desc { margin-left: auto; }
.nx-ev-meta { display: flex; gap: 20px; font-size: 13px; color: #94a3b8; font-weight: 600; margin-bottom: 14px; }
.nx-meta-item { display: inline-flex; align-items: center; gap: 4px; }
.nx-meta-r { justify-content: flex-end; }
.nx-achieve { display: flex; gap: 8px; }
.nx-achieve-r { justify-content: flex-end; }
.nx-achieve-pill { display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 700; background: linear-gradient(135deg, rgba(14,165,233,0.08), rgba(56,189,248,0.08)); border: 1px solid rgba(14,165,233,0.15); color: #0369a1; backdrop-filter: blur(4px); }

/* ── Node (absolute on fiber center) ── */
.nx-node-abs { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 8; }
.nx-node { position: relative; border-radius: 50%; transition: transform 0.5s ease-out; display: flex; align-items: center; justify-content: center; }
.group:hover .nx-node { transform: scale(1.3); }
.nx-n-up { width: 52px; height: 52px; background: #fff; border: 4px solid #0ea5e9; box-shadow: 0 0 35px rgba(14,165,233,0.5), 0 0 70px rgba(14,165,233,0.2); }
.nx-n-live { width: 44px; height: 44px; background: #fff; border: 3px solid #38bdf8; box-shadow: 0 0 25px rgba(56,189,248,0.7); }
.nx-n-arch { width: 36px; height: 36px; background: #e2e8f0; border: 3px solid #cbd5e1; transition: all 0.3s; }
.group:hover .nx-n-arch { border-color: #0ea5e9; background: #fff; box-shadow: 0 0 20px rgba(14,165,233,0.3); }
.nx-ping { position: absolute; inset: 0; border-radius: 50%; background: rgba(14,165,233,0.25); animation: nxPing 2s cubic-bezier(0,0,0.2,1) infinite; }
.nx-pulse-ring { position: absolute; inset: 4px; border-radius: 50%; background: #38bdf8; animation: nxBlink 1s ease-in-out infinite; }
.nx-n-inner { position: absolute; inset: 8px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #38bdf8); box-shadow: inset 0 0 4px rgba(255,255,255,0.6); }
.nx-n-arch .nx-n-inner { inset: 6px; background: #cbd5e1; }
.group:hover .nx-n-arch .nx-n-inner { background: linear-gradient(135deg, #0ea5e9, #38bdf8); }

/* ── Image / Aero-glass Card ── */
.nx-img-col {}
.nx-glass-card {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.45); backdrop-filter: blur(40px) saturate(150%);
    border: 1px solid rgba(255,255,255,0.85); border-top: 2px solid #fff; border-left: 2px solid #fff;
    box-shadow: 0 10px 40px rgba(14,165,233,0.1), inset 0 0 30px rgba(255,255,255,0.7), -1px 0 0 rgba(255,0,0,0.12), 1px 0 0 rgba(0,255,255,0.12);
    border-radius: 24px; padding: 8px;
    transform-style: preserve-3d; perspective: 2000px;
    transition: all 0.65s cubic-bezier(0.34,1.56,0.64,1);
}
.nx-glass-card:hover { background: rgba(255,255,255,0.7); box-shadow: 0 30px 60px rgba(14,165,233,0.2), 0 0 40px rgba(56,189,248,0.25), inset 0 0 40px #fff, -2px 0 0 rgba(255,0,0,0.18), 2px 0 0 rgba(0,255,255,0.18); transform: translateY(-10px) scale(1.02); }
.nx-card-dim { background: rgba(255,255,255,0.25); }
.nx-card-img { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4/3; background: #f1f5f9; box-shadow: inset 0 1px 10px rgba(0,0,0,0.04); }
.nx-img-gray { filter: grayscale(0.65); opacity: 0.75; transition: all 0.7s; }
.group:hover .nx-img-gray { filter: grayscale(0); opacity: 1; }
.nx-img-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.35), transparent 55%); pointer-events: none; }
.nx-tag { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border: 1px solid #fff; color: #0ea5e9; font-size: 11px; font-weight: 800; padding: 8px 18px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); letter-spacing: 0.12em; }
.nx-bottom-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 16px; background: linear-gradient(to top, rgba(255,255,255,0.85), transparent); backdrop-filter: blur(4px); display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 800; color: #1e293b; letter-spacing: 0.12em; }
.nx-center-badge-wrap { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.nx-center-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.85); backdrop-filter: blur(16px); padding: 10px 22px; border-radius: 16px; font-size: 13px; font-weight: 800; color: #1e293b; border: 1px solid #fff; box-shadow: 0 6px 20px rgba(0,0,0,0.08); transition: transform 0.3s; }
.group:hover .nx-center-badge { transform: scale(1.1); }
.nx-accent-bar { position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(to right, #0ea5e9, #38bdf8); box-shadow: 0 -4px 16px rgba(14,165,233,0.3); }

/* ── Past Events Gate ── */
.nx-past-gate { display: flex; flex-direction: column; align-items: center; margin: 20px 0 40px; position: relative; z-index: 10; }
.nx-fiber-fade { width: 4px; height: 48px; background: linear-gradient(to bottom, #38bdf8, rgba(56,189,248,0.2)); border-radius: 99px; margin-bottom: 16px; }
.nx-gate-btn {
    position: relative; width: 72px; height: 72px; border-radius: 50%; cursor: pointer; border: none;
    background: rgba(255,255,255,0.5); backdrop-filter: blur(40px);
    border: 2px solid rgba(255,255,255,0.9);
    box-shadow: 0 10px 30px rgba(14,165,233,0.12);
    transition: all 0.4s; display: flex; align-items: center; justify-content: center;
}
.nx-gate-btn:hover { box-shadow: 0 15px 40px rgba(14,165,233,0.2); }
.nx-gate-inner { position: absolute; inset: 6px; background: linear-gradient(135deg, #fff, #f0f9ff); border-radius: 50%; box-shadow: inset 0 1px 6px rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: center; }
.nx-gate-icon { font-size: 28px; color: #0ea5e9; transition: transform 0.5s; }
.nx-gate-btn:hover .nx-gate-icon { transform: rotate(360deg); }
.nx-gate-glow { position: absolute; inset: -8px; border-radius: 50%; background: rgba(14,165,233,0.1); filter: blur(12px); opacity: 0; transition: opacity 0.4s; }
.nx-gate-btn:hover .nx-gate-glow { opacity: 1; }
.nx-gate-label { margin-top: 12px; font-size: 13px; font-weight: 700; color: #64748b; letter-spacing: 0.08em; }

/* Past header */
.nx-past-header { display: flex; align-items: center; gap: 16px; justify-content: center; margin: 32px 0 40px; }
.nx-past-line { flex: 1; max-width: 120px; height: 1px; background: linear-gradient(to right, transparent, rgba(14,165,233,0.2), transparent); }
.nx-past-title { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; }

/* ── Bottom ── */
.nx-tl-bottom { display: flex; flex-direction: column; align-items: center; padding-top: 16px; }
.nx-fiber-tail { width: 4px; height: 70px; background: linear-gradient(to bottom, #0ea5e9 0%, #38bdf8 50%, transparent 100%); opacity: 0.5; animation: nxBlink 2s ease-in-out infinite; border-radius: 99px; margin-bottom: 16px; }
.nx-inf-btn { position: relative; width: 72px; height: 72px; border-radius: 50%; background: rgba(255,255,255,0.45); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.85); border-top: 2px solid #fff; box-shadow: 0 10px 30px rgba(14,165,233,0.12); transition: all 0.5s; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.nx-inf-btn:hover { transform: scale(1.1); }
.nx-inf-inner { position: absolute; inset: 8px; background: linear-gradient(135deg,#fff,#f0f9ff); border-radius: 50%; box-shadow: inset 0 2px 6px rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: center; }
.nx-inf-icon { font-size: 30px; color: #0ea5e9; }
.nx-inf-btn:hover .nx-inf-icon { animation: nxSpin 2s linear infinite; }
.nx-inf-glow { position: absolute; inset: -8px; border-radius: 50%; background: rgba(14,165,233,0.12); filter: blur(14px); opacity: 0; transition: opacity 0.4s; }
.nx-inf-btn:hover .nx-inf-glow { opacity: 1; }

/* ═══ Responsive ═══ */
@media (max-width: 768px) {
    .nx-entry { grid-template-columns: 1fr !important; gap: 20px !important; }
    .nx-left, .nx-right { order: unset !important; }
    .nx-text { order: 2 !important; }
    .nx-img-col { order: 3 !important; }
    .nx-align-r { text-align: left !important; }
    .nx-meta-r, .nx-achieve-r { justify-content: flex-start !important; }
    .nx-align-r .nx-ev-desc { margin-left: 0; }
    .nx-fiber { left: 20px !important; transform: translateX(0) !important; }
    .nx-node-abs { left: 20px !important; transform: translate(-50%, -50%) !important; }
}

/* ═══ Keyframes ═══ */
@keyframes nxFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25px); } }
@keyframes nxEmber { 0% { transform: translate(0,0) scale(1); opacity: 0.15; } 50% { opacity: 0.7; } 100% { transform: translate(30px,-50px) scale(1.5); opacity: 0; } }
@keyframes nxBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@keyframes nxPing { 75%, 100% { transform: scale(2.2); opacity: 0; } }
@keyframes nxFiber { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }
@keyframes nxSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </section>
    );
}
