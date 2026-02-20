"use client";

import { useUserProgress } from "@/hooks/useUserProgress";
import { useState } from "react";

/* ── Course Data ── */
const COURSES = [
    {
        id: "foundations", title: "Coding Foundations",
        desc: "First steps into programming. Master variables, loops, and basic logic structures with interactive puzzles.",
        icon: "extension", problems: 80, tag: "Beginner", status: "completed" as const,
        gradient: "from-emerald-400 to-teal-500",
        iconBg: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100",
        iconColor: "text-emerald-600",
        statusColor: "text-emerald-700 bg-emerald-100 border-emerald-200/50",
        btnClass: "bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50",
        hoverTitle: "group-hover:text-emerald-700",
    },
    {
        id: "thinking", title: "Computational Thinking",
        desc: "Enhance logical problem solving skills and sophisticated algorithmic approaches for complex systems.",
        icon: "psychology", problems: 120, tag: "Logic", status: "completed" as const,
        gradient: "from-purple-400 to-fuchsia-500",
        iconBg: "bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-100",
        iconColor: "text-purple-600",
        statusColor: "text-purple-700 bg-purple-100 border-purple-200/50",
        btnClass: "bg-white border border-purple-200 text-purple-600 hover:bg-purple-50",
        hoverTitle: "group-hover:text-purple-700",
    },
    {
        id: "python", title: "Python Masterclass",
        desc: "Deep dive into Python architecture. From syntax sugar to advanced data structures and memory models.",
        icon: "code", problems: 150, tag: "Advanced", status: "active" as const,
        gradient: "from-sky-400 via-blue-500 to-indigo-500",
        iconBg: "bg-gradient-to-tr from-sky-500 to-blue-600 border-none",
        iconColor: "text-white",
        statusColor: "text-sky-700 bg-sky-100 border-sky-200",
        btnClass: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25",
        hoverTitle: "group-hover:text-sky-600",
    },
    {
        id: "c-lang", title: "C Language",
        desc: "Low level programming concepts and manual memory management techniques for systems programming.",
        icon: "bolt", problems: 200, tag: "System", status: "locked" as const,
        gradient: "",
        iconBg: "bg-slate-100 border-slate-200",
        iconColor: "text-slate-400",
        statusColor: "text-slate-500 bg-slate-100 border-slate-200",
        btnClass: "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed",
        hoverTitle: "",
    },
];

const ROADMAP = [
    { title: "Foundations", icon: "check_circle", status: "done" as const },
    { title: "Logic", icon: "psychology", status: "done" as const },
    { title: "Python", icon: "code", status: "active" as const },
    { title: "C Language", icon: "data_object", status: "locked" as const },
    { title: "Masters", icon: "military_tech", status: "locked" as const },
];

const CLASSMATES = [
    { name: "Sarah K.", msg: 'Completed <span class="text-sky-600 font-semibold">Memory Mgmt</span> with 98% score! 🎉', time: "2m", hasAvatar: true },
    { name: "Mike R.", msg: 'Started the <span class="text-indigo-600 font-semibold">Pointer Quiz</span>.', time: "15m", hasAvatar: true },
    { name: "John Doe", msg: 'Earned "Bug Hunter" Badge', time: "1h", isBadge: true },
];

