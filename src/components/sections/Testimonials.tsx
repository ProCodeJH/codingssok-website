"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

/* ?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧??
   ?섍컯???깃났 ?ㅽ넗由???Quantum Nexus Slider
   Aero-glass cards 쨌 Horizontal Scroll 쨌 3D tilt
   ?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧?먥븧??*/

const STORIES = [
    {
        name: "源O誘?,
        initial: "源",
        avatarStyle: { background: "linear-gradient(to bottom right, #3b82f6, #4f46e5)" } as React.CSSProperties,
        avatarShadow: "0 8px 20px rgba(79,70,229,0.3)",
        tagStyle: { background: "rgba(219,234,254,0.5)", border: "1px solid #bfdbfe", color: "#1d4ed8" } as React.CSSProperties,
        track: "Python Core",
        level: "Lv.3 Completed",
        stars: 1,
        quote: "泥섏쓬????댄븨???섎뱾?댄뻽吏留? 3媛쒖썡 留뚯뿉 援ш뎄???뚭퀬由ъ쬁???ㅼ뒪濡??ㅺ퀎?덉뒿?덈떎. ?쇰━???ш퀬???뺤옣???덉뿉 蹂댁엯?덈떎.",
        highlight: "援ш뎄???뚭퀬由ъ쬁",
        hlStyle: { background: "#e0e7ff", color: "#4338ca" } as React.CSSProperties,
        achieveIcon: "trending_up",
        achieveIconStyle: { color: "#4f46e5", background: "#eef2ff" } as React.CSSProperties,
        achievement: "?뺣낫?щ┝?쇱븘???덉꽑 ?듦낵",
        tags: ["#Algorithm", "#Python"],
    },
    {
        name: "?큀以",
        initial: "??,
        avatarStyle: { background: "linear-gradient(to bottom right, #fb923c, #ef4444)" } as React.CSSProperties,
        avatarShadow: "0 8px 20px rgba(249,115,22,0.3)",
        tagStyle: { background: "rgba(255,237,213,0.5)", border: "1px solid #fed7aa", color: "#c2410c" } as React.CSSProperties,
        track: "C++ Master",
        level: "Lv.5 Completed",
        stars: 2,
        quote: "?섑븰???ш린?섎젮???꾩씠媛 肄붾뵫 蹂?섎? 諛곗슦硫??⑥닔 媛쒕뀗???꾨꼍???댄빐?덉뒿?덈떎. 援먭낵 ?깆쟻源뚯? ?섏쭅 ?곸듅?덉뼱??",
        highlight: "?⑥닔 媛쒕뀗",
        hlStyle: { background: "#ffedd5", color: "#c2410c" } as React.CSSProperties,
        achieveIcon: "emoji_events",
        achieveIconStyle: { color: "#ea580c", background: "#fff7ed" } as React.CSSProperties,
        achievement: "COS-Pro 2湲?理쒖뿰???⑷꺽",
        tags: ["#C_Lang", "#Math_Link"],
    },
    {
        name: "諛뷤??,
        initial: "諛?,
        avatarStyle: { background: "linear-gradient(to bottom right, #34d399, #14b8a6)" } as React.CSSProperties,
        avatarShadow: "0 8px 20px rgba(16,185,129,0.3)",
        tagStyle: { background: "rgba(209,250,229,0.5)", border: "1px solid #a7f3d0", color: "#047857" } as React.CSSProperties,
        track: "Block Logic",
        level: "Lv.2 Completed",
        stars: 1,
        quote: "??숇뀈?대씪 嫄깆젙?덈뒗?? 釉붾줉肄붾뵫??寃뚯엫泥섎읆 利먭꺼?? 留ㅼ＜ ?ㅻ뒗 AI 遺꾩꽍 由ы룷?몃줈 ?꾩씠??愿?ъ궗瑜??뺥솗???뚯븙?덉뒿?덈떎.",
        highlight: "AI 遺꾩꽍 由ы룷??,
        hlStyle: { background: "#d1fae5", color: "#047857" } as React.CSSProperties,
        achieveIcon: "auto_awesome",
        achieveIconStyle: { color: "#059669", background: "#ecfdf5" } as React.CSSProperties,
        achievement: "李쎌옉 寃뚯엫 3醫?異쒖떆",
        tags: ["#Logic", "#Creativity"],
    },
    {
        name: "?뷤??,
        initial: "??,
        avatarStyle: { background: "linear-gradient(to bottom right, #a855f7, #d946ef)" } as React.CSSProperties,
        avatarShadow: "0 8px 20px rgba(168,85,247,0.3)",
        tagStyle: { background: "rgba(243,232,255,0.5)", border: "1px solid #e9d5ff", color: "#7c3aed" } as React.CSSProperties,
        track: "Web Dev",
        level: "Lv.6 Completed",
        stars: 3,
        quote: "?숈썝?먯꽌 留뚮뱺 ?ы듃?대━?ㅻ줈 ?숆탳 諛쒗몴????곸쓣 諛쏆븯?댁슂. ??ㅽ깮 媛쒕컻?먮씪??援ъ껜?곸씤 轅덉쓣 媛吏寃??섏뿀?듬땲??",
        highlight: "??ㅽ깮 媛쒕컻??,
        hlStyle: { background: "#f3e8ff", color: "#7c3aed" } as React.CSSProperties,
        achieveIcon: "rocket_launch",
        achieveIconStyle: { color: "#9333ea", background: "#faf5ff" } as React.CSSProperties,
        achievement: "??媛쒕컻 怨듬え???낆긽",
        tags: ["#FullStack", "#Portfolio"],
    },
];

