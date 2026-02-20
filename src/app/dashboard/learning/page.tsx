"use client";

import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Course Data ── */
const COURSES = [
    {
        id: "foundations", title: "Coding Foundations", desc: "First steps into programming. Learn variables, loops, and basic logic structures.", icon: "extension", problems: 80, tag: "Beginner", status: "completed" as const,
        barCls: "bg-green-500", iconBg: "bg-green-50", iconTxt: "text-green-600", statusBg: "bg-green-100 text-green-600", btnCls: "bg-green-500 hover:bg-green-600"
    },
    {
        id: "thinking", title: "Computational Thinking", desc: "Enhance logical problem solving skills and algorithmic approaches.", icon: "psychology", problems: 120, tag: "Logic", status: "completed" as const,
        barCls: "bg-purple-500", iconBg: "bg-purple-50", iconTxt: "text-purple-600", statusBg: "bg-purple-100 text-purple-600", btnCls: "bg-purple-500 hover:bg-purple-600"
    },
    {
        id: "python", title: "Python Masterclass", desc: "Deep dive into Python. From syntax to advanced data structures.", icon: "code", problems: 150, tag: "Advanced", status: "active" as const,
        barCls: "bg-blue-500", iconBg: "bg-blue-50", iconTxt: "text-blue-600", statusBg: "bg-blue-100 text-blue-600", btnCls: "bg-blue-600 hover:bg-blue-700"
    },
    {
        id: "c-lang", title: "C Language", desc: "Low level programming concepts and memory management techniques.", icon: "bolt", problems: 200, tag: "System", status: "locked" as const,
        barCls: "bg-orange-500", iconBg: "bg-orange-50", iconTxt: "text-orange-600", statusBg: "bg-gray-100 text-gray-500", btnCls: "bg-orange-500"
    },
    {
        id: "cos", title: "COS Certification", desc: "Prepare for the Certified Operating Specialist exam.", icon: "assignment", problems: 100, tag: "Exam Prep", status: "locked" as const,
        barCls: "bg-teal-500", iconBg: "bg-teal-50", iconTxt: "text-teal-600", statusBg: "bg-gray-100 text-gray-500", btnCls: "bg-teal-500"
    },
    {
        id: "cospro", title: "COS Pro", desc: "Advanced certification track for professional developers.", icon: "trophy", problems: 80, tag: "Pro Exam", status: "locked" as const,
        barCls: "bg-pink-500", iconBg: "bg-pink-50", iconTxt: "text-pink-600", statusBg: "bg-gray-100 text-gray-500", btnCls: "bg-pink-500"
    },
];

const ROADMAP = [
    { title: "Coding Basics", icon: "check", problems: 80, status: "done" as const },
    { title: "Logic Thinking", icon: "psychology", problems: 120, status: "done" as const },
    { title: "Python", icon: "code", problems: 150, status: "active" as const },
    { title: "C Language", icon: "data_object", problems: 200, status: "locked" as const },
    { title: "Masters", icon: "military_tech", problems: 0, status: "locked" as const },
];

const CLASSMATES = [
    { name: "Sarah K.", msg: "Memory Mgmt 완료 — 98% 달성! 🎉", time: "2m", level: 3 },
    { name: "Mike R.", msg: "Pointer Quiz 시작", time: "15m" },
    { name: "John Doe", msg: "'Bug Hunter' 뱃지 획득", time: "1h", badge: true },
];

