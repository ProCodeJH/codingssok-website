"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { COSPRO_SUB_COURSES } from "@/data/courses";
import { COSPRO_PY2_CATEGORIES, type CosProUnit } from "@/data/cospro-python-units";
import { motion, AnimatePresence } from "framer-motion";

export default function CosProSubCoursePage() {
    const params = useParams();
    const router = useRouter();
    const subId = params.subId as string;
    const [activeUnit, setActiveUnit] = useState<CosProUnit | null>(null);
    const [expandedCat, setExpandedCat] = useState<Set<string>>(new Set(["theory"]));

    const sub = useMemo(() => COSPRO_SUB_COURSES.find(s => s.id === subId), [subId]);

    // 현재는 cospro-python-2만 콘텐츠 있음
    const hasContent = subId === "cospro-python-2";
    const categories = hasContent ? COSPRO_PY2_CATEGORIES : [];

    const toggleCat = (catId: string) => {
        setExpandedCat(prev => {
            const next = new Set(prev);
            if (next.has(catId)) next.delete(catId); else next.add(catId);
            return next;
        });
    };

    if (!sub) {
        return (
            <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>코스를 찾을 수 없습니다</h2>
                <button onClick={() => router.push("/dashboard/learning/courses/5")} style={{
                    padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                    background: "linear-gradient(135deg, #ec4899, #8b5cf6)", color: "#fff", fontSize: 14, fontWeight: 700, marginTop: 16,
                }}>CosPro 선택으로 돌아가기</button>
            </div>
        );
    }

    // 학습 뷰어 (iframe)
    if (activeUnit) {
        return (
            <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                <style>{`
                    .cv-bar{display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:48px;background:#fff;border-bottom:1px solid #e2e8f0;flex-shrink:0}
                    .cv-back{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#64748b;cursor:pointer;border:none;background:none;transition:color .2s}
                    .cv-back:hover{color:#3b82f6}
                    .cv-title{font-size:14px;font-weight:700;color:#0f172a}
                    .cv-badge{padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;color:#fff}
                `}</style>
                <div className="cv-bar">
                    <button className="cv-back" onClick={() => setActiveUnit(null)}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                        목록으로
                    </button>
                    <span className="cv-title">{activeUnit.title}</span>
                    <span className="cv-badge" style={{ background: sub.gradient }}>{sub.title}</span>
                </div>
                <iframe
                    src={`/learn/cospro-python/${activeUnit.htmlFile}`}
                    style={{ flex: 1, border: "none", width: "100%" }}
                    title={activeUnit.title}
                />
            </div>
        );
    }

    // 콘텐츠 없는 서브 코스
    if (!hasContent) {
        return (
            <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #f8fafc, #f0f4ff)", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", padding: "32px 24px" }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <a style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#94a3b8", cursor: "pointer", marginBottom: 24 }}
                        onClick={() => router.push("/dashboard/learning/courses/5")}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                        CosPro 선택으로 돌아가기
                    </a>
                    <div style={{ maxWidth: 800, margin: "0 auto 40px", borderRadius: 20, padding: 40, background: sub.gradient, color: "#fff", textAlign: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.1),transparent 50%)", pointerEvents: "none" }} />
                        <div style={{ fontSize: 56, marginBottom: 12, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>{sub.icon}</div>
                        <h1 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 8px", letterSpacing: -0.3 }}>{sub.title}</h1>
                        <p style={{ fontSize: 15, opacity: 0.8, margin: 0, lineHeight: 1.6 }}>{sub.description}</p>
                    </div>
                    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", background: "#fff", borderRadius: 16, padding: "48px 32px", border: "1px solid #e2e8f0" }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>📖</div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>학습 자료 준비 중</h3>
                        <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>{sub.title} 학습 자료를 준비하고 있습니다.</p>
                    </div>
                </div>
            </div>
        );
    }

    // 유닛 목록 뷰
    const totalUnits = categories.reduce((sum, c) => sum + c.units.length, 0);

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #f8fafc, #f0f4ff)", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
            <style>{`
                .csp-page{max-width:900px;margin:0 auto;padding:32px 24px}
                .csp-back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#94a3b8;cursor:pointer;margin-bottom:20px;transition:color .2s;text-decoration:none}
                .csp-back:hover{color:#3b82f6}
                .csp-hero{border-radius:20px;padding:32px;color:#fff;position:relative;overflow:hidden;margin-bottom:32px}
                .csp-hero::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.1),transparent 50%);pointer-events:none}
                .csp-hero-top{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1}
                .csp-hero-left{display:flex;align-items:center;gap:16px}
                .csp-hero-icon{font-size:40px;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.3))}
                .csp-hero h1{font-size:24px;font-weight:900;margin:0;letter-spacing:-0.3px}
                .csp-hero p{font-size:13px;opacity:0.8;margin:4px 0 0}
                .csp-stats{display:flex;gap:16px;position:relative;z-index:1}
                .csp-stat{text-align:center}
                .csp-stat-num{font-size:22px;font-weight:900}
                .csp-stat-label{font-size:10px;opacity:0.7;font-weight:600}

                .csp-cat{margin-bottom:16px;border-radius:16px;background:#fff;border:1px solid #e2e8f0;overflow:hidden;transition:box-shadow .2s}
                .csp-cat:hover{box-shadow:0 4px 20px rgba(0,0,0,0.04)}
                .csp-cat-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;cursor:pointer;user-select:none}
                .csp-cat-left{display:flex;align-items:center;gap:10px}
                .csp-cat-icon{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0}
                .csp-cat-title{font-size:15px;font-weight:800;color:#0f172a}
                .csp-cat-count{font-size:11px;color:#94a3b8;font-weight:600}
                .csp-cat-arrow{font-size:18px;color:#94a3b8;transition:transform .2s}

                .csp-units{display:flex;flex-direction:column}
                .csp-unit{display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;border-top:1px solid #f1f5f9;transition:background .15s}
                .csp-unit:hover{background:#f8fafc}
                .csp-unit-icon{width:28px;height:28px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;flex-shrink:0}
                .csp-unit-info{flex:1;min-width:0}
                .csp-unit-title{font-size:13px;font-weight:700;color:#1e293b}
                .csp-unit-desc{font-size:11px;color:#94a3b8;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
                .csp-unit-arrow{font-size:16px;color:#cbd5e1;transition:color .15s}
                .csp-unit:hover .csp-unit-arrow{color:#3b82f6}
            `}</style>

            <div className="csp-page">
                <a className="csp-back" onClick={() => router.push("/dashboard/learning/courses/5")}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                    CosPro 선택
                </a>

                {/* 히어로 */}
                <div className="csp-hero" style={{ background: sub.gradient }}>
                    <div className="csp-hero-top">
                        <div className="csp-hero-left">
                            <div className="csp-hero-icon">{sub.icon}</div>
                            <div>
                                <h1>{sub.title}</h1>
                                <p>{sub.description}</p>
                            </div>
                        </div>
                        <div className="csp-stats">
                            <div className="csp-stat">
                                <div className="csp-stat-num">{totalUnits}</div>
                                <div className="csp-stat-label">유닛</div>
                            </div>
                            <div className="csp-stat">
                                <div className="csp-stat-num">{categories.length}</div>
                                <div className="csp-stat-label">카테고리</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 카테고리 목록 */}
                {categories.map(cat => {
                    const open = expandedCat.has(cat.id);
                    return (
                        <div key={cat.id} className="csp-cat">
                            <div className="csp-cat-header" onClick={() => toggleCat(cat.id)}>
                                <div className="csp-cat-left">
                                    <div className="csp-cat-icon" style={{ background: cat.gradient }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{cat.icon}</span>
                                    </div>
                                    <div>
                                        <div className="csp-cat-title">{cat.title}</div>
                                        <div className="csp-cat-count">{cat.units.length}개 유닛</div>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined csp-cat-arrow" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>
                                    expand_more
                                </span>
                            </div>
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="csp-units">
                                            {cat.units.map(unit => (
                                                <div key={unit.id} className="csp-unit" onClick={() => setActiveUnit(unit)}>
                                                    <div className="csp-unit-icon">
                                                        <span className="material-symbols-outlined" style={{ fontSize: 15, color: "#64748b" }}>{unit.icon}</span>
                                                    </div>
                                                    <div className="csp-unit-info">
                                                        <div className="csp-unit-title">{unit.title}</div>
                                                        <div className="csp-unit-desc">{unit.description}</div>
                                                    </div>
                                                    <span className="material-symbols-outlined csp-unit-arrow">chevron_right</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
