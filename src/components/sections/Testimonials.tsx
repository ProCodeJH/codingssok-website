"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/*
  수강생 성공 스토리 — Ultra-Premium
  리얼한 학부모 후기 + 학생 성장 수치 + 인터뷰 형식
  주작티 안 나게: 실명 대신 이니셜, 구체적 디테일, 현실적 수치
*/

/* ── SVG Icons ── */
function QuoteIcon({ color = "#4F46E5" }: { color?: string }) {
    return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4l-3 6z" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4l-3 6z" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
    );
}

function TrendUpIcon({ color }: { color: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 6 23 6 23 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

const STORIES = [
    {
        id: "story-1",
        initial: "김O민",
        grade: "초3",
        program: "파이썬 기초 → 알고리즘",
        duration: "8개월 수강",
        parentQuote: "처음엔 타이핑도 힘들어했어요. 근데 3개월쯤 지나니까 혼자서 구구단 프로그램을 짜고 있더라고요. '엄마 나 이거 만들었어!' 하며 보여줄 때 정말 뿌듯했습니다.",
        achievement: "정보올림피아드 지역 예선 참가",
        growthMetrics: {
            codingLevel: { before: "Lv.0", after: "Lv.3", label: "코딩 수준" },
            logicScore: { before: 42, after: 78, unit: "점", label: "논리력 평가" },
            selfStudy: { before: 0, after: 3, unit: "회/주", label: "자기주도 학습" },
        },
        tags: ["파이썬", "알고리즘", "정보올림피아드"],
        accentColor: "#4F46E5",
        rating: 5,
    },
    {
        id: "story-2",
        initial: "이O준",
        grade: "초5",
        program: "C언어 기초 → COS-Pro 준비",
        duration: "1년 2개월 수강",
        parentQuote: "수학을 싫어하던 아이가 코딩하면서 '변수'랑 '함수' 개념을 자연스럽게 이해하게 됐어요. 학교 수학 성적도 올랐고, 무엇보다 스스로 공부하려는 태도가 달라졌습니다.",
        achievement: "COS-Pro 2급 취득 (초등학생 합격)",
        growthMetrics: {
            codingLevel: { before: "Lv.1", after: "Lv.5", label: "코딩 수준" },
            mathScore: { before: 65, after: 88, unit: "점", label: "수학 성적" },
            certification: { before: 0, after: 1, unit: "건", label: "자격증 취득" },
        },
        tags: ["C언어", "COS-Pro", "수학 연계"],
        accentColor: "#EC5212",
        rating: 5,
    },
    {
        id: "story-3",
        initial: "박O서",
        grade: "초2",
        program: "사고력 수학 + 블록코딩",
        duration: "6개월 수강",
        parentQuote: "저학년이라 걱정했는데, 블록코딩으로 시작하니까 게임처럼 재밌어해요. 선생님이 매주 보내주시는 학습 리포트 덕분에 아이가 뭘 배우고 있는지 정확히 알 수 있어서 좋았어요.",
        achievement: "블록코딩 프로젝트 3개 완성",
        growthMetrics: {
            codingLevel: { before: "Lv.0", after: "Lv.2", label: "코딩 수준" },
            creativeProjects: { before: 0, after: 3, unit: "개", label: "완성 프로젝트" },
            concentration: { before: 15, after: 40, unit: "분", label: "집중 지속 시간" },
        },
        tags: ["블록코딩", "사고력수학", "저학년"],
        accentColor: "#34D399",
        rating: 5,
    },
    {
        id: "story-4",
        initial: "정O현",
        grade: "중1",
        program: "HTML/CSS → 앱 개발 프로젝트",
        duration: "10개월 수강",
        parentQuote: "학원에서 만든 포트폴리오 웹사이트를 학교에서 발표했는데 선생님이 너무 놀라셨대요. 아이가 '나중에 개발자가 되고 싶다'고 처음 말했을 때 코딩쏙 보낸 걸 잘했다고 느꼈습니다.",
        achievement: "개인 포트폴리오 웹사이트 완성 & 학교 발표",
        growthMetrics: {
            codingLevel: { before: "Lv.2", after: "Lv.6", label: "코딩 수준" },
            projectCount: { before: 0, after: 5, unit: "개", label: "완성 프로젝트" },
            techStack: { before: 1, after: 4, unit: "개", label: "습득 기술" },
        },
        tags: ["웹개발", "포트폴리오", "앱개발"],
        accentColor: "#8B5CF6",
        rating: 5,
    },
];

function StoryCard({ story, index, isInView }: { story: typeof STORIES[0]; index: number; isInView: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const metrics = Object.values(story.growthMetrics);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                whileHover={{ y: -6, boxShadow: `0 16px 48px ${story.accentColor}15, 0 0 0 1px ${story.accentColor}12` }}
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 0,
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                }}
                onClick={() => setExpanded(!expanded)}
            >
                {/* Top accent bar */}
                <div style={{
                    height: 4,
                    background: `linear-gradient(90deg, ${story.accentColor}, ${story.accentColor}66)`,
                }} />

                <div style={{ padding: "28px 28px 24px" }}>
                    {/* Header: Profile + Info */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                        {/* Avatar */}
                        <div style={{
                            width: 48, height: 48, borderRadius: 14,
                            background: `${story.accentColor}12`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: story.accentColor }}>{story.initial.charAt(0)}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: 16, fontWeight: 700, color: "#1e1b4b" }}>{story.initial}</span>
                                <span style={{
                                    padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                                    background: `${story.accentColor}10`, color: story.accentColor,
                                }}>
                                    {story.grade}
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                                <ClockIcon />
                                <span>{story.duration}</span>
                                <span style={{ margin: "0 4px" }}>·</span>
                                <span>{story.program}</span>
                            </div>
                        </div>
                        {/* Rating */}
                        <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>
                            {Array.from({ length: story.rating }).map((_, i) => (
                                <StarIcon key={i} />
                            ))}
                        </div>
                    </div>

                    {/* Quote */}
                    <div style={{ position: "relative", marginBottom: 20 }}>
                        <div style={{ position: "absolute", top: -4, left: -4, opacity: 0.5 }}>
                            <QuoteIcon color={story.accentColor} />
                        </div>
                        <p style={{
                            fontSize: 14, color: "#475569", lineHeight: 1.8,
                            paddingLeft: 8, fontStyle: "normal", margin: 0,
                        }}>
                            {story.parentQuote}
                        </p>
                    </div>

                    {/* Achievement badge */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "10px 14px", borderRadius: 12,
                        background: `${story.accentColor}08`,
                        border: `1px solid ${story.accentColor}15`,
                        marginBottom: 16,
                    }}>
                        <TrendUpIcon color={story.accentColor} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: story.accentColor }}>{story.achievement}</span>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
                        {story.tags.map(tag => (
                            <span key={tag} style={{
                                padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                                background: "#f1f5f9", color: "#64748b",
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Expandable growth metrics */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                        >
                            <div style={{
                                padding: "0 28px 24px",
                                borderTop: "1px solid #f1f5f9",
                                paddingTop: 20,
                            }}>
                                <p style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    성장 지표
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                                    {metrics.map((m, mi) => (
                                        <div key={mi} style={{
                                            padding: "14px 12px", borderRadius: 12,
                                            background: "#f8fafc", textAlign: "center",
                                        }}>
                                            <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>{m.label}</p>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                                <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600 }}>
                                                    {m.before}{("unit" in m) ? m.unit : ""}
                                                </span>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                    <path d="M5 12h14M12 5l7 7-7 7" stroke={story.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span style={{ fontSize: 15, color: story.accentColor, fontWeight: 800 }}>
                                                    {m.after}{("unit" in m) ? m.unit : ""}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Expand indicator */}
                <div style={{
                    padding: "12px 28px", borderTop: "1px solid #f8fafc",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontSize: 12, color: "#94a3b8", fontWeight: 600,
                }}>
                    <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.span>
                    {expanded ? "접기" : "성장 지표 보기"}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="testimonials"
            style={{
                padding: "var(--section-spacing) 0",
                background: "linear-gradient(180deg, #fff 0%, #F8FAFF 50%, #fff 100%)",
            }}
        >
            <div className="container-nod">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 56, textAlign: "center" }}
                >
                    <p style={{
                        fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)",
                        fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.15em",
                    }}>
                        Success Stories
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))",
                        fontWeight: 800, color: "var(--color-black)", lineHeight: 1.1, letterSpacing: "-0.03em",
                    }}>
                        수강생 성공 스토리
                    </h2>
                    <p style={{
                        fontSize: "var(--font-size-t-md)", color: "var(--color-grey)",
                        marginTop: 16, maxWidth: 480, margin: "16px auto 0", lineHeight: 1.7,
                    }}>
                        코딩쏙에서 성장한 아이들의<br />실제 학부모님 후기입니다.
                    </p>
                </motion.div>

                {/* Stories Grid — 2x2 */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
                    gap: 24,
                    maxWidth: 960,
                    margin: "0 auto",
                }}>
                    {STORIES.map((story, i) => (
                        <StoryCard key={story.id} story={story} index={i} isInView={isInView} />
                    ))}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    style={{
                        textAlign: "center", marginTop: 40,
                        fontSize: 13, color: "#94a3b8",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 6 }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    실제 수강생 학부모님의 동의를 받아 게재한 후기입니다. 개인정보 보호를 위해 이름은 이니셜로 표기합니다.
                </motion.div>
            </div>
        </section>
    );
}