export default function JourneyPage() {
    const { progress } = useUserProgress();
    const [filter, setFilter] = useState("all");

    return (
        <div className="p-6 lg:p-10 max-w-[1200px] mx-auto flex flex-col gap-8">
            {/* Learning Roadmap */}
            <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#13daec]">map</span>
                        Learning Roadmap
                    </h2>
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Recommended Path</span>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] py-4 px-4">
                        {/* Roadmap nodes — no absolute positioning */}
                        <div className="flex justify-between items-start gap-2">
                            {ROADMAP.map((node, i) => (
                                <div key={i} className={`flex flex-col items-center w-28 shrink-0 ${node.status === "locked" ? "opacity-50" : ""}`}>
                                    <div className={`
                    ${node.status === "active" ? "w-20 h-20" : "w-16 h-16"}
                    rounded-full bg-white flex items-center justify-center shadow-lg mb-3 border-4
                    ${node.status === "done" ? "border-green-500" : node.status === "active" ? "border-blue-500" : "border-gray-200"}
                  `}>
                                        <span className={`material-symbols-outlined ${node.status === "active" ? "text-3xl text-blue-500" : node.status === "done" ? "text-2xl text-green-500" : "text-2xl text-gray-400"}`}>
                                            {node.status === "done" ? "check" : node.icon}
                                        </span>
                                    </div>
                                    <h4 className={`font-bold text-sm mb-1 text-center ${node.status === "active" ? "text-blue-600" : "text-gray-900"}`}>{node.title}</h4>
                                    <p className={`text-[10px] font-medium text-center ${node.status === "active" ? "text-blue-500 uppercase tracking-wider font-bold" : "text-gray-400"}`}>
                                        {node.status === "active" ? "In Progress" : node.problems > 0 ? `${node.problems} Problems` : "Final Exam"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Search + Filters */}
            <section className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-auto flex-1 max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                    <input className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#13daec]/20 focus:border-[#13daec] outline-none shadow-sm" placeholder="Search modules..." type="text" />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    {[
                        { key: "all", label: "All", icon: "grid_view" },
                        { key: "basics", label: "Basics", icon: "eco" },
                        { key: "langs", label: "Langs", icon: "code" },
                        { key: "comp", label: "Comp", icon: "trophy" },
                    ].map((f) => (
                        <button key={f.key} onClick={() => setFilter(f.key)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1
                ${filter === f.key ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-400 border border-gray-200 hover:bg-gray-50"}`}
                        >
                            <span className="material-symbols-outlined text-sm">{f.icon}</span> {f.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Course Cards */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COURSES.map((c) => (
                        <div key={c.id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 ${c.status === "locked" ? "opacity-75 hover:opacity-100" : ""} ${c.status === "active" ? "ring-2 ring-blue-200" : ""}`}>
                            {/* Top color bar */}
                            <div className={`h-1 ${c.barCls}`} />
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${c.iconBg} flex items-center justify-center ${c.iconTxt} group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status</span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${c.statusBg}`}>
                                            {c.status === "active" && <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                            {c.status === "completed" ? "Completed" : c.status === "active" ? "In Progress" : "Locked"}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{c.desc}</p>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200">{c.problems} Problems</span>
                                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200">{c.tag}</span>
                                </div>
                                <button disabled={c.status === "locked"} className={`w-full py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 text-white ${c.btnCls} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                    <span className="material-symbols-outlined text-lg">{c.status === "locked" ? "lock" : c.status === "active" ? "play_arrow" : "rocket_launch"}</span>
                                    {c.status === "completed" ? "Review Course" : c.status === "active" ? "Continue Learning" : "Start Learning"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Activity Overview */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-[#13daec] text-xl">timelapse</span>
                            Activity Overview
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="text-xs text-blue-600 font-semibold mb-1">Time Spent</div>
                                <div className="text-xl font-black text-gray-900">4h 15m</div>
                            </div>
                            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
                                <div className="text-xs text-teal-600 font-semibold mb-1">XP Earned</div>
                                <div className="text-xl font-black text-gray-900">{progress.xp}</div>
                            </div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between">
                            <div>
                                <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Current Streak</div>
                                <div className="text-lg font-black text-gray-900 flex items-center gap-1">
                                    {progress.streak} Days
                                    <span className="material-symbols-outlined text-orange-500 text-sm">local_fire_department</span>
                                </div>
                            </div>
                            <div className="w-10 h-10">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-orange-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <path className="text-orange-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${Math.min(progress.streak * 5, 100)}, 100`} strokeWidth="4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Classmates */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-xl">group</span>
                                Classmates
                            </h2>
                            <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded-md">View All</span>
                        </div>
                        <div className="space-y-4">
                            {CLASSMATES.map((c, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0 bg-gray-50 p-2.5 rounded-xl">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <p className="text-xs font-bold text-gray-900">{c.name}</p>
                                            <span className="text-[10px] font-mono text-gray-400">{c.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-tight">
                                            {c.badge ? (
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-yellow-500">military_tech</span>
                                                    {c.msg}
                                                </span>
                                            ) : c.msg}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Mentor CTA */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                        <div className="mb-2 inline-flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> Pro Feature
                        </div>
                        <h3 className="mb-1 font-bold">Unlock AI Mentor</h3>
                        <p className="text-xs text-indigo-100 mb-3">Get instant help with your code anytime.</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-white hover:underline cursor-pointer">
                            Upgrade Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
