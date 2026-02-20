"use client";

import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Data ── */
const SKILLS = [
    { name: "Python Concurrency", icon: "code", progress: 75, color: "blue", total: 20, done: 15, level: "Advanced" },
    { name: "React Patterns", icon: "web", progress: 45, color: "cyan", total: 16, done: 7, level: "Intermediate" },
    { name: "System Design", icon: "architecture", progress: 10, color: "violet", total: 30, done: 3, level: "Beginner" },
    { name: "Database Mastery", icon: "database", progress: 60, color: "emerald", total: 12, done: 7, level: "Intermediate" },
];

const PROJECTS = [
    { name: "Chat App", status: "진행 중", progress: 68, color: "blue", deadline: "D-5" },
    { name: "Portfolio Website", status: "계획", progress: 15, color: "purple", deadline: "D-12" },
    { name: "API Server", status: "완료", progress: 100, color: "green", deadline: "완료" },
];

const colorClasses: Record<string, { bg: string; text: string; ring: string; bar: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600", ring: "stroke-blue-500", bar: "bg-blue-500" },
    cyan: { bg: "bg-cyan-100", text: "text-cyan-600", ring: "stroke-cyan-500", bar: "bg-cyan-500" },
    violet: { bg: "bg-violet-100", text: "text-violet-600", ring: "stroke-violet-500", bar: "bg-violet-500" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600", ring: "stroke-emerald-500", bar: "bg-emerald-500" },
    green: { bg: "bg-green-100", text: "text-green-600", ring: "stroke-green-500", bar: "bg-green-500" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", ring: "stroke-purple-500", bar: "bg-purple-500" },
};

function ProgressRing({ progress, color, size = 80 }: { progress: number; color: string; size?: number }) {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const cc = colorClasses[color] || colorClasses.blue;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="5" fill="none" className="text-gray-200" />
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="5" fill="none"
                    className={cc.ring} strokeLinecap="round"
                    strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                    style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-black ${cc.text}`}>{progress}%</span>
            </div>
        </div>
    );
}

export default function GoalsPage() {
    const { progress } = useUserProgress();

    return (
        <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <span className="material-symbols-outlined text-green-600 text-3xl">flag</span>
                        학습 목표
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">스킬을 마스터하고 프로젝트를 완성하세요</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">add</span>
                    새 목표 추가
                </button>
            </div>

            {/* Stats overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "학습한 시간", value: "126h", icon: "schedule", color: "blue" },
                    { label: "완료한 문제", value: `${progress.totalProblems}`, icon: "check_circle", color: "green" },
                    { label: "현재 스트릭", value: `${progress.streak}일`, icon: "local_fire_department", color: "orange" },
                    { label: "획득 뱃지", value: `${progress.badges.length}`, icon: "military_tech", color: "purple" },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`material-symbols-outlined text-${s.color}-500 text-xl`}>{s.icon}</span>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.label}</span>
                        </div>
                        <div className="text-2xl font-black text-gray-900">{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Skill Mastery */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500 text-xl">school</span>
                    스킬 마스터리
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SKILLS.map((s, i) => {
                        const cc = colorClasses[s.color] || colorClasses.blue;
                        return (
                            <div key={i} className="flex items-center gap-5 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer">
                                <ProgressRing progress={s.progress} color={s.color} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`material-symbols-outlined ${cc.text} text-lg`}>{s.icon}</span>
                                        <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cc.bg} ${cc.text}`}>{s.level}</span>
                                        <span className="text-xs text-gray-500">{s.done}/{s.total} 완료</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div className={`h-full ${cc.bar} rounded-full transition-all duration-1000`} style={{ width: `${s.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-500 text-xl">rocket_launch</span>
                        프로젝트 진행률
                    </h2>
                    <button className="text-xs text-blue-600 font-bold hover:underline">모두 보기</button>
                </div>
                <div className="space-y-4">
                    {PROJECTS.map((p, i) => {
                        const cc = colorClasses[p.color] || colorClasses.blue;
                        return (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all cursor-pointer">
                                <div className={`size-10 rounded-lg ${cc.bg} ${cc.text} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined">folder</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-sm text-gray-900">{p.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cc.bg} ${cc.text}`}>{p.status}</span>
                                            <span className={`text-xs font-bold ${p.progress === 100 ? "text-green-600" : "text-gray-500"}`}>{p.deadline}</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div className={`h-full ${cc.bar} rounded-full transition-all duration-1000`} style={{ width: `${p.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-500 text-xl">emoji_events</span>
                    마일스톤
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { name: "100 문제 해결", icon: "check_circle", done: false, current: progress.totalProblems, target: 100, color: "green" },
                        { name: "30일 스트릭", icon: "local_fire_department", done: false, current: progress.streak, target: 30, color: "orange" },
                        { name: "5개 뱃지 획득", icon: "military_tech", done: progress.badges.length >= 5, current: progress.badges.length, target: 5, color: "purple" },
                    ].map((m, i) => {
                        const pct = Math.min(100, Math.round((m.current / m.target) * 100));
                        return (
                            <div key={i} className={`p-5 rounded-xl border ${m.done ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-100"} text-center`}>
                                <span className={`material-symbols-outlined text-3xl mb-2 block ${m.done ? "text-yellow-500" : `text-${m.color}-500`}`}>{m.icon}</span>
                                <h4 className="font-bold text-sm text-gray-900 mb-2">{m.name}</h4>
                                <div className="text-lg font-black text-gray-900 mb-2">{m.current}/{m.target}</div>
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                    <div className={`h-full bg-${m.color}-500 rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }} />
                                </div>
                                {m.done && <span className="text-xs font-bold text-yellow-600 mt-2 block">🎉 달성 완료!</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
