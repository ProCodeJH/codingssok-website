"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/*
  Gallery — 코딩쏙 학원 사진 3D 캐로셀 + 그리드
  기존 사이트 디자인(베이지 배경, 오렌지 액센트)에 맞춤
  Stage 1: 3D 회전 캐로셀 (메인 슬라이더)
  Stage 2: 전체 사진 그리드 (모두 보기)
*/

const ALL_PHOTOS = [
    "KakaoTalk_20250816_230722315.jpg",
    "KakaoTalk_20250816_230722315_01.jpg",
    "KakaoTalk_20250816_234926393_02.jpg",
    "KakaoTalk_20250816_234926393_03.jpg",
    "KakaoTalk_20251212_142853867.jpg",
    "KakaoTalk_20251212_143115800.jpg",
    "KakaoTalk_20251212_143841685.jpg",
    "KakaoTalk_20251224_221516694.jpg",
    "KakaoTalk_20251226_181412188.jpg",
    "KakaoTalk_20251226_181412669.jpg",
    "KakaoTalk_20260113_162114986.jpg",
    "KakaoTalk_20260206_133836930.jpg",
    "KakaoTalk_20260206_133837621.jpg",
    "KakaoTalk_20260206_133838050.jpg",
    "KakaoTalk_20260206_134501663.jpg",
    "KakaoTalk_20260207_115634269.jpg",
    "KakaoTalk_20260212_122504963.jpg",
    "KakaoTalk_20260212_201344853.jpg",
    "KakaoTalk_20260212_201442338.jpg",
    "KakaoTalk_20260214_114438151.jpg",
    "KakaoTalk_20260214_114735389.jpg",
    "KakaoTalk_20260214_114735389_01.jpg",
    "KakaoTalk_20260214_114735389_02.jpg",
    "KakaoTalk_20260214_114735389_03.jpg",
    "KakaoTalk_20260214_114735389_04.jpg",
    "KakaoTalk_20260214_114735389_05.jpg",
    "KakaoTalk_20260214_114735389_06.jpg",
    "KakaoTalk_20260214_114735389_07.jpg",
    "KakaoTalk_20260214_114735389_08.jpg",
    "KakaoTalk_20260214_114735389_09.jpg",
    "KakaoTalk_20260214_114735389_10.jpg",
    "KakaoTalk_20260214_114735389_11.jpg",
    "KakaoTalk_20260214_114735389_12.jpg",
    "KakaoTalk_20260214_114735389_13.jpg",
    "KakaoTalk_20260214_114735389_14.jpg",
    "KakaoTalk_20260214_114735389_15.jpg",
    "KakaoTalk_20260214_114735389_16.jpg",
    "KakaoTalk_20260214_114735389_17.jpg",
    "KakaoTalk_20260214_114735389_18.jpg",
    "KakaoTalk_20260214_123017775.jpg",
    "KakaoTalk_20260214_123024032.jpg",
    "KakaoTalk_20260214_123026088.jpg",
    "KakaoTalk_20260214_123026716.jpg",
    "KakaoTalk_20260214_123027107.jpg",
    "KakaoTalk_20260214_123027734.jpg",
    "KakaoTalk_20260214_123028480.jpg",
    "KakaoTalk_20260214_123029152.jpg",
    "KakaoTalk_20260214_123029845.jpg",
    "KakaoTalk_20260214_123030414.jpg",
    "KakaoTalk_20260214_123031142.jpg",
    "KakaoTalk_20260214_123031788.jpg",
    "KakaoTalk_20260214_123032353.jpg",
    "KakaoTalk_20260214_123032981.jpg",
    "KakaoTalk_20260214_123033611.jpg",
    "KakaoTalk_20260214_123034056.jpg",
    "KakaoTalk_20260214_123034850.jpg",
    "KakaoTalk_20260214_123035541.jpg",
    "KakaoTalk_20260214_123035986.jpg",
    "KakaoTalk_20260214_123036558.jpg",
    "KakaoTalk_20260214_123037260.jpg",
    "KakaoTalk_20260214_123038167.png",
    "KakaoTalk_20260214_123038843.jpg",
    "KakaoTalk_20260214_123039490.jpg",
    "KakaoTalk_20260214_123040117.jpg",
    "KakaoTalk_20260214_123040786.jpg",
    "KakaoTalk_20260214_123041444.jpg",
    "KakaoTalk_20260214_123042231.jpg",
    "KakaoTalk_20260214_123042591.jpg",
    "KakaoTalk_20260214_123043125.jpg",
    "KakaoTalk_20260214_123043602.jpg",
    "KakaoTalk_20260214_123044272.jpg",
    "KakaoTalk_20260214_123044689.jpg",
    "KakaoTalk_20260214_123045273.jpg",
    "KakaoTalk_20260214_123045815.jpg",
    "KakaoTalk_20260214_123046449.jpg",
    "KakaoTalk_20260214_123047141.jpg",
    "KakaoTalk_20260214_123047849.jpg",
    "KakaoTalk_20260214_123048638.jpg",
    "KakaoTalk_20260214_123049271.jpg",
    "KakaoTalk_20260214_123049679.jpg",
    "KakaoTalk_20260214_123050356.jpg",
    "KakaoTalk_20260214_123051075.jpg",
    "KakaoTalk_20260214_123051679.jpg",
    "KakaoTalk_20260214_123052223.jpg",
    "KakaoTalk_20260214_123052818.jpg",
    "KakaoTalk_20260214_123053322.jpg",
    "KakaoTalk_20260214_123053899.jpg",
    "KakaoTalk_20260214_123054533.jpg",
    "KakaoTalk_20260214_123055071.jpg",
    "KakaoTalk_20260214_123055304.jpg",
    "cinematic_classroom.png",
    "reel_cut1_opening.png",
    "reel_cut2_closeup.png",
    "reel_cut3_detail.png",
    "reel_cut4_collab.png",
    "reel_cut5_skills.png",
    "SE-c5ee429c-2cea-42af-836f-60c08db18ac5.jpg",
    "smart_classroom_1.jpg",
    "smart_classroom_2.jpg",
    "smart_classroom_3.jpg",
];

