"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

const BADGES = [
    { name: "Gold Contributor", icon: "emoji_events", color: "yellow" },
    { name: "Python Expert", icon: "code", color: "blue" },
    { name: "7-Day Streak", icon: "local_fire_department", color: "orange" },
    { name: "Bug Hunter", icon: "bug_report", color: "red" },
    { name: "Team Player", icon: "group", color: "purple" },
    { name: "Fast Solver", icon: "bolt", color: "teal" },
];

const ACTIVITY = [
    { action: "Array Rotation 풀이 완료", xp: 150, time: "2시간 전", icon: "check_circle", color: "green" },
    { action: "Python Masterclass 3장 완료", xp: 200, time: "어제", icon: "school", color: "blue" },
    { action: "'Bug Hunter' 뱃지 획득", xp: 100, time: "2일 전", icon: "military_tech", color: "yellow" },
    { action: "Daily Challenge 7일 연속 클리어", xp: 500, time: "3일 전", icon: "local_fire_department", color: "orange" },
    { action: "Coding Foundations 코스 완료", xp: 300, time: "1주 전", icon: "flag", color: "purple" },
];

const STATS = [
    { label: "Problems Solved", value: "120", icon: "check_circle", color: "green" },
    { label: "Accuracy", value: "94%", icon: "verified", color: "blue" },
    { label: "Avg. Time", value: "12m", icon: "timer", color: "purple" },
    { label: "Best Streak", value: "14d", icon: "local_fire_department", color: "orange" },
];

export default function ProfilePage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();

    const xpForNext = (progress.level + 1) * 500;
    const xpPercent = Math.min((progress.xp / xpForNext) * 100, 100);

    return (
        <div className="p-6 lg:p-10 max-w-[1200px] mx-auto space-y-8">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 lg:p-10 shadow-xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#13daec]/20 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px]" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    {/* Avatar + XP Ring */}
                    <div className="relative">
                        <svg className="size-32 -rotate-90" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                            <circle cx="60" cy="60" r="54" fill="none" stroke="#13daec" strokeWidth="8"
                                strokeDasharray={`${xpPercent * 3.39}, 339.3`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl font-black border-2 border-white/20">
                                {(user?.email?.charAt(0) || "U").toUpperCase()}
                            </div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#13daec] text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-slate-900">
                            Lv.{progress.level}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-black tracking-tight mb-1">{user?.email?.split("@")[0] || "Student"}</h1>
                        <p className="text-white/50 text-sm mb-4">{user?.email || "student@elite.academy"}</p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {[
                                { icon: "stars", label: "XP", value: progress.xp },
                                { icon: "local_fire_department", label: "Streak", value: `${progress.streak}d` },
                                { icon: "leaderboard", label: "Rank", value: "#8" },
                                { icon: "school", label: "Course", value: "Python" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[#13daec] text-[14px]">{s.icon}</span> {s.label}
                                    </div>
                                    <div className="text-lg font-black">{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">edit</span> Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-[#13daec]">analytics</span>
                            Statistics
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {STATS.map((s, i) => (
                                <div key={i} className={`p-4 bg-${s.color}-50 rounded-xl border border-${s.color}-100 text-center`}>
                                    <span className={`material-symbols-outlined text-${s.color}-500 text-2xl mb-2 block`}>{s.icon}</span>
                                    <div className="text-2xl font-black text-gray-900">{s.value}</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-[#13daec]">history</span>
                            Recent Activity
                        </h2>
                        <div className="space-y-4 relative">
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100" />
                            {ACTIVITY.map((a, i) => (
                                <div key={i} className="flex gap-4 relative z-10">
                                    <div className={`size-10 rounded-full bg-${a.color}-100 text-${a.color}-600 flex items-center justify-center shrink-0 ring-4 ring-white`}>
                                        <span className="material-symbols-outlined text-lg">{a.icon}</span>
                                    </div>
                                    <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-bold text-gray-900">{a.action}</p>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">+{a.xp} XP</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* XP Progress */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-purple-500">upgrade</span>
                            Level Progress
                        </h3>
                        <div className="text-center mb-4">
                            <div className="text-4xl font-black text-gray-900">{progress.level}</div>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Current Level</div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                            <div className="bg-gradient-to-r from-[#13daec] to-blue-500 h-3 rounded-full transition-all" style={{ width: `${xpPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>{progress.xp} XP</span>
                            <span>{xpForNext} XP</span>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-yellow-500">military_tech</span>
                            Badges ({BADGES.length})
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {BADGES.map((b, i) => (
                                <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                                    <div className={`size-12 rounded-xl bg-${b.color}-50 text-${b.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform border border-${b.color}-100`}>
                                        <span className="material-symbols-outlined text-xl">{b.icon}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 mt-1.5 leading-tight">{b.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tier Card */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="absolute -right-6 -bottom-6 text-8xl opacity-20">🥉</div>
                        <div className="relative z-10">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-100 mb-2">Current Tier</div>
                            <h4 className="font-black text-2xl mb-1">Bronze</h4>
                            <p className="text-sm text-orange-100 mb-4">1,800 XP to Silver tier</p>
                            <div className="w-full bg-white/20 rounded-full h-2">
                                <div className="bg-white rounded-full h-2" style={{ width: "64%" }} />
                            </div>
                            <p className="text-[10px] text-orange-200 mt-1.5 text-right">3,200 / 5,000 XP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
