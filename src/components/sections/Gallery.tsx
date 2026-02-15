"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/*
  Gallery — 학원 환경 + 수업 풍경
  반응형 그리드 + 라이트박스
*/

const photos = [
    { src: "/images/academy/KakaoTalk_20250816_230722315.jpg", alt: "수업 풍경 1" },
    { src: "/images/academy/KakaoTalk_20250816_230722315_01.jpg", alt: "수업 풍경 2" },
    { src: "/images/academy/KakaoTalk_20250816_234926393_02.jpg", alt: "학원 내부 1" },
    { src: "/images/academy/KakaoTalk_20250816_234926393_03.jpg", alt: "학원 내부 2" },
    { src: "/images/academy/KakaoTalk_20251212_142853867.jpg", alt: "코딩 수업 1" },
    { src: "/images/academy/KakaoTalk_20251212_143115800.jpg", alt: "코딩 수업 2" },
    { src: "/images/academy/KakaoTalk_20251212_143841685.jpg", alt: "프로젝트 발표" },
    { src: "/images/academy/KakaoTalk_20251224_221516694.jpg", alt: "크리스마스 이벤트" },
    { src: "/images/academy/KakaoTalk_20251226_181412188.jpg", alt: "학원 환경 1" },
    { src: "/images/academy/KakaoTalk_20251226_181412669.jpg", alt: "학원 환경 2" },
    { src: "/images/academy/KakaoTalk_20260113_162114986.jpg", alt: "1:1 수업" },
    { src: "/images/academy/KakaoTalk_20260206_133836930.jpg", alt: "그룹 수업 1" },
    { src: "/images/academy/KakaoTalk_20260206_133837621.jpg", alt: "그룹 수업 2" },
    { src: "/images/academy/KakaoTalk_20260206_133838050.jpg", alt: "그룹 수업 3" },
    { src: "/images/academy/KakaoTalk_20260206_134501663.jpg", alt: "코딩 실습" },
    { src: "/images/academy/KakaoTalk_20260207_115634269.jpg", alt: "수업 자료" },
    { src: "/images/academy/KakaoTalk_20260212_122504963.jpg", alt: "학생 작품 1" },
    { src: "/images/academy/KakaoTalk_20260212_201344853.jpg", alt: "학생 작품 2" },
    { src: "/images/academy/KakaoTalk_20260212_201442338.jpg", alt: "발표 준비" },
    { src: "/images/academy/KakaoTalk_20260214_114438151.jpg", alt: "수업 모습" },
];

export default function Gallery() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showAll, setShowAll] = useState(false);
    const [lightbox, setLightbox] = useState<number | null>(null);

    const visiblePhotos = showAll ? photos : photos.slice(0, 6);

    return (
        <>
            <section
                ref={ref}
                id="gallery"
                style={{
                    padding: "var(--section-spacing) 0",
                    background: "var(--color-white)",
                }}
            >
                <div className="container-nod">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ marginBottom: 60, textAlign: "center" }}
                    >
                        <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-5)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            Academy Life
                        </p>
                        <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 1.1 }}>
                            코딩쏙의 하루
                        </h2>
                    </motion.div>

                    {/* Responsive photo grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                        gap: 12,
                    }}>
                        <AnimatePresence>
                            {visiblePhotos.map((photo, i) => (
                                <motion.div
                                    key={photo.src}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                    style={{
                                        position: "relative",
                                        borderRadius: 16,
                                        overflow: "hidden",
                                        aspectRatio: "4/3",
                                        cursor: "pointer",
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => setLightbox(photos.indexOf(photo))}
                                >
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {/* Hover overlay */}
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)",
                                        opacity: 0, transition: "opacity 0.3s",
                                        display: "flex", alignItems: "flex-end", padding: 16,
                                    }}
                                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                                    >
                                        <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{photo.alt}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Show more */}
                    {!showAll && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                            style={{ textAlign: "center", marginTop: 40 }}
                        >
                            <button
                                onClick={() => setShowAll(true)}
                                style={{
                                    background: "var(--color-beige)",
                                    border: "none",
                                    padding: "14px 32px",
                                    borderRadius: 999,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "var(--color-black)",
                                    cursor: "pointer",
                                    transition: "background 0.3s, transform 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-beige-dark)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-beige)"; e.currentTarget.style.transform = "scale(1)"; }}
                            >
                                📸 더 많은 사진 보기 ({photos.length - 6}장)
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed", inset: 0, zIndex: 9999,
                            background: "rgba(0,0,0,0.9)", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => setLightbox(null)}
                    >
                        {/* Close */}
                        <button style={{
                            position: "absolute", top: 20, right: 20, background: "none",
                            border: "none", color: "#fff", fontSize: 32, cursor: "pointer", zIndex: 10,
                        }}>✕</button>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
                            style={{
                                position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
                                background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                                fontSize: 24, width: 48, height: 48, borderRadius: 999, cursor: "pointer",
                                backdropFilter: "blur(10px)",
                            }}
                        >‹</button>

                        {/* Image */}
                        <motion.div
                            key={lightbox}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: "relative", width: "90vw", height: "80vh",
                                maxWidth: 1200, cursor: "default",
                            }}
                        >
                            <Image
                                src={photos[lightbox].src}
                                alt={photos[lightbox].alt}
                                fill
                                style={{ objectFit: "contain" }}
                                sizes="90vw"
                                priority
                            />
                        </motion.div>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
                            style={{
                                position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
                                background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                                fontSize: 24, width: 48, height: 48, borderRadius: 999, cursor: "pointer",
                                backdropFilter: "blur(10px)",
                            }}
                        >›</button>

                        {/* Caption */}
                        <div style={{
                            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
                            color: "#fff", fontSize: 14, fontWeight: 500, textAlign: "center",
                            background: "rgba(0,0,0,0.5)", padding: "8px 20px", borderRadius: 999,
                            backdropFilter: "blur(10px)",
                        }}>
                            {photos[lightbox].alt} • {lightbox + 1}/{photos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
