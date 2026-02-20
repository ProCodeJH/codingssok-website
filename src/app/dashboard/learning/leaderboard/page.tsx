"use client";

import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Data ── */
const USERS = [
    { rank: 1, name: "Alex Kim", xp: 9850, level: 67, streak: 45, tier: "Diamond", avatar: "A", color: "blue" },
    { rank: 2, name: "Mia Wang", xp: 9200, level: 64, streak: 32, tier: "Diamond", avatar: "M", color: "purple" },
    { rank: 3, name: "Chris Park", xp: 8700, level: 61, streak: 28, tier: "Platinum", avatar: "C", color: "teal" },
    { rank: 4, name: "Sarah Lee", xp: 7900, level: 58, streak: 21, tier: "Platinum", avatar: "S", color: "pink" },
    { rank: 5, name: "David Oh", xp: 7200, level: 55, streak: 18, tier: "Gold", avatar: "D", color: "orange" },
    { rank: 6, name: "Eric Han", xp: 6800, level: 52, streak: 15, tier: "Gold", avatar: "E", color: "green" },
    { rank: 7, name: "Grace Yoo", xp: 6100, level: 49, streak: 12, tier: "Gold", avatar: "G", color: "indigo" },
    { rank: 8, name: "Tom Jung", xp: 5500, level: 46, streak: 10, tier: "Silver", avatar: "T", color: "slate" },
    { rank: 9, name: "Lisa Cho", xp: 4900, level: 43, streak: 8, tier: "Silver", avatar: "L", color: "cyan" },
    { rank: 10, name: "Jake Lim", xp: 4200, level: 40, streak: 5, tier: "Bronze", avatar: "J", color: "amber" },
];

const TIERS: Record<string, { color: string; icon: string }> = {
    Diamond: { color: "text-blue-500 bg-blue-100", icon: "diamond" },
    Platinum: { color: "text-purple-500 bg-purple-100", icon: "workspace_premium" },
    Gold: { color: "text-yellow-600 bg-yellow-100", icon: "emoji_events" },
    Silver: { color: "text-gray-500 bg-gray-200", icon: "shield" },
    Bronze: { color: "text-orange-600 bg-orange-100", icon: "verified" },
};

type Tab = "weekly" | "monthly" | "all";

export default function LeaderboardPage() {
    const { progress } = useUserProgress();
    const [tab, setTab] = useState<Tab>("weekly");

    const podium = USERS.slice(0, 3);
    const rest = USERS.slice(3);

    return (
        <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <span className="material-symbols-outlined text-yellow-500 text-3xl">emoji_events</span>
                        리더보드
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">최고의 실력자들과 경쟁하세요!</p>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {(["weekly", "monthly", "all"] as const).map((t) => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            {t === "weekly" ? "이번 주" : t === "monthly" ? "이번 달" : "전체"}
                        </button>
                    ))}
                </div>
            </div>

            {/* My Rank Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-black backdrop-blur-sm">
                            #{progress.rank}
                        </div>
                        <div>
                            <p className="text-lg font-bold">나의 순위</p>
                            <p className="text-sm text-blue-200">현재 {progress.tier} 티어</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black">{progress.xp} XP</p>
                        <p className="text-xs text-blue-200">Lv. {progress.level}</p>
                    </div>
                </div>
            </div>

            {/* Podium */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-end justify-center gap-4 max-w-lg mx-auto mb-6">
                    {/* 2nd place */}
                    <div className="flex flex-col items-center">
                        <div className="size-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-black text-xl mb-2 ring-4 ring-purple-200">
                            {podium[1].avatar}
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">{podium[1].name}</p>
                        <p className="text-xs font-bold text-gray-500">{podium[1].xp} XP</p>
                        <div className="w-24 bg-gradient-to-t from-purple-200 to-purple-100 rounded-t-xl mt-3 flex items-end justify-center pb-2" style={{ height: 90 }}>
                            <span className="text-3xl">🥈</span>
                        </div>
                    </div>
                    {/* 1st place */}
                    <div className="flex flex-col items-center -mb-2">
                        <div className="relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-bounce">
                                <span className="material-symbols-outlined text-yellow-400 text-2xl">auto_awesome</span>
                            </div>
                            <div className="size-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-2xl mb-2 ring-4 ring-yellow-300 shadow-lg">
                                {podium[0].avatar}
                            </div>
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">{podium[0].name}</p>
                        <p className="text-xs font-bold text-gray-500">{podium[0].xp} XP</p>
                        <div className="w-28 bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-t-xl mt-3 flex items-end justify-center pb-2" style={{ height: 120 }}>
                            <span className="text-4xl">🥇</span>
                        </div>
                    </div>
                    {/* 3rd place */}
                    <div className="flex flex-col items-center">
                        <div className="size-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-black text-xl mb-2 ring-4 ring-teal-200">
                            {podium[2].avatar}
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">{podium[2].name}</p>
                        <p className="text-xs font-bold text-gray-500">{podium[2].xp} XP</p>
                        <div className="w-24 bg-gradient-to-t from-teal-200 to-teal-100 rounded-t-xl mt-3 flex items-end justify-center pb-2" style={{ height: 70 }}>
                            <span className="text-3xl">🥉</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rankings Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">순위</th>
                                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">사용자</th>
                                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">티어</th>
                                <th className="text-right px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">레벨</th>
                                <th className="text-right px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">스트릭</th>
                                <th className="text-right px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">XP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rest.map((u) => {
                                const tier = TIERS[u.tier] || TIERS.Bronze;
                                return (
                                    <tr key={u.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-400">#{u.rank}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-8 rounded-full bg-${u.color}-100 text-${u.color}-600 flex items-center justify-center font-bold text-xs`}>
                                                    {u.avatar}
                                                </div>
                                                <span className="font-bold text-sm text-gray-900">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${tier.color}`}>
                                                <span className="material-symbols-outlined text-sm">{tier.icon}</span>
                                                {u.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-bold text-gray-700">Lv.{u.level}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm text-gray-600 flex items-center justify-end gap-1">
                                                <span className="material-symbols-outlined text-orange-400 text-sm">local_fire_department</span>
                                                {u.streak}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-black text-gray-900">{u.xp.toLocaleString()}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 border-t border-gray-200">
                    {[1, 2, 3].map((p) => (
                        <button key={p} className={`size-8 rounded-lg text-xs font-bold transition-colors ${p === 1 ? "bg-blue-600 text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
