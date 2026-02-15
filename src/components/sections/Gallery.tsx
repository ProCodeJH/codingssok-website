"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/*
  Gallery — 코딩쏙 학원 사진 3D 슬라이드 갤러리
  - 3D perspective 카드 캐로셀 (컨테이너 밖으로 돌출)
  - 자동 재생 + 수동 조작
  - 라이트박스
  - 101장 전체 표시
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

const VISIBLE_COUNT = 5;

export default function Gallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [autoplay, setAutoplay] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const total = ALL_PHOTOS.length;

    const imgSrc = (name: string) => `/images/academy/${name}`;

    // Auto-advance
    useEffect(() => {
        if (!autoplay || isHovering || lightbox !== null) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 3000);
        return () => clearInterval(timer);
    }, [autoplay, isHovering, lightbox, total]);

    const go = useCallback(
        (dir: number) => {
            setCurrent((prev) => (prev + dir + total) % total);
        },
        [total]
    );

    // Keyboard nav
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (lightbox !== null) {
                if (e.key === "Escape") setLightbox(null);
                if (e.key === "ArrowLeft") setLightbox((prev) => (prev! - 1 + total) % total);
                if (e.key === "ArrowRight") setLightbox((prev) => (prev! + 1) % total);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [lightbox, total]);

    const getCardStyle = (offset: number): React.CSSProperties => {
        const absOff = Math.abs(offset);
        const isCenter = offset === 0;
        const translateX = offset * 280;
        const translateZ = isCenter ? 120 : -(absOff * 80);
        const rotateY = offset * -12;
        const scale = isCenter ? 1.15 : 1 - absOff * 0.08;
        const opacity = 1 - absOff * 0.15;
        const zIndex = 10 - absOff;

        return {
            position: "absolute" as const,
            left: "50%",
            top: "50%",
            width: "clamp(240px, 28vw, 380px)",
            aspectRatio: "4/3",
            borderRadius: 20,
            overflow: "hidden",
            transform: `translate(-50%, -50%) translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
            zIndex,
            cursor: isCenter ? "pointer" : "default",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: isCenter
                ? "0 25px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)"
                : `0 ${10 - absOff * 3}px ${30 - absOff * 8}px rgba(0,0,0,0.2)`,
            filter: isCenter ? "none" : `brightness(${0.7 + absOff * 0.05})`,
        };
    };

    const visibleIndices: number[] = [];
    const half = Math.floor(VISIBLE_COUNT / 2);
    for (let i = -half; i <= half; i++) {
        visibleIndices.push(((current + i) % total + total) % total);
    }

    return (
        <div ref={sectionRef} id="gallery-section">
            <section
                style={{
                    position: "relative",
                    width: "100vw",
                    marginLeft: "calc(-50vw + 50%)",
                    padding: "clamp(60px, 8vw, 120px) 0",
                    background: "linear-gradient(180deg, #0a0a0f 0%, #1a1025 50%, #0a0a0f 100%)",
                    overflow: "hidden",
                }}
            >
                {/* Decorative radials */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(236,82,18,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(119,198,179,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`p${i}`}
                        animate={{ y: [0, -25, 0], opacity: [0.15, 0.5, 0.15] }}
                        transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                        style={{
                            position: "absolute",
                            width: 3 + (i % 3) * 2,
                            height: 3 + (i % 3) * 2,
                            borderRadius: "50%",
                            background: i % 2 === 0 ? "rgba(236,82,18,0.4)" : "rgba(119,198,179,0.3)",
                            left: `${5 + (i * 6.2) % 90}%`,
                            top: `${10 + (i * 7.3) % 80}%`,
                            pointerEvents: "none",
                        }}
                    />
                ))}

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 80px)", position: "relative", zIndex: 5 }}
                >
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#EC5212", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>
                        Our Academy
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: 0 }}>
                        학원 둘러보기
                    </h2>
                    <p style={{ fontSize: "clamp(14px, 1.5vw, 18px)", color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
                        코딩쏙의 생생한 수업 현장을 구경하세요
                    </p>
                    <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", padding: "8px 20px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)" }}>
                        <span style={{ fontSize: 24, fontWeight: 800, color: "#EC5212" }}>{current + 1}</span>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>/</span>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{total}</span>
                    </div>
                </motion.div>

                {/* 3D Carousel */}
                <div
                    style={{ position: "relative", height: "clamp(280px, 35vw, 440px)", perspective: "1200px", perspectiveOrigin: "50% 50%" }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
                        <AnimatePresence mode="popLayout">
                            {visibleIndices.map((photoIdx, i) => {
                                const offset = i - half;
                                const isCenter = offset === 0;
                                return (
                                    <motion.div
                                        key={`card-${photoIdx}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                        style={getCardStyle(offset)}
                                        onClick={() => { if (isCenter) setLightbox(photoIdx); else setCurrent(photoIdx); }}
                                        whileHover={isCenter ? { scale: 1.2, rotateY: 0 } : {}}
                                    >
                                        <Image
                                            src={imgSrc(ALL_PHOTOS[photoIdx])}
                                            alt={`학원 사진 ${photoIdx + 1}`}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            sizes="(max-width: 768px) 60vw, 30vw"
                                            quality={75}
                                            loading="lazy"
                                        />
                                        <div style={{ position: "absolute", inset: 0, background: isCenter ? "none" : "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5))", pointerEvents: "none" }} />
                                        {isCenter && <div style={{ position: "absolute", inset: -2, borderRadius: 22, border: "2px solid rgba(236,82,18,0.4)", pointerEvents: "none" }} />}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Nav arrows */}
                    <button onClick={() => go(-1)} aria-label="이전" style={{ position: "absolute", left: "clamp(8px, 3vw, 40px)", top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", color: "#fff", fontSize: 22, cursor: "pointer", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        ‹
                    </button>
                    <button onClick={() => go(1)} aria-label="다음" style={{ position: "absolute", right: "clamp(8px, 3vw, 40px)", top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", color: "#fff", fontSize: 22, cursor: "pointer", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        ›
                    </button>
                </div>

                {/* Dot indicators */}
                <div style={{ marginTop: "clamp(24px, 3vw, 48px)", display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", padding: "0 16px", maxWidth: 900, margin: "clamp(24px, 3vw, 48px) auto 0" }}>
                    {ALL_PHOTOS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            style={{ width: current === i ? 28 : 6, height: 6, borderRadius: 999, border: "none", background: current === i ? "#EC5212" : "rgba(255,255,255,0.15)", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", padding: 0 }}
                            aria-label={`사진 ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Autoplay toggle */}
                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <button onClick={() => setAutoplay(!autoplay)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "6px 16px", borderRadius: 999, fontSize: 12, cursor: "pointer" }}>
                        {autoplay ? "⏸ 자동 재생 중" : "▶ 자동 재생"}
                    </button>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}
                    >
                        <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 24, right: 24, width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 24, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

                        <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + total) % total); }} style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", width: 56, height: 56, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 28, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                        <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % total); }} style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", width: 56, height: 56, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 28, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>

                        <motion.div
                            key={lightbox}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: "relative", width: "min(90vw, 1200px)", height: "min(80vh, 900px)", borderRadius: 16, overflow: "hidden", cursor: "default" }}
                        >
                            <Image src={imgSrc(ALL_PHOTOS[lightbox])} alt={`사진 ${lightbox + 1}`} fill style={{ objectFit: "contain" }} quality={90} sizes="90vw" priority />
                        </motion.div>

                        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", padding: "8px 20px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>
                            {lightbox + 1} / {total}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
