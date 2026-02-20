"use client";

import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";

const TOP_3 = [
    { rank: 1, name: "Alex Kim", xp: 9850, level: 67, streak: 45 },
    { rank: 2, name: "Sarah Lee", xp: 8720, level: 61, streak: 38 },
    { rank: 3, name: "Mike Park", xp: 7680, level: 55, streak: 32 },
];

const RANKINGS = [
    { rank: 4, name: "Emily Chen", xp: 6500, level: 48, streak: 28, badge: "Gold" },
    { rank: 5, name: "David Choi", xp: 5890, level: 44, streak: 24, badge: "Gold" },
    { rank: 6, name: "Lisa Wang", xp: 5200, level: 40, streak: 20, badge: "Silver" },
    { rank: 7, name: "Tom Brown", xp: 4800, level: 37, streak: 18, badge: "Silver" },
    { rank: 8, name: "You", xp: 3200, level: 25, streak: 12, badge: "Bronze", isMe: true },
    { rank: 9, name: "Jane Kim", xp: 2900, level: 22, streak: 10, badge: "Bronze" },
    { rank: 10, name: "Chris Oh", xp: 2400, level: 19, streak: 8, badge: "Bronze" },
];

const TC: Record<string, { bg: string; text: string; border: string }> = {
    Gold: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" },
    Silver: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
    Bronze: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
};

export default function LeaderboardPage() {
    const { progress } = useUserProgress();
    const [period, setPeriod] = useState("weekly");

    const po = [TOP_3[1], TOP_3[0], TOP_3[2]];
    const ph = ["h-28", "h-36", "h-24"];
    const pc = ["from-gray-300 to-gray-400", "from-yellow-400 to-amber-500", "from-amber-600 to-orange-700"];
    const mi = ["🥈", "🥇", "🥉"];

    return (
        <div className="p-6 lg:p-10 max-w-[1200px] mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <span className="material-symbols-outlined text-yellow-500 text-3xl">leaderboard</span>
                        Leaderboard
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">See where you stand among the community</p>
                </div>
                <div className="flex gap-2 bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm">
                    {["weekly", "monthly", "alltime"].map((p) => (
                        <button key={p} onClick={() => setPeriod(p)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${period === p ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:bg-gray-50"}`}>
                            {p === "alltime" ? "All Time" : p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="size-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black backdrop-blur-sm border border-white/20">#8</div>
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold">Your Current Ranking</h3>
                        <p className="text-blue-200 text-sm">500 XP more to reach Rank #7</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {[{ v: progress.xp, l: "Total XP" }, { v: progress.streak, l: "Streak" }, { v: 120, l: "Solved" }].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl font-black">{s.v}</div>
                                <div className="text-[10px] text-blue-200 uppercase tracking-wider font-bold">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-center font-bold text-gray-900 mb-8">
                    <span className="material-symbols-outlined text-yellow-500 text-2xl align-middle mr-2">emoji_events</span>
                    Top 3 Champions
                </h2>
                <div className="flex justify-center items-end gap-4 md:gap-8 max-w-lg mx-auto">
                    {po.map((u, i) => (
                        <div key={u.rank} className={`flex flex-col items-center ${i === 1 ? "order-2" : i === 0 ? "order-1" : "order-3"}`}>
                            <div className="relative mb-3">
                                <div className={`size-16 md:size-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-black text-gray-600 ${i === 1 ? "ring-4 ring-yellow-400 shadow-lg shadow-yellow-500/20" : ""}`}>
                                    {u.name.charAt(0)}
                                </div>
                                <div className="absolute -top-2 -right-2 text-2xl">{mi[i]}</div>
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 mb-1">{u.name}</h4>
                            <span className="text-xs font-bold text-[#13daec] mb-3">{u.xp.toLocaleString()} XP</span>
                            <div className={`w-20 md:w-24 ${ph[i]} bg-gradient-to-t ${pc[i]} rounded-t-xl flex items-center justify-center shadow-inner`}>
                                <span className="text-3xl font-black text-white/80">#{u.rank}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#13daec]">format_list_numbered</span>
                        Full Rankings
                    </h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {RANKINGS.map((u) => {
                        const t = TC[u.badge] || TC.Bronze;
                        return (
                            <div key={u.rank} className={`flex items-center gap-4 px-6 py-4 transition-colors ${u.isMe ? "bg-blue-50/60 border-l-4 border-l-blue-500" : "hover:bg-gray-50"}`}>
                                <span className={`text-sm font-black w-8 ${u.rank <= 3 ? "text-yellow-500" : "text-gray-400"}`}>#{u.rank}</span>
                                <div className={`size-10 rounded-full flex items-center justify-center text-sm font-bold ${u.isMe ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}>{u.name.charAt(0)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className={`font-bold text-sm ${u.isMe ? "text-blue-600" : "text-gray-900"}`}>
                                        {u.name} {u.isMe && <span className="text-[10px] font-bold text-blue-400 bg-blue-100 px-2 py-0.5 rounded-full ml-2">You</span>}
                                    </div>
                                    <div className="text-xs text-gray-400">Level {u.level}</div>
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${t.bg} ${t.text} ${t.border}`}>{u.badge}</span>
                                <div className="flex items-center gap-1 text-xs text-gray-400 w-16 justify-end">
                                    <span className="material-symbols-outlined text-orange-400 text-sm">local_fire_department</span>
                                    <span className="font-bold">{u.streak}d</span>
                                </div>
                                <div className="text-right w-24">
                                    <span className="font-bold text-sm text-gray-900">{u.xp.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400 ml-1">XP</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
