"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Data ── */
const BADGES = [
    { name: "Gold Contributor", icon: "emoji_events", color: "yellow" },
    { name: "Bug Hunter", icon: "pest_control", color: "red" },
    { name: "Trend Setter", icon: "trending_up", color: "blue" },
    { name: "Early Bird", icon: "wb_twilight", color: "orange" },
    { name: "Team Player", icon: "group", color: "green" },
    { name: "Night Owl", icon: "dark_mode", color: "indigo" },
];

const ACTIVITY = [
    { action: "Python Concurrency 챕터 3 완료", time: "2시간 전", icon: "check_circle", color: "green" },
    { action: "데일리 챌린지 '문자열 뒤집기' 해결", time: "5시간 전", icon: "code", color: "blue" },
    { action: "'Bug Hunter' 뱃지 획득", time: "어제", icon: "military_tech", color: "yellow" },
    { action: "React Patterns 코스 시작", time: "2일 전", icon: "school", color: "purple" },
    { action: "7일 연속 스트릭 달성!", time: "3일 전", icon: "local_fire_department", color: "orange" },
];

const STATS = [
    { label: "문제 해결", value: "89", icon: "check_circle", color: "green" },
    { label: "학습 시간", value: "126h", icon: "schedule", color: "blue" },
    { label: "코드 라인", value: "4.2K", icon: "code", color: "purple" },
    { label: "코스 완료", value: "2", icon: "school", color: "teal" },
];

function ProgressRing({ progress, size = 140 }: { progress: number; size?: number }) {
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200" />
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="url(#xpGradient)" strokeWidth="8" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                    style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                />
                <defs>
                    <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900">{progress}%</span>
                <span className="text-xs text-gray-500 font-medium">다음 레벨</span>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();

    const xpForLevel = progress.xp % 100;

    return (
        <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
            {/* Profile Hero */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
                <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                    {/* Avatar + XP Ring */}
                    <div className="relative">
                        <ProgressRing progress={xpForLevel} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="size-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-black border-4 border-white/30">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                        </div>
                        {/* Level Badge */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-black shadow-lg">
                            Lv. {progress.level}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="text-center sm:text-left flex-1">
                        <h1 className="text-3xl font-black mb-1">{user?.name || "사용자"}</h1>
                        <p className="text-blue-200 text-sm mb-4">{user?.email || ""}</p>
                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                                <div className="text-xs text-blue-200 font-medium">경험치</div>
                                <div className="text-lg font-black">{progress.xp.toLocaleString()} XP</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                                <div className="text-xs text-blue-200 font-medium">스트릭</div>
                                <div className="text-lg font-black flex items-center gap-1">
                                    {progress.streak}일
                                    <span className="material-symbols-outlined text-orange-300 text-sm">local_fire_department</span>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                                <div className="text-xs text-blue-200 font-medium">순위</div>
                                <div className="text-lg font-black">#{progress.rank}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                                <div className="text-xs text-blue-200 font-medium">티어</div>
                                <div className="text-lg font-black flex items-center gap-1">
                                    <span className="material-symbols-outlined text-yellow-300 text-sm">diamond</span>
                                    {progress.tier}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {STATS.map((s, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                                <span className={`material-symbols-outlined text-${s.color}-500 text-2xl mb-2 block`}>{s.icon}</span>
                                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                                <div className="text-xs text-gray-500 font-medium mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Activity Timeline */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-500 text-xl">history</span>
                            최근 활동
                        </h2>
                        <div className="space-y-1">
                            {ACTIVITY.map((a, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group relative">
                                    {/* Timeline line */}
                                    {i < ACTIVITY.length - 1 && (
                                        <div className="absolute left-[27px] top-12 bottom-0 w-[2px] bg-gray-100" />
                                    )}
                                    <div className={`size-9 rounded-lg bg-${a.color}-100 text-${a.color}-600 flex items-center justify-center flex-shrink-0 relative z-10`}>
                                        <span className="material-symbols-outlined text-lg">{a.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{a.action}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Badges */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-500 text-xl">military_tech</span>
                            획득 뱃지
                            <span className="text-xs text-gray-500 font-normal ml-auto">{BADGES.length}개</span>
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {BADGES.map((b, i) => (
                                <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group border border-gray-100 hover:border-gray-200">
                                    <div className={`size-10 rounded-lg bg-${b.color}-100 text-${b.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-xl">{b.icon}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{b.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tier Progress */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-purple-500 text-xl">shield</span>
                            티어 진행률
                        </h2>
                        <div className="space-y-3">
                            {[
                                { tier: "Diamond", min: 8000, color: "blue" },
                                { tier: "Platinum", min: 5000, color: "purple" },
                                { tier: "Gold", min: 3000, color: "yellow", current: true },
                                { tier: "Silver", min: 1000, color: "gray" },
                                { tier: "Bronze", min: 0, color: "orange" },
                            ].map((t, i) => {
                                const reached = progress.xp >= t.min;
                                return (
                                    <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${t.current ? "bg-yellow-50 ring-1 ring-yellow-200" : reached ? "bg-gray-50" : "opacity-50"}`}>
                                        <span className={`material-symbols-outlined text-lg ${reached ? `text-${t.color}-500` : "text-gray-300"}`}>
                                            {reached ? "check_circle" : "lock"}
                                        </span>
                                        <span className={`text-sm font-bold ${reached ? "text-gray-900" : "text-gray-400"}`}>{t.tier}</span>
                                        <span className="text-xs text-gray-400 ml-auto">{t.min.toLocaleString()} XP</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Settings shortcut */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-500 text-xl">settings</span>
                            프로필 설정
                        </h2>
                        <div className="space-y-2">
                            {[
                                { label: "프로필 수정", icon: "edit" },
                                { label: "비밀번호 변경", icon: "lock" },
                                { label: "알림 설정", icon: "notifications" },
                                { label: "데이터 내보내기", icon: "download" },
                            ].map((s, i) => (
                                <button key={i} className="w-full flex items-center gap-3 p-3 text-left rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium group">
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-blue-500 text-lg">{s.icon}</span>
                                    {s.label}
                                    <span className="material-symbols-outlined text-gray-300 text-sm ml-auto">chevron_right</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
