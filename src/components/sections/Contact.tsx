"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════
   Contact — Quantum Nexus Forge Ultra V3.2
   Monolith-slab form · Code-shard BG · Flow-lines
   Two-column: info left, glass form right
   ═══════════════════════════════════════════ */

const FEATURES = [
    { icon: "school", title: "소수 정예 교육", desc: "학생 개인 맞춤형 1:1 밀착 지도로 확실한 실력 향상을 보장합니다." },
    { icon: "code", title: "실전 코딩 수업", desc: "C, Python, 웹개발 등 실무 중심 커리큘럼으로 바로 써먹을 수 있는 코딩을 배웁니다." },
    { icon: "emoji_events", title: "대회·자격증 대비", desc: "정보올림피아드, COS-Pro 등 목표에 맞는 특화 프로그램을 운영합니다." },
];

const INTERESTS = ["Python", "C/C++", "피지컬컴퓨팅", "사고력수학", "자격증"];

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const [selected, setSelected] = useState<string[]>([]);

    const toggleInterest = (interest: string) => {
        setSelected(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    return (
        <section ref={ref} id="contact" className="ct-section">

            {/* BG */}
            <div className="ct-bg" aria-hidden>
                <div className="ct-gradient-bg" />
                <div className="ct-vol-light" />
                <div className="ct-code ct-code1">class Nexus {"{"} constructor() {"{"} this.future = true; {"}"} {"}"}</div>
                <div className="ct-code ct-code2">&lt;StreamData protocol=&quot;v3.2&quot; /&gt;</div>
                <div className="ct-code ct-code3">import {"{"} Consciousness {"}"} from &apos;@universe/core&apos;;</div>
                <div className="ct-code ct-code4">await connection.establish(&apos;secure&apos;);</div>
                <div className="ct-orb ct-orb1" />
                <div className="ct-orb ct-orb2" />
                {/* Flow lines SVG */}
                <svg className="ct-flow-svg" preserveAspectRatio="none">
                    <path className="ct-flow-line" d="M 200 300 C 400 300, 400 200, 900 250" />
                    <path className="ct-flow-line ct-flow2" d="M 200 450 C 450 450, 500 400, 900 450" />
                    <path className="ct-flow-line ct-flow3" d="M 200 600 C 400 600, 500 700, 900 650" />
                </svg>
            </div>

            <div className="ct-container">
                <div className="ct-grid">
                    {/* Left — Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="ct-info"
                    >
                        <Image
                            src="/images/promo/logo-codingssok.png"
                            alt="코딩쏙"
                            width={160}
                            height={50}
                            style={{ objectFit: "contain", marginBottom: 24 }}
                        />
                        <div className="ct-proto-badge">
                            <span className="ct-proto-line" />
                            <span className="ct-proto-text">무료 상담 접수</span>
                        </div>
                        <h2 className="ct-main-title">
                            <span className="ct-title-dark">코딩 상담</span>
                            <span className="ct-title-metallic">신청하기</span>
                        </h2>
                        <p className="ct-main-desc">
                            현직 IT 전문가가 직접 상담해드립니다. 아이의 수준과 목표에 맞는 최적의 학습 방향을 안내합니다.
                        </p>

                        <div className="ct-features">
                            {FEATURES.map((f, i) => (
                                <motion.div
                                    key={f.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                                    className="ct-feature group"
                                >
                                    <div className="ct-feature-icon">
                                        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{f.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="ct-feature-title">{f.title}</h3>
                                        <p className="ct-feature-desc">{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="ct-form-wrap"
                    >
                        {/* Orbiting decorations */}
                        <div className="ct-orbit ct-orbit1" />
                        <div className="ct-orbit ct-orbit2" />
                        <div className="ct-orbit ct-orbit3" />

                        <div className="ct-slab">
                            <div className="ct-secure-badge">
                                <span className="ct-secure-dot" />
                                <span>안전한 정보 접수</span>
                            </div>

                            <div className="ct-form-header">
                                <h3 className="ct-form-title">상담 신청</h3>
                                <p className="ct-form-sub">아래 정보를 입력하시면 빠르게 연락드리겠습니다.</p>
                            </div>

                            <form className="ct-form" onSubmit={e => e.preventDefault()}>
                                <div className="ct-form-grid">
                                    <div className="ct-field group">
                                        <label className="ct-label">이름</label>
                                        <div className="ct-slot">
                                            <input type="text" placeholder="이름" className="ct-input" />
                                        </div>
                                    </div>
                                    <div className="ct-field group">
                                        <label className="ct-label">연락처</label>
                                        <div className="ct-slot">
                                            <input type="tel" placeholder="010-0000-0000" className="ct-input" />
                                        </div>
                                    </div>
                                </div>

                                <div className="ct-field group">
                                    <label className="ct-label">학년</label>
                                    <div className="ct-slot ct-select-wrap">
                                        <select className="ct-input ct-select">
                                            <option disabled selected value="">학년 선택</option>
                                            <option>초등학생 (1~3학년)</option>
                                            <option>초등학생 (4~6학년)</option>
                                            <option>중학생</option>
                                            <option>고등학생</option>
                                            <option>성인</option>
                                        </select>
                                        <span className="material-symbols-outlined ct-select-arrow">expand_more</span>
                                    </div>
                                </div>

                                <div className="ct-field">
                                    <label className="ct-label">관심 과목</label>
                                    <div className="ct-chips">
                                        {INTERESTS.map(int => (
                                            <button
                                                key={int}
                                                type="button"
                                                className={`ct-chip ${selected.includes(int) ? "ct-chip-active" : ""}`}
                                                onClick={() => toggleInterest(int)}
                                            >
                                                {int}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="ct-submit group">
                                    <div className="ct-submit-bg" />
                                    <div className="ct-submit-shine" />
                                    <span className="ct-submit-text">
                                        상담 신청하기
                                        <span className="material-symbols-outlined ct-submit-icon">send</span>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
/* ═══ Section ═══ */
.ct-section { position: relative; overflow: hidden; padding: clamp(80px,10vw,140px) 0; font-family: 'Noto Sans KR', sans-serif; color: #1e293b; min-height: 100vh; display: flex; align-items: center; }
.ct-container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); position: relative; z-index: 10; width: 100%; }

/* BG */
.ct-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.ct-gradient-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #eff6ff 0%, #FDFBF7 50%, #fff0f3 100%); }
.ct-vol-light { position: absolute; width: 150%; height: 100%; background: linear-gradient(60deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 80%); top: -50%; left: -50%; transform: rotate(-30deg); filter: blur(50px); animation: ctPulse 4s ease-in-out infinite; }
.ct-code { position: absolute; font-family: 'Space Grotesk', monospace; color: rgba(78,205,196,0.12); font-size: 14px; white-space: nowrap; transform-style: preserve-3d; }
.ct-code1 { top: 10%; left: 5%; animation: ctShard 10s ease-in-out infinite; transform: translateZ(-50px); }
.ct-code2 { bottom: 20%; left: 15%; animation: ctShard 10s ease-in-out infinite 2s; transform: translateZ(-20px) rotate(-15deg); }
.ct-code3 { top: 30%; right: 10%; animation: ctShard 10s ease-in-out infinite 4s; transform: translateZ(-80px); }
.ct-code4 { bottom: 10%; right: 25%; animation: ctShard 10s ease-in-out infinite 1s; transform: translateZ(-40px) rotate(10deg); }
.ct-orb { position: absolute; border-radius: 50%; mix-blend-mode: multiply; filter: blur(150px); }
.ct-orb1 { top: -25%; left: -15%; width: 70%; height: 70%; background: #4ECDC4; opacity: 0.08; animation: ctFloat 8s ease-in-out infinite; }
.ct-orb2 { bottom: -25%; right: -15%; width: 60%; height: 60%; background: #f5576c; opacity: 0.08; animation: ctFloat 8s ease-in-out infinite; animation-delay: -3s; }
.ct-flow-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: none; }
@media (min-width: 1024px) { .ct-flow-svg { display: block; } }
.ct-flow-line { fill: none; stroke: #4ECDC4; stroke-width: 1.5; stroke-dasharray: 10 30; opacity: 0.3; filter: drop-shadow(0 0 5px #4ECDC4); animation: ctDash 30s linear infinite; }
.ct-flow2 { animation-duration: 25s; stroke-opacity: 0.2; }
.ct-flow3 { animation-duration: 35s; stroke-opacity: 0.15; }

/* Grid Layout */
.ct-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
@media (min-width: 1024px) { .ct-grid { grid-template-columns: 5fr 6fr; gap: 64px; } }

/* Left Info */
.ct-info { animation: ctBreathe 4s ease-in-out infinite; }
.ct-proto-badge { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.ct-proto-line { width: 48px; height: 2px; background: linear-gradient(to right, #f5576c, #4ECDC4); border-radius: 999px; }
.ct-proto-text { font-size: 11px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; background: linear-gradient(135deg, #f093fb, #f5576c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.ct-main-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 16px; }
.ct-title-dark { display: block; color: #1e293b; text-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.ct-title-metallic { display: block; background: linear-gradient(to right, #2d3748 20%, #718096 40%, #2d3748 60%, #1a202c 80%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: ctShimmer 5s linear infinite; }
.ct-main-desc { font-size: 16px; color: #64748b; line-height: 1.7; font-weight: 300; max-width: 440px; border-left: 4px solid rgba(78,205,196,0.3); padding-left: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); border-radius: 0 12px 12px 0; padding: 12px 16px 12px 20px; margin-bottom: 32px; }
.ct-features { display: flex; flex-direction: column; gap: 12px; }
.ct-feature { display: flex; align-items: flex-start; gap: 20px; padding: 16px; border-radius: 16px; border: 1px solid transparent; transition: all 0.5s; cursor: default; }
.ct-feature:hover { background: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.6); box-shadow: 0 8px 20px rgba(78,205,196,0.05); }
.ct-feature-icon { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, rgba(78,205,196,0.15), transparent); display: flex; align-items: center; justify-content: center; color: #4ECDC4; flex-shrink: 0; transition: all 0.3s; box-shadow: inset 0 0 20px rgba(78,205,196,0.15); }
.ct-feature:hover .ct-feature-icon { transform: scale(1.1) rotate(3deg); }
.ct-feature-title { font-size: 18px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; color: #1e293b; margin-bottom: 4px; transition: color 0.3s; }
.ct-feature:hover .ct-feature-title { color: #4ECDC4; }
.ct-feature-desc { font-size: 14px; color: #64748b; line-height: 1.5; }

/* Right Form */
.ct-form-wrap { position: relative; perspective: 2000px; animation: ctBreathe 4s ease-in-out infinite; animation-delay: -1s; }
.ct-orbit { position: absolute; border: 1px solid; border-radius: 50%; pointer-events: none; }
.ct-orbit1 { top: -64px; right: -64px; width: 192px; height: 192px; border-color: rgba(78,205,196,0.15); animation: spin 10s linear infinite; }
.ct-orbit2 { top: -64px; right: -64px; width: 144px; height: 144px; border-color: rgba(78,205,196,0.08); animation: spin 15s linear infinite reverse; }
.ct-orbit3 { bottom: -48px; left: -48px; width: 128px; height: 128px; border-color: rgba(245,87,108,0.15); animation: spin 20s linear infinite reverse; }

/* Slab */
.ct-slab {
    position: relative; z-index: 20;
    background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.5); border-top: 1px solid rgba(255,255,255,0.8); border-left: 1px solid rgba(255,255,255,0.8);
    box-shadow: 0 20px 50px -10px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 0 80px rgba(100,200,255,0.06);
    border-radius: 2.5rem; padding: clamp(32px,5vw,56px);
    transform-style: preserve-3d;
    transition: transform 0.5s;
    animation: ctSlabPulse 4s ease-in-out infinite;
    overflow: visible;
}
.ct-slab::before { content: ''; position: absolute; inset: -2px; border-radius: inherit; background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%); z-index: 1; opacity: 0.25; pointer-events: none; mix-blend-mode: overlay; }
.ct-slab::after { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 3px 3px 6px rgba(255,255,255,0.2), inset -3px -3px 6px rgba(0,0,0,0.06); z-index: 2; pointer-events: none; }
.ct-slab:hover { transform: scale(1.01); }

/* Secure badge */
.ct-secure-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.6); padding: 8px 28px; border-radius: 999px; box-shadow: 0 10px 20px rgba(0,0,0,0.06); z-index: 30; display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; font-family: 'Space Grotesk', sans-serif; color: #1e293b; }
.ct-secure-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: ctPulse 1s ease-in-out infinite; }

/* Form header */
.ct-form-header { text-align: center; margin-bottom: 32px; position: relative; z-index: 10; }
.ct-form-title { font-size: clamp(24px, 3.5vw, 36px); font-weight: 700; font-family: 'Space Grotesk', sans-serif; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 8px; }
.ct-form-sub { font-size: 14px; color: #64748b; font-weight: 500; letter-spacing: 0.02em; }

/* Form */
.ct-form { display: flex; flex-direction: column; gap: 20px; position: relative; z-index: 10; }
.ct-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.ct-field { display: flex; flex-direction: column; gap: 8px; }
.ct-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; padding-left: 4px; transition: color 0.3s; }
.group:focus-within .ct-label { color: #4ECDC4; }
.ct-slot {
    background: rgba(230,240,255,0.12);
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.06), inset -2px -2px 5px rgba(255,255,255,0.5);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px; overflow: hidden;
    transition: all 0.4s;
    position: relative;
}
.ct-slot:focus-within { background: rgba(255,255,255,0.25); box-shadow: 0 0 15px rgba(78,205,196,0.2), inset 1px 1px 2px rgba(0,0,0,0.03); border-color: rgba(78,205,196,0.4); transform: translateZ(5px); }
.ct-input { width: 100%; background: transparent; border: none; padding: 14px 16px; color: #1e293b; font-weight: 500; font-size: 15px; outline: none; }
.ct-input::placeholder { color: #94a3b8; }
.ct-select-wrap { position: relative; }
.ct-select { appearance: none; cursor: pointer; position: relative; z-index: 10; }
.ct-select-arrow { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; font-size: 20px; }

/* Chips */
.ct-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.ct-chip { padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; background: rgba(255,255,255,0.2); color: #475569; border: 1px solid rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s; backdrop-filter: blur(4px); }
.ct-chip:hover { background: rgba(255,255,255,0.4); }
.ct-chip-active { background: linear-gradient(135deg, #4ECDC4, #2dd4bf); color: #fff; border-color: transparent; box-shadow: 0 5px 15px -5px rgba(78,205,196,0.5); }

/* Submit */
.ct-submit { position: relative; width: 100%; height: 64px; border-radius: 999px; border: none; cursor: pointer; overflow: hidden; margin-top: 16px; animation: ctLiquid 3s infinite; }
.ct-submit-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: inherit; opacity: 0.9; transition: opacity 0.3s; }
.ct-submit:hover .ct-submit-bg { opacity: 1; }
.ct-submit-shine { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent 50%); border-radius: inherit; pointer-events: none; }
.ct-submit-text { position: relative; z-index: 10; display: flex; align-items: center; justify-content: center; gap: 12px; color: #fff; font-weight: 700; font-size: 17px; letter-spacing: 0.15em; text-transform: uppercase; }
.ct-submit-icon { font-size: 20px; transition: transform 0.3s; }
.ct-submit:hover .ct-submit-icon { transform: translateX(8px); }

/* Keyframes */
@keyframes ctFloat { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-15px) rotate(0.5deg); } }
@keyframes ctShard { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
@keyframes ctBreathe { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.005); filter: brightness(1.03); } }
@keyframes ctPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes ctSlabPulse { 0%, 100% { box-shadow: inset 0 0 30px rgba(66,153,225,0.06), 0 20px 50px rgba(0,0,0,0.15); } 50% { box-shadow: inset 0 0 60px rgba(66,153,225,0.15), 0 25px 60px rgba(66,153,225,0.1); } }
@keyframes ctShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
@keyframes ctDash { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }
@keyframes ctLiquid { 0% { box-shadow: 0 0 0 0 rgba(245,87,108,0.3); } 70% { box-shadow: 0 0 0 15px rgba(245,87,108,0); } 100% { box-shadow: 0 0 0 0 rgba(245,87,108,0); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </section>
    );
}
