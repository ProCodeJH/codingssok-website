"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useBadges, BADGE_CATALOG, RARITY_COLORS } from "@/hooks/useBadges";
import Link from "next/link";

/* ═══════════════════════════════════════
   배지 진열장 — 업적 & 배지 컬렉션
   /dashboard/learning/badges
   ═══════════════════════════════════════ */

const rarityLabels: Record<string, string> = {
    common: "일반",
    rare: "희귀",
    epic: "영웅",
    legendary: "전설",
};

export default function BadgesPage() {
    const { allBadges, unlockedIds, unlockedCount, totalCount } = useBadges();

    const learningBadges = allBadges.filter(b => b.category === "learning");
    const specialBadges = allBadges.filter(b => b.category === "special");

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <Link href="/dashboard/learning" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>← 대시보드</Link>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1e1b4b", marginTop: 8, letterSpacing: "-0.03em" }}>
                    ★ 배지 진열장
                </h1>
                <p style={{ fontSize: 14, color: "#64748b" }}>
                    {unlockedCount}개 획득 / 총 {totalCount}개
                </p>
                {/* Progress bar */}
                <div style={{ height: 8, borderRadius: 4, background: "#f1f5f9", marginTop: 12, overflow: "hidden" }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ height: "100%", borderRadius: 4, background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}
                    />
                </div>
            </div>

            {/* Learning Badges */}
            <section style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e1b4b", marginBottom: 16 }}> 학습 배지</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                    {learningBadges.map((b, i) => {
                        const unlocked = unlockedIds.includes(b.id);
                        return (
                            <motion.div
                                key={b.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    background: unlocked ? "#fff" : "#f8fafc",
                                    borderRadius: 16, padding: "20px 16px", textAlign: "center",
                                    border: `1px solid ${unlocked ? RARITY_COLORS[b.rarity] + '33' : '#e2e8f0'}`,
                                    opacity: unlocked ? 1 : 0.5,
                                    position: "relative", overflow: "hidden",
                                }}
                            >
                                {unlocked && (
                                    <div style={{
                                        position: "absolute", top: 8, right: 8,
                                        padding: "2px 6px", borderRadius: 6,
                                        background: RARITY_COLORS[b.rarity] + '20',
                                        fontSize: 9, fontWeight: 700, color: RARITY_COLORS[b.rarity],
                                    }}>
                                        {rarityLabels[b.rarity]}
                                    </div>
                                )}
                                <div style={{ fontSize: 36, marginBottom: 8, filter: unlocked ? "none" : "grayscale(1)" }}>
                                    {b.emoji}
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1b4b", marginBottom: 4 }}>
                                    {b.name}
                                </div>
                                <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.4 }}>
                                    {unlocked ? b.description : b.condition}
                                </div>
                                {!unlocked && (
                                    <div style={{ fontSize: 10, color: "#cbd5e1", marginTop: 8 }}> 미획득</div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Special Badges */}
            <section>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e1b4b", marginBottom: 16 }}> 특별 배지</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                    {specialBadges.map((b, i) => {
                        const unlocked = unlockedIds.includes(b.id);
                        return (
                            <motion.div
                                key={b.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 + 0.3 }}
                                style={{
                                    background: unlocked ? "linear-gradient(135deg, #FFFBEB, #FEF3C7)" : "#f8fafc",
                                    borderRadius: 16, padding: "20px 16px", textAlign: "center",
                                    border: `1px solid ${unlocked ? '#FDE68A' : '#e2e8f0'}`,
                                    opacity: unlocked ? 1 : 0.5,
                                    position: "relative",
                                }}
                            >
                                {unlocked && (
                                    <div style={{
                                        position: "absolute", top: 8, right: 8,
                                        padding: "2px 6px", borderRadius: 6,
                                        background: RARITY_COLORS[b.rarity] + '20',
                                        fontSize: 9, fontWeight: 700, color: RARITY_COLORS[b.rarity],
                                    }}>
                                        {rarityLabels[b.rarity]}
                                    </div>
                                )}
                                <div style={{ fontSize: 36, marginBottom: 8, filter: unlocked ? "none" : "grayscale(1)" }}>
                                    {b.emoji}
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1b4b", marginBottom: 4 }}>
                                    {b.name}
                                </div>
                                <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.4 }}>
                                    {unlocked ? b.description : b.condition}
                                </div>
                                {!unlocked && (
                                    <div style={{ fontSize: 10, color: "#cbd5e1", marginTop: 8 }}> 미획득</div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
