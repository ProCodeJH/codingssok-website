"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { COURSES } from "@/data/courses";
import { motion } from "framer-motion";
import { FadeIn, StaggerList, StaggerItem, ShimmerLoader, HoverGlow } from "@/components/motion/motion";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
    border: "1px solid rgba(255,255,255,0.5)",
};

interface Material {
    id: string;
    title: string;
    description: string;
    file_url: string;
    file_type: string;
    course_id: string;
    created_at: string;
}

const TYPE_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
    pdf: { icon: "📄", color: "#dc2626", bg: "#fee2e2" },
    image: { icon: "🖼️", color: "#7c3aed", bg: "#ede9fe" },
    video: { icon: "🎬", color: "#2563eb", bg: "#dbeafe" },
    link: { icon: "🔗", color: "#0891b2", bg: "#cffafe" },
};

export default function StudyPage() {
    const { user } = useAuth();
    const supabase = createClient();
    const [materials, setMaterials] = useState<Material[]>([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const loadMaterials = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase
            .from("study_materials")
            .select("*")
            .order("created_at", { ascending: false });
        setMaterials(data || []);
        setLoading(false);
    }, [supabase]);

    useEffect(() => { loadMaterials(); }, [loadMaterials]);

    const filtered = filter === "all" ? materials : materials.filter(m => m.course_id === filter);
    const courseMap = Object.fromEntries(COURSES.map(c => [c.id, c]));

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Link href="/dashboard/learning" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                ← 학습센터로
            </Link>

            {/* 헤더 */}
            <div style={{ ...glassCard, borderRadius: 28, overflow: "hidden" }}>
                <div style={{
                    height: 100, background: "linear-gradient(135deg, #6366f1, #0ea5e9, #10b981)",
                    display: "flex", alignItems: "center", padding: "0 32px", gap: 16,
                }}>
                    <span style={{ fontSize: 40 }}>📚</span>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0, textShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>학습 공간</h1>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>선생님이 올린 수업 자료를 확인하세요</p>
                    </div>
                </div>

                {/* 코스 필터 */}
                <div style={{ padding: "16px 24px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <FilterChip
                        label="전체"
                        active={filter === "all"}
                        onClick={() => setFilter("all")}
                        count={materials.length}
                    />
                    {COURSES.map(c => {
                        const count = materials.filter(m => m.course_id === c.id).length;
                        if (count === 0) return null;
                        return (
                            <FilterChip
                                key={c.id}
                                label={`${c.icon} ${c.title}`}
                                active={filter === c.id}
                                onClick={() => setFilter(c.id)}
                                count={count}
                            />
                        );
                    })}
                </div>
            </div>

            {/* 자료 그리드 */}
            {loading ? (
                <ShimmerLoader lines={6} style={{ padding: 24 }} />
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                    <p style={{ color: "#94a3b8", fontSize: 14 }}>아직 등록된 자료가 없어요</p>
                </div>
            ) : (
                <StaggerList style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 16,
                }}>
                    {filtered.map(m => {
                        const typeInfo = TYPE_ICONS[m.file_type] || TYPE_ICONS.link;
                        const course = courseMap[m.course_id];
                        return (
                            <StaggerItem key={m.id}>
                                <HoverGlow glowColor={`${typeInfo.color}22`}>
                                    <a
                                        key={m.id}
                                        href={m.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            ...glassCard, borderRadius: 20, padding: 0, textDecoration: "none",
                                            overflow: "hidden", cursor: "pointer",
                                            display: "flex", flexDirection: "column",
                                        }}
                                    >
                                        {/* 타입 배너 */}
                                        <div style={{
                                            padding: "20px 20px 16px",
                                            background: typeInfo.bg,
                                            display: "flex", alignItems: "center", gap: 12,
                                        }}>
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 12,
                                                background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                            }}>
                                                {typeInfo.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{m.title}</div>
                                                {course && (
                                                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                                                        {course.icon} {course.title}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 설명 + 메타 */}
                                        <div style={{ padding: "14px 20px 16px", flex: 1 }}>
                                            {m.description && (
                                                <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 10px", lineHeight: 1.5 }}>
                                                    {m.description}
                                                </p>
                                            )}
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{
                                                    padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                                                    background: typeInfo.bg, color: typeInfo.color, textTransform: "uppercase",
                                                }}>
                                                    {m.file_type}
                                                </span>
                                                <span style={{ fontSize: 10, color: "#cbd5e1" }}>
                                                    {new Date(m.created_at).toLocaleDateString("ko-KR")}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </HoverGlow>
                            </StaggerItem>
                        );
                    })}
                </StaggerList>
            )}
        </div>
    );
}

function FilterChip({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count: number }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
                padding: "6px 14px", borderRadius: 20, border: "none",
                background: active ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "#f1f5f9",
                color: active ? "#fff" : "#64748b",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4,
            }}
        >
            {label}
            <span style={{
                padding: "1px 6px", borderRadius: 10, fontSize: 10,
                background: active ? "rgba(255,255,255,0.25)" : "#e2e8f0",
                color: active ? "#fff" : "#94a3b8",
            }}>
                {count}
            </span>
        </motion.button>
    );
}
