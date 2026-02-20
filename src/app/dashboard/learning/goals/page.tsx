"use client";

import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Goals Data with static Tailwind classes ── */
const ACTIVE_GOALS = [
    {
        id: 1, title: "Python Mastery", desc: "Complete all Python modules and reach expert level",
        icon: "code", target: 150, current: 87, unit: "problems", deadline: "Mar 15",
        iconCls: "bg-blue-50 text-blue-600", barCls: "bg-blue-500", btnCls: "bg-blue-500 hover:bg-blue-600",
        milestoneDone: "bg-blue-50 text-blue-600 border-blue-200", milestoneUndone: "bg-gray-50 text-gray-400 border-gray-200",
        milestones: [
            { name: "Basics", done: true }, { name: "Data Structures", done: true },
            { name: "Algorithms", done: false }, { name: "Advanced", done: false },
        ]
    },
    {
        id: 2, title: "30-Day Streak", desc: "Maintain your daily challenge streak for 30 consecutive days",
        icon: "local_fire_department", target: 30, current: 12, unit: "days", deadline: "Mar 20",
        iconCls: "bg-orange-50 text-orange-600", barCls: "bg-orange-500", btnCls: "bg-orange-500 hover:bg-orange-600",
        milestoneDone: "bg-orange-50 text-orange-600 border-orange-200", milestoneUndone: "bg-gray-50 text-gray-400 border-gray-200",
        milestones: [
            { name: "Week 1", done: true }, { name: "Week 2", done: false },
            { name: "Week 3", done: false }, { name: "Week 4", done: false },
        ]
    },
    {
        id: 3, title: "Level 10 Scholar", desc: "Reach Level 10 by earning enough XP across all modules",
        icon: "school", target: 5000, current: 3200, unit: "XP", deadline: "Apr 1",
        iconCls: "bg-purple-50 text-purple-600", barCls: "bg-purple-500", btnCls: "bg-purple-500 hover:bg-purple-600",
        milestoneDone: "bg-purple-50 text-purple-600 border-purple-200", milestoneUndone: "bg-gray-50 text-gray-400 border-gray-200",
        milestones: [
            { name: "Level 5", done: true }, { name: "Level 7", done: true },
            { name: "Level 9", done: false }, { name: "Level 10", done: false },
        ]
    },
];

const COMPLETED_GOALS = [
    { title: "First Login", icon: "login", xp: 50, date: "Jan 5" },
    { title: "5 Problems Solved", icon: "check_circle", xp: 100, date: "Jan 12" },
    { title: "Join a Module", icon: "bookmark_added", xp: 75, date: "Jan 14" },
    { title: "First Perfect Score", icon: "grade", xp: 200, date: "Jan 20" },
];

const SUGGESTED_GOALS = [
    { title: "Speed Demon", desc: "Solve 10 problems under 5 minutes each", icon: "bolt", iconCls: "bg-teal-50 text-teal-600", xp: 500 },
    { title: "Bug Hunter", desc: "Find and fix 20 code bugs in debug challenges", icon: "bug_report", iconCls: "bg-red-50 text-red-600", xp: 750 },
    { title: "Community Hero", desc: "Help 15 classmates solve their problems", icon: "volunteer_activism", iconCls: "bg-pink-50 text-pink-600", xp: 600 },
];

const STAT_CLS = [
    { label: "Active Goals", value: "3", icon: "flag", cls: "bg-blue-50 border-blue-100", iconCls: "text-blue-500" },
    { label: "Completed", value: "4", icon: "check_circle", cls: "bg-green-50 border-green-100", iconCls: "text-green-500" },
    { label: "XP Earned", value: "0", icon: "stars", cls: "bg-purple-50 border-purple-100", iconCls: "text-purple-500", dynamic: true },
    { label: "Completion Rate", value: "80%", icon: "trending_up", cls: "bg-orange-50 border-orange-100", iconCls: "text-orange-500" },
];

export default function GoalsPage() {
    const { progress } = useUserProgress();
    const [tab, setTab] = useState<"active" | "completed" | "discover">("active");

    return (
        <div className="p-6 lg:p-10 max-w-[1200px] mx-auto flex flex-col gap-8">
            {/* Header Stats */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#13daec] text-3xl">flag</span>
                            My Goals
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">Track your progress and set new targets</p>
                    </div>
                    <button className="flex items-center gap-2 bg-[#13daec] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#0fbccb] transition-colors shadow-lg shadow-[#13daec]/20">
                        <span className="material-symbols-outlined text-lg">add</span> New Goal
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STAT_CLS.map((stat, i) => (
                        <div key={i} className={`p-4 rounded-xl border text-center ${stat.cls}`}>
                            <span className={`material-symbols-outlined text-2xl mb-2 block ${stat.iconCls}`}>{stat.icon}</span>
                            <div className="text-2xl font-black text-gray-900">{stat.dynamic ? progress.xp.toLocaleString() : stat.value}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm w-fit">
                {(["active", "completed", "discover"] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors capitalize ${tab === t ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}>
                        {t === "active" ? "Active" : t === "completed" ? "Completed" : "Discover"}
                    </button>
                ))}
            </div>

            {/* Active Goals */}
            {tab === "active" && (
                <div className="flex flex-col gap-6">
                    {ACTIVE_GOALS.map((goal) => (
                        <div key={goal.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl ${goal.iconCls} flex items-center justify-center`}>
                                            <span className="material-symbols-outlined text-2xl">{goal.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
                                            <p className="text-sm text-gray-400">{goal.desc}</p>
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="font-bold text-gray-600">{goal.current} / {goal.target} {goal.unit}</span>
                                            <span className="font-bold text-gray-400">{Math.round((goal.current / goal.target) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3">
                                            <div className={`${goal.barCls} h-3 rounded-full transition-all relative`} style={{ width: `${(goal.current / goal.target) * 100}%` }}>
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-current rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Milestones */}
                                    <div className="flex gap-2 flex-wrap">
                                        {goal.milestones.map((m, i) => (
                                            <span key={i} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1
                                                ${m.done ? goal.milestoneDone : goal.milestoneUndone}`}>
                                                <span className="material-symbols-outlined text-[12px]">{m.done ? "check_circle" : "radio_button_unchecked"}</span>
                                                {m.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 md:min-w-[120px]">
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deadline</div>
                                        <div className="text-sm font-bold text-gray-700">{goal.deadline}</div>
                                    </div>
                                    <button className={`text-xs font-bold text-white ${goal.btnCls} px-4 py-2 rounded-lg transition-colors shadow-md`}>
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Completed Goals */}
            {tab === "completed" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {COMPLETED_GOALS.map((goal, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 group hover:border-green-200 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">{goal.icon}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900">{goal.title}</h4>
                                <p className="text-xs text-gray-400">Completed on {goal.date}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">+{goal.xp} XP</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Discover Goals */}
            {tab === "discover" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SUGGESTED_GOALS.map((goal, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all group">
                            <div className={`w-14 h-14 rounded-2xl ${goal.iconCls} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <span className="material-symbols-outlined text-3xl">{goal.icon}</span>
                            </div>
                            <h3 className="text-center font-bold text-gray-900 mb-2">{goal.title}</h3>
                            <p className="text-center text-sm text-gray-400 mb-4">{goal.desc}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">{goal.xp} XP</span>
                                <button className="text-xs font-bold text-[#13daec] hover:text-[#0fbccb] flex items-center gap-1 transition-colors">
                                    Start Goal <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