const CARDS_VISIBLE = 5;

export default function Gallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [hovered, setHovered] = useState(false);
    const total = ALL_PHOTOS.length;

    const src = (name: string) => `/images/academy/${name}`;

    /* Auto-advance */
    useEffect(() => {
        if (!autoplay || hovered || lightbox !== null) return;
        const t = setInterval(() => setCurrent((p) => (p + 1) % total), 3500);
        return () => clearInterval(t);
    }, [autoplay, hovered, lightbox, total]);

    const go = useCallback((d: number) => setCurrent((p) => (p + d + total) % total), [total]);

    /* Keyboard */
    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (lightbox !== null) {
                if (e.key === "Escape") setLightbox(null);
                if (e.key === "ArrowLeft") setLightbox((p) => (p! - 1 + total) % total);
                if (e.key === "ArrowRight") setLightbox((p) => (p! + 1) % total);
            }
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [lightbox, total]);

    /* Card positions for 3D carousel */
    const half = Math.floor(CARDS_VISIBLE / 2);
    const visible: number[] = [];
    for (let i = -half; i <= half; i++) visible.push(((current + i) % total + total) % total);

    const cardStyle = (offset: number): React.CSSProperties => {
        const abs = Math.abs(offset);
        const center = offset === 0;
        return {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: center ? "clamp(300px, 32vw, 480px)" : "clamp(200px, 22vw, 320px)",
            aspectRatio: "4/3",
            borderRadius: center ? 16 : 12,
            overflow: "hidden",
            transform: `translate(-50%, -50%) translateX(${offset * (center ? 0 : 240 + abs * 20)}px) translateZ(${center ? 60 : -(abs * 60)}px) rotateY(${offset * -8}deg) scale(${center ? 1 : 0.85 - abs * 0.05})`,
            opacity: center ? 1 : 0.7 - abs * 0.1,
            zIndex: 10 - abs,
            cursor: center ? "zoom-in" : "pointer",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: center
                ? "0 20px 50px rgba(56,48,48,0.2), 0 0 0 2px rgba(236,82,18,0.3)"
                : "0 8px 24px rgba(56,48,48,0.1)",
        };
    };

    return (
        <section
            ref={sectionRef}
            id="gallery-section"
            style={{
                padding: "clamp(60px, 8vw, 120px) 0",
                position: "relative",
                overflow: "visible",
            }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 60px)" }}
            >
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-brand-1, #EC5212)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Our Academy
                </span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 800, color: "var(--color-black, #383030)", lineHeight: 1.2, margin: "8px 0 0" }}>
                    학원 둘러보기
                </h2>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "var(--color-grey, #707070)", marginTop: 8 }}>
                    코딩쏙의 생생한 수업 현장을 구경하세요 · 총 {total}장
                </p>
            </motion.div>

            {/* ─── 3D Carousel ─── */}
            <div
                style={{
                    position: "relative",
                    width: "100vw",
                    marginLeft: "calc(-50vw + 50%)",
                    height: "clamp(260px, 32vw, 420px)",
                    perspective: 1200,
                    perspectiveOrigin: "50% 50%",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
                    {visible.map((idx, i) => {
                        const offset = i - half;
                        const center = offset === 0;
                        return (
                            <motion.div
                                key={idx}
                                layout
                                style={cardStyle(offset)}
                                onClick={() => (center ? setLightbox(idx) : setCurrent(idx))}
                            >
                                <Image
                                    src={src(ALL_PHOTOS[idx])}
                                    alt={`학원 사진 ${idx + 1}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width:768px) 70vw, 32vw"
                                    quality={center ? 80 : 60}
                                    loading="lazy"
                                />
                                {/* Dim overlay for side cards */}
                                {!center && (
                                    <div style={{ position: "absolute", inset: 0, background: "rgba(253,250,245,0.15)", pointerEvents: "none" }} />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Arrows */}
                {[
                    { dir: -1, pos: "left", label: "이전" },
                    { dir: 1, pos: "right", label: "다음" },
                ].map(({ dir, pos, label }) => (
                    <button
                        key={pos}
                        onClick={() => go(dir)}
                        aria-label={label}
                        style={{
                            position: "absolute",
                            [pos]: "clamp(12px, 4vw, 60px)",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            border: "2px solid var(--color-grey-2, #D6D6D6)",
                            background: "rgba(253,250,245,0.9)",
                            backdropFilter: "blur(8px)",
                            color: "var(--color-black, #383030)",
                            fontSize: 20,
                            cursor: "pointer",
                            zIndex: 20,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.25s",
                        }}
                    >
                        {dir === -1 ? "‹" : "›"}
                    </button>
                ))}
            </div>

            {/* Counter + controls */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-black, #383030)" }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: "var(--color-brand-1, #EC5212)" }}>{current + 1}</span>
                    <span style={{ fontSize: 14, color: "var(--color-grey, #707070)" }}>/ {total}</span>
                </div>
                <button
                    onClick={() => setAutoplay(!autoplay)}
                    style={{
                        background: "none",
                        border: "1.5px solid var(--color-grey-2, #D6D6D6)",
                        color: "var(--color-grey, #707070)",
                        padding: "4px 14px",
                        borderRadius: 999,
                        fontSize: 12,
                        cursor: "pointer",
                    }}
                >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        {autoplay ? (
                            <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg> 자동재생</>
                        ) : (
                            <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg> 재생</>
                        )}
                    </span>
                </button>
                <button
                    onClick={() => setShowAll(!showAll)}
                    style={{
                        background: showAll ? "var(--color-brand-1, #EC5212)" : "none",
                        border: `1.5px solid ${showAll ? "var(--color-brand-1, #EC5212)" : "var(--color-grey-2, #D6D6D6)"}`,
                        color: showAll ? "#fff" : "var(--color-grey, #707070)",
                        padding: "4px 14px",
                        borderRadius: 999,
                        fontSize: 12,
                        cursor: "pointer",
                        transition: "all 0.3s",
                    }}
                >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        {showAll ? (
                            <><svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> 닫기</>
                        ) : (
                            <><svg width="10" height="10" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 전체보기</>
                        )}
                    </span>
                </button>
            </div>

            {/* ─── Full Grid (전체보기) ─── */}
            <AnimatePresence>
                {showAll && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden", marginTop: 32 }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                                gap: 8,
                                padding: "0 clamp(16px, 3vw, 40px)",
                                maxWidth: 1200,
                                margin: "0 auto",
                            }}
                        >
                            {ALL_PHOTOS.map((name, i) => (
                                <motion.div
                                    key={name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: Math.min(i * 0.02, 1), duration: 0.3 }}
                                    onClick={() => setLightbox(i)}
                                    style={{
                                        position: "relative",
                                        aspectRatio: "4/3",
                                        borderRadius: 10,
                                        overflow: "hidden",
                                        cursor: "zoom-in",
                                        border: current === i ? "2px solid var(--color-brand-1, #EC5212)" : "1px solid var(--color-grey-2, #D6D6D6)",
                                        transition: "border 0.2s, transform 0.2s",
                                    }}
                                >
                                    <Image
                                        src={src(name)}
                                        alt={`사진 ${i + 1}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="180px"
                                        quality={50}
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Lightbox ─── */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 9999,
                            background: "rgba(56,48,48,0.92)",
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "zoom-out",
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setLightbox(null)}
                            style={{ position: "absolute", top: 20, right: 20, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.4)", color: "#fff", fontSize: 20, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            ✕
                        </button>

                        {/* Prev / Next */}
                        <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + total) % total); }} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.4)", color: "#fff", fontSize: 24, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                        <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % total); }} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.4)", color: "#fff", fontSize: 24, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>

                        {/* Image */}
                        <motion.div
                            key={lightbox}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: "relative", width: "min(90vw, 1100px)", height: "min(80vh, 850px)", borderRadius: 12, overflow: "hidden", cursor: "default" }}
                        >
                            <Image src={src(ALL_PHOTOS[lightbox])} alt={`사진 ${lightbox + 1}`} fill style={{ objectFit: "contain" }} quality={90} sizes="90vw" priority />
                        </motion.div>

                        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.5)", padding: "6px 18px", borderRadius: 999, color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>
                            {lightbox + 1} / {total}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