export default function JourneyPage() {
    const { progress } = useUserProgress();
    const [filter, setFilter] = useState("all");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* ═══ Main Content ═══ */}
            <div className="lg:col-span-7 flex flex-col gap-10">

                {/* ── Learning Roadmap ── */}
                <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-transparent opacity-50" />
                    <div className="flex justify-between items-end mb-10 relative z-10">
                        <div>
                            <h2 className="font-extrabold text-2xl text-slate-900 flex items-center gap-3">
                                <span className="p-2 bg-sky-100 text-sky-600 rounded-xl">
                                    <span className="material-symbols-outlined text-xl">map</span>
                                </span>
                                Learning Path
                            </h2>
                            <p className="text-slate-500 text-sm mt-1 ml-14">Your personalized curriculum to mastery</p>
                        </div>
                        <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-4 py-1.5 rounded-full shadow-sm">Recommended Path</span>
                    </div>

                    <div className="relative min-w-[600px] pt-4 pb-12 px-2 overflow-x-auto hide-scrollbar">
                        {/* Connecting line */}
                        <div className="absolute top-[3.5rem] left-8 right-8 roadmap-line-gradient z-0" />

                        <div className="flex justify-between relative z-10">
                            {ROADMAP.map((node, i) => (
                                <div key={i} className={`flex flex-col items-center group w-32 relative ${node.status === "locked" ? "cursor-not-allowed opacity-50 hover:opacity-80" : "cursor-pointer"} transition-opacity`}>
                                    <div className={`relative mb-4 ${node.status === "active" ? "" : node.status === "locked" ? "grayscale" : ""} transition-transform duration-300 group-hover:-translate-y-2`}>
                                        {/* Active spinning rings */}
                                        {node.status === "active" && (
                                            <>
                                                <div className="absolute -inset-4 rounded-full border border-sky-400/30 animate-[spin_10s_linear_infinite]" />
                                                <div className="absolute -inset-4 rounded-full border-t-2 border-sky-500 animate-[spin_3s_linear_infinite]" />
                                            </>
                                        )}

                                        <div className={`
                                            ${node.status === "active" ? "w-24 h-24 -mt-2 neon-ring" : "w-20 h-20"}
                                            rounded-full icon-3d-glass flex items-center justify-center relative z-20
                                            ${node.status === "locked" ? "bg-slate-100/50" : ""}
                                            ${node.status === "active" ? "transition-transform duration-300 group-hover:scale-105" : ""}
                                        `}>
                                            <span className={`material-symbols-outlined drop-shadow-sm
                                                ${node.status === "active" ? "text-sky-600 text-4xl drop-shadow-md" : node.status === "done" ? "text-emerald-500 text-3xl" : "text-slate-400 text-3xl"}
                                            `}>
                                                {node.status === "done" ? "check_circle" : node.icon}
                                            </span>
                                        </div>

                                        {/* Glow behind */}
                                        {node.status === "done" && <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl -z-10" />}
                                        {node.status === "active" && <div className="absolute inset-0 bg-sky-500/30 rounded-full blur-2xl -z-10 animate-pulse" />}

                                        {/* Active play badge */}
                                        {node.status === "active" && (
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full p-2 border-2 border-white z-30 shadow-lg animate-bounce">
                                                <span className="material-symbols-outlined text-white text-[10px] font-bold block">play_arrow</span>
                                            </div>
                                        )}

                                        {/* Lock badge */}
                                        {node.status === "locked" && (
                                            <div className="absolute -top-1 -right-1 bg-slate-400 rounded-full p-1.5 border-2 border-white z-20 shadow-sm">
                                                <span className="material-symbols-outlined text-white text-[12px] font-bold block">lock</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className={`text-center ${node.status === "active" ? "mt-2" : ""}`}>
                                        {node.status === "active" ? (
                                            <h4 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 text-base mb-1">{node.title}</h4>
                                        ) : (
                                            <h4 className={`font-bold text-sm mb-1 ${node.status === "locked" ? "text-slate-500" : "text-slate-800"}`}>{node.title}</h4>
                                        )}
                                        {node.status === "active" ? (
                                            <div className="inline-block px-2 py-0.5 rounded-full bg-sky-100 text-[10px] text-sky-700 font-bold uppercase tracking-wider border border-sky-200">In Progress</div>
                                        ) : (
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                                                {node.status === "done" ? "Completed" : "Locked"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Search + Filters ── */}
                <div className="flex flex-col sm:flex-row gap-5 items-center justify-between sticky top-[7.5rem] z-30 py-2 glass-card rounded-2xl px-4 mx-1">
                    <div className="relative w-full sm:w-auto flex-1 max-w-md">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-200 focus:border-sky-400 outline-none shadow-inner transition-all hover:bg-white"
                            placeholder="Filter modules..." type="text" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto hide-scrollbar">
                        {[
                            { key: "all", label: "All", icon: "grid_view", active: "bg-slate-800 text-white shadow-lg hover:bg-slate-700" },
                            { key: "basics", label: "Basics", icon: "eco", iconColor: "text-emerald-500", hover: "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700" },
                            { key: "langs", label: "Langs", icon: "code", iconColor: "text-sky-500", hover: "hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700" },
                            { key: "comp", label: "Comp", icon: "trophy", iconColor: "text-purple-500", hover: "hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700" },
                        ].map((f) => (
                            <button key={f.key} onClick={() => setFilter(f.key)}
                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2
                                ${filter === f.key
                                        ? (f.active || "bg-slate-800 text-white shadow-lg")
                                        : `bg-white text-slate-600 border border-slate-200 shadow-sm ${f.hover || ""}`
                                    }`}>
                                <span className={`material-symbols-outlined text-sm ${filter !== f.key ? (f.iconColor || "") : ""}`}>{f.icon}</span> {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Course Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COURSES.map((c) => (
                        <div key={c.id}
                            className={`glass-card ${c.status !== "locked" ? "glass-card-hover" : ""} rounded-3xl overflow-hidden group transition-all duration-300
                            ${c.status === "active" ? "relative ring-2 ring-sky-400/20 shadow-lg z-10 transform hover:-translate-y-1" : ""}
                            ${c.status === "locked" ? "opacity-70 hover:opacity-100 hover:shadow-lg border-dashed border-2 border-slate-300" : "iridescent-border"}
                            `}>
                            {/* Active card inner glow */}
                            {c.status === "active" && <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none" />}

                            {/* Top color bar */}
                            <div className={`h-1.5 w-full ${c.gradient ? `bg-gradient-to-r ${c.gradient}` : "bg-slate-300"}`} />

                            <div className={`p-7 ${c.status === "active" ? "relative" : ""}`}>
                                <div className="flex justify-between items-start mb-5">
                                    <div className={`w-14 h-14 rounded-2xl ${c.iconBg} border flex items-center justify-center ${c.iconColor} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${c.status === "active" ? "shadow-lg shadow-sky-500/30" : ""}`}>
                                        <span className="material-symbols-outlined text-3xl">{c.icon}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm flex items-center gap-1.5 ${c.statusColor}`}>
                                            {c.status === "active" && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                                                </span>
                                            )}
                                            {c.status === "locked" && <span className="material-symbols-outlined text-[10px]">lock</span>}
                                            {c.status === "completed" ? "Completed" : c.status === "active" ? "In Progress" : "Locked"}
                                        </span>
                                    </div>
                                </div>

                                <h3 className={`text-xl font-bold mb-2 transition-colors ${c.status === "locked" ? "text-slate-700" : `text-slate-900 ${c.hoverTitle}`}`}>{c.title}</h3>
                                <p className={`text-sm mb-6 line-clamp-2 leading-relaxed ${c.status === "locked" ? "text-slate-400" : "text-slate-500"}`}>{c.desc}</p>

                                <div className="flex items-center gap-3 mb-8">
                                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${c.status === "active" ? "bg-white text-slate-600 border-slate-200 shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200"} ${c.status === "locked" ? "text-slate-400" : ""}`}>{c.problems} Problems</span>
                                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${c.status === "active" ? "bg-white text-slate-600 border-slate-200 shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200"} ${c.status === "locked" ? "text-slate-400" : ""}`}>{c.tag}</span>
                                </div>

                                <button disabled={c.status === "locked"}
                                    className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md ${c.btnClass}`}>
                                    <span className="material-symbols-outlined text-lg">{c.status === "locked" ? "lock" : c.status === "active" ? "play_arrow" : "rocket_launch"}</span>
                                    {c.status === "completed" ? "Review Course" : c.status === "active" ? "Continue Learning" : "Start Learning"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ Right Sidebar ═══ */}
            <aside className="lg:col-span-3 flex flex-col gap-8 sticky top-32 h-fit">

                {/* ── Activity Overview ── */}
                <div className="glass-card rounded-[2rem] p-6 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-50" />
                    <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 mb-6 uppercase tracking-wider relative z-10">
                        <span className="material-symbols-outlined text-sky-500 text-xl">timelapse</span>
                        Activity Overview
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                        <div className="p-4 bg-white/60 rounded-2xl border border-white/80 shadow-sm backdrop-blur-sm">
                            <div className="text-xs text-sky-600 font-bold mb-1 uppercase tracking-wide">Time Spent</div>
                            <div className="text-2xl font-black text-slate-800">4h 15m</div>
                        </div>
                        <div className="p-4 bg-white/60 rounded-2xl border border-white/80 shadow-sm backdrop-blur-sm">
                            <div className="text-xs text-teal-600 font-bold mb-1 uppercase tracking-wide">XP Earned</div>
                            <div className="text-2xl font-black text-slate-800">{progress.xp}</div>
                        </div>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-100/60 flex items-center justify-between relative z-10 shadow-sm">
                        <div>
                            <div className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mb-1">Current Streak</div>
                            <div className="text-xl font-black text-slate-800 flex items-center gap-1.5">
                                {progress.streak} Days
                                <span className="material-symbols-outlined text-orange-500 text-lg animate-pulse">local_fire_department</span>
                            </div>
                        </div>
                        <div className="relative w-12 h-12">
                            <svg className="w-full h-full -rotate-90 transform drop-shadow-sm" viewBox="0 0 36 36">
                                <path className="text-orange-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                <path className="text-orange-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${Math.min(progress.streak * 5, 100)}, 100`} strokeLinecap="round" strokeWidth="3" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-orange-600">
                                {Math.min(progress.streak * 5, 100)}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Classmates ── */}
                <div className="glass-card rounded-[2rem] p-6 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="material-symbols-outlined text-indigo-500 text-xl">group</span>
                            Classmates
                        </h2>
                        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors">View All</span>
                    </div>
                    <div className="space-y-6 relative">
                        {/* Timeline line */}
                        <div className="absolute left-[1.15rem] top-3 bottom-3 w-0.5 bg-slate-200 -z-0" />

                        {CLASSMATES.map((c, i) => (
                            <div key={i} className="flex items-start gap-4 relative z-10 group cursor-pointer">
                                <div className="relative">
                                    {c.hasAvatar ? (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-600 flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-md transition-transform group-hover:scale-110">
                                            {c.name.charAt(0)}
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-md">
                                            {c.name.split(" ").map(w => w[0]).join("")}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 bg-white/60 p-3 rounded-2xl rounded-tl-sm hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className="text-xs font-bold text-slate-900">{c.name}</p>
                                        <span className="text-[10px] font-mono text-slate-400">{c.time}</span>
                                    </div>
                                    {c.isBadge ? (
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <span className="material-symbols-outlined text-[16px] text-yellow-500">military_tech</span>
                                            {c.msg}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-500 leading-snug" dangerouslySetInnerHTML={{ __html: c.msg }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── AI Mentor CTA ── */}
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-xl shadow-indigo-500/30 cursor-pointer group transform transition-transform hover:scale-[1.02]">
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                    <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
                    <div className="relative z-10">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase backdrop-blur-md border border-white/10 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
                            </span>
                            Pro Feature
                        </div>
                        <h3 className="mb-2 font-bold text-xl tracking-tight">Unlock AI Mentor</h3>
                        <p className="text-xs text-indigo-100 mb-6 leading-relaxed opacity-90">Get instant, intelligent help with your code anytime. Your personal coding assistant.</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-white bg-white/20 hover:bg-white/30 w-fit px-4 py-2 rounded-xl transition-all backdrop-blur-sm">
                            Upgrade Now <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined absolute bottom-4 right-4 text-8xl text-white/5 rotate-12 group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500">smart_toy</span>
                </div>
            </aside>
        </div>
    );
}