function StoryCard({ story, index }: { story: typeof STORIES[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) translate3d(${x * 10}px, ${y * 10}px, 0) scale(1.02)`;
    };
    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translate3d(0,0,0) scale(1)";
    };

    // Highlight the keyword in quote
    const parts = story.quote.split(story.highlight);

    return (
        <div className="ts-item group">
            <div className="ts-card-wrap" style={{ animationDelay: `${0.15 * index}s` }}>
                <div
                    ref={cardRef}
                    className="ts-glass"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Specular highlight */}
                    <div className="ts-specular" />

                    {/* Header */}
                    <div className="ts-header">
                        <div className="ts-avatar-row">
                            <div className="ts-avatar" style={{ ...story.avatarStyle, boxShadow: story.avatarShadow }}>
                                {story.initial}
                            </div>
                            <div>
                                <h3 className="ts-name">{story.name}</h3>
                                <div className="ts-track-row">
                                    <span className="ts-track-badge" style={story.tagStyle}>{story.track}</span>
                                    <span className="ts-level">{story.level}</span>
                                </div>
                            </div>
                        </div>
                        <div className="ts-stars">
                            {Array.from({ length: story.stars }).map((_, i) => (
                                <span key={i} className="material-symbols-outlined ts-star" style={{ transitionDelay: `${i * 50}ms` }}>star</span>
                            ))}
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="ts-quote-area">
                        <p className="ts-quote">
                            &ldquo;{parts[0]}<span className="ts-hl" style={story.hlStyle}>{story.highlight}</span>{parts[1]}&rdquo;
                        </p>
                    </div>

                    {/* Achievement */}
                    <div className="ts-footer">
                        <div className="ts-achieve-box">
                            <span className="material-symbols-outlined ts-achieve-icon" style={story.achieveIconStyle}>{story.achieveIcon}</span>
                            <div>
                                <div className="ts-achieve-label">Achievement</div>
                                <div className="ts-achieve-text">{story.achievement}</div>
                            </div>
                        </div>
                        <div className="ts-tags">
                            {story.tags.map(tag => (
                                <span key={tag} className={["#A", "#C", "#F", "#L"].some(p => tag.startsWith(p))
                                    ? "ts-tag ts-tag-dark" : "ts-tag ts-tag-light"}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {/* RT Shadow */}
                <div className="ts-rt-shadow" />
            </div>
        </div>
    );
}

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={ref} id="testimonials" className="ts-section">
                        
            {/* BG */}
            <div className="ts-bg" aria-hidden>
                <div className="ts-grid" />
                <div className="ts-orb ts-orb1" />
                <div className="ts-orb ts-orb2" />
                <div className="ts-spark ts-sp1" /><div className="ts-spark ts-sp2" />
                <div className="ts-spark ts-sp3" /><div className="ts-spark ts-sp4" /><div className="ts-spark ts-sp5" />
            </div>

            <div className="ts-container">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="ts-header-area"
                >
                    <div className="ts-live-badge">
                        <span className="ts-live-dot" />
                        <span>?섍컯???꾧린</span>
                    </div>
                    <TextReveal as="h2" className="text-center ts-main-title">
                        ?섍컯???깃났 ?ㅽ넗由?
                    </TextReveal>
                    <p className="ts-main-sub">
                        肄붾뵫???섍컯?앸뱾???ㅼ젣 ?깆옣 ?댁빞湲곕? ?뺤씤?섏꽭??
                    </p>
                </motion.header>
            </div>

            {/* Carousel */}
            <div className="ts-carousel" ref={scrollRef}>
                {STORIES.map((story, i) => (
                    <StoryCard key={i} story={story} index={i} />
                ))}
            </div>

            <style>{`
/* ?먥븧??Section ?먥븧??*/
.ts-section { position: relative; overflow: hidden; padding: clamp(80px,10vw,140px) 0 clamp(60px,8vw,100px); background: #F8F7F4; font-family: 'Pretendard', sans-serif; color: #1e293b; }
.ts-container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); position: relative; z-index: 10; }

/* BG */
.ts-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.ts-grid { position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(circle at center, black 40%, transparent 80%); opacity: 0.3; }
.ts-orb { position: absolute; border-radius: 50%; mix-blend-mode: multiply; filter: blur(120px); }
.ts-orb1 { top: -20%; left: -10%; width: 60vw; height: 60vw; background: rgba(192,132,252,0.15); animation: tsHue 15s infinite linear; }
.ts-orb2 { bottom: -20%; right: -10%; width: 60vw; height: 60vw; background: rgba(129,140,248,0.15); animation: tsHue 15s infinite linear; animation-delay: -5s; }
.ts-spark { position: absolute; width: 4px; height: 4px; background: #6366f1; border-radius: 50%; filter: blur(1px); box-shadow: 0 0 10px #6366f1; animation: tsFloat 8s ease-in-out infinite; }
.ts-sp1 { left: 10%; top: 80%; animation-duration: 7s; }
.ts-sp2 { left: 30%; top: 40%; animation-duration: 9s; animation-delay: 1s; }
.ts-sp3 { left: 70%; top: 60%; animation-duration: 6s; animation-delay: 2s; }
.ts-sp4 { left: 90%; top: 20%; animation-duration: 11s; animation-delay: 0.5s; }
.ts-sp5 { left: 50%; top: 90%; animation-duration: 8s; animation-delay: 3s; }

/* Header */
.ts-header-area { text-align: center; margin-bottom: clamp(32px,5vw,56px); }
.ts-live-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px; border-radius: 999px; background: rgba(255,255,255,0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.6); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #312e81; margin-bottom: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); animation: tsPulseGlow 4s ease-in-out infinite; font-family: 'Orbitron', sans-serif; }
.ts-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 10px #22c55e; }
.ts-main-title { font-family: 'Pretendard', sans-serif !important; font-size: clamp(2.5rem, 6vw, 5rem) !important; font-weight: 900 !important; letter-spacing: -0.04em; background: linear-gradient(to bottom, #475569 0%, #1e293b 50%, #0f172a 100%); -webkit-background-clip: text !important; -webkit-text-fill-color: transparent; }
.ts-main-sub { margin-top: 16px; font-size: 16px; color: #64748b; font-weight: 500; background: rgba(255,255,255,0.1); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px); display: inline-block; }
.ts-accent-num { color: #4F46E5; font-weight: 700; }

/* ?먥븧??Carousel ?먥븧??*/
.ts-carousel { display: flex; gap: 3rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: 4rem 2rem; width: 100%; scrollbar-width: none; position: relative; z-index: 10; }
.ts-carousel::-webkit-scrollbar { display: none; }
.ts-item { scroll-snap-align: center; flex-shrink: 0; width: 420px; max-width: 85vw; }

/* Card */
.ts-card-wrap { position: relative; height: 580px; }
.ts-glass {
    width: 100%; height: 100%; border-radius: 2rem; padding: 32px;
    display: flex; flex-direction: column; position: relative; overflow: hidden;
    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.5);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.1);
    transform-style: preserve-3d;
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: default;
}
.ts-specular { position: absolute; inset: 0; background: linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.4) 40%, transparent 60%); z-index: 10; opacity: 0; transition: opacity 0.3s; pointer-events: none; border-radius: inherit; }
.ts-glass:hover .ts-specular { opacity: 1; }
.ts-rt-shadow { position: absolute; bottom: -40px; left: 10%; width: 80%; height: 20px; background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%); filter: blur(10px); transform: rotateX(60deg); z-index: -1; transition: all 0.4s; }
.ts-glass:hover ~ .ts-rt-shadow { transform: rotateX(60deg) scale(0.8); opacity: 0.6; }

/* Header in card */
.ts-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; }
.ts-avatar-row { display: flex; align-items: center; gap: 16px; }
.ts-avatar { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: 700; box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
.ts-name { font-size: 22px; font-weight: 700; color: #1e293b; }
.ts-track-row { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
.ts-track-badge { padding: 2px 8px; border-radius: 4px; border: 1px solid; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.ts-level { font-size: 13px; color: #64748b; }
.ts-stars { display: flex; gap: 4px; }
.ts-star { color: #f59e0b; font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15)); transform: rotateX(45deg) rotateZ(45deg); transition: transform 0.3s; }
.group:hover .ts-star { transform: rotateX(45deg) rotateZ(225deg) scale(1.2); }

/* Quote */
.ts-quote-area { flex-grow: 1; }
.ts-quote { font-size: 17px; color: #475569; line-height: 1.7; font-weight: 500; }
.ts-hl { padding: 1px 6px; border-radius: 4px; }

/* Footer */
.ts-footer { margin-top: auto; }
.ts-achieve-box { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; background: rgba(255,255,255,0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.5); box-shadow: inset 0 0 10px rgba(255,255,255,0.2); margin-bottom: 16px; }
.ts-achieve-icon { padding: 8px; border-radius: 10px; font-size: 22px; }
.ts-achieve-label { font-size: 10px; color: #64748b; font-weight: 600; text-transform: uppercase; }
.ts-achieve-text { font-size: 14px; font-weight: 700; color: #1e293b; }
.ts-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.ts-tag { padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; }
.ts-tag-dark { background: #1e293b; color: #fff; box-shadow: 0 4px 12px rgba(30,41,59,0.2); }
.ts-tag-light { background: #fff; color: #475569; border: 1px solid #e2e8f0; }

/* Keyframes */
@keyframes tsHue { 0% { filter: hue-rotate(0deg) blur(120px); } 100% { filter: hue-rotate(360deg) blur(120px); } }
@keyframes tsFloat { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; } 50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; } }
@keyframes tsPulseGlow { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
            `}</style>
        </section>
    );
}
