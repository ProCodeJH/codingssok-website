"use client";

import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Course Data ── */
const COURSES = [
    { id: "coding-foundations", name: "Coding Foundations", icon: "extension", color: "green", status: "completed" as const, problems: 80, level: "Beginner", desc: "First steps into programming. Learn variables, loops, and basic logic structures." },
    { id: "computational-thinking", name: "Computational Thinking", icon: "psychology", color: "purple", status: "completed" as const, problems: 120, level: "Logic", desc: "Enhance logical problem solving skills and algorithmic approaches." },
    { id: "python", name: "Python Masterclass", icon: "code", color: "blue", status: "current" as const, problems: 150, level: "Advanced", desc: "Deep dive into Python. From syntax to advanced data structures." },
    { id: "c-language", name: "C Language", icon: "bolt", color: "orange", status: "locked" as const, problems: 200, level: "System", desc: "Low level programming concepts and memory management techniques." },
    { id: "cos-cert", name: "COS Certification", icon: "assignment", color: "teal", status: "locked" as const, problems: 100, level: "Exam Prep", desc: "Prepare for the Certified Operating Specialist exam." },
    { id: "cos-pro", name: "COS Pro", icon: "trophy", color: "pink", status: "locked" as const, problems: 80, level: "Pro Exam", desc: "Advanced certification track for professional developers." },
];

const ROADMAP_NODES = [
    { name: "Coding Basics", icon: "check", problems: 80, status: "completed" as const, color: "green" },
    { name: "Logic Thinking", icon: "psychology", problems: 120, status: "completed" as const, color: "green" },
    { name: "Python", icon: "code", problems: 150, status: "current" as const, color: "blue" },
    { name: "C Language", icon: "data_object", problems: 200, status: "locked" as const, color: "slate" },
    { name: "Masters", icon: "military_tech", problems: 0, status: "locked" as const, color: "slate" },
];

const CLASSMATES = [
    { name: "Sarah K.", msg: 'Completed Memory Mgmt with 98% score! 🎉', time: "2m", color: "green", lvl: "3", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6T5yFj3Yko5onxuuj2MwKFVX1yyGt-s1ykU2vgtgVGr99v-yUyEqVhaqlx6OBHDVRXz3DbQa9SD4tc4x5kWG-T7DvHthFLRJVkcV6YukrcVYaHQg4UwSqJ___dkwL_iQikdTtARza5D9W-jJJvFrED9yrlx9RzbYcFdzUEPRhNbGh5HlUSI97rVR3uWWXiGs05kggBIer8QHBaKj6sv9RAOK-5XwTDoGxbj7GHpdsnrouCFR7pSYkcj13FgiPoMUX9QBBni9GKuFG" },
    { name: "Mike R.", msg: 'Started the Pointer Quiz.', time: "15m", color: "", lvl: "", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw9T3PrgFgIMzN2uJPwgerID6vEwsd0762Dpl8OC-zcBbv3SoL8bkTeouyQFTErhYfCF3mEfPOKJ3NXZHWlJgaRRTG0D307rvE8NBl7EuOxWLYfwlUnic07zqh5eGnAblr3Z2u7x-SRJlYRDN2P7ZXt2LbbUUyr1TVX_DzLMLGi5Adq7dk61juENgQjDOxGE8_F0JTEQdgW76QtjNild7OiOPLN0OQjZKe4zChg4XbpRfpJj0cnVEVHtc7_LqRzFJBL8l8TH07VAlc" },
    { name: "John Doe", msg: 'Earned "Bug Hunter" Badge', time: "1h", initials: "JD", color: "indigo" },
];

function CourseStatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; cls: string }> = {
        completed: { label: "Completed", cls: "text-green-600 bg-green-100" },
        current: { label: "In Progress", cls: "text-blue-600 bg-blue-100" },
        locked: { label: "Locked", cls: "text-slate-500 bg-slate-100" },
    };
    const s = map[status] || map.locked;
    return (
        <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${s.cls}`}>
            {status === "current" && <span className="animate-pulse size-1.5 rounded-full bg-blue-600" />}
            {status === "locked" && <span className="material-symbols-outlined text-[10px]">lock</span>}
            {s.label}
        </span>
    );
}

const colorMap: Record<string, { bg: string; text: string; btn: string; btnHover: string }> = {
    green: { bg: "bg-green-50", text: "text-green-600", btn: "bg-green-500 hover:bg-green-600", btnHover: "" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", btn: "bg-purple-500 hover:bg-purple-600", btnHover: "" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", btn: "bg-blue-600 hover:bg-blue-700", btnHover: "" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", btn: "bg-orange-500 hover:bg-orange-600", btnHover: "" },
    teal: { bg: "bg-teal-50", text: "text-teal-600", btn: "bg-teal-500 hover:bg-teal-600", btnHover: "" },
    pink: { bg: "bg-pink-50", text: "text-pink-600", btn: "bg-pink-500 hover:bg-pink-600", btnHover: "" },
};

export default function JourneyPage() {
    const { progress } = useUserProgress();

    return (
        <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
            {/* Roadmap */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm overflow-x-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#13daec]">map</span>
                        Learning Roadmap
                    </h2>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Recommended Path</span>
                </div>
                <div className="relative min-w-[600px] pt-4 pb-8 px-4">
                    {/* Horizontal line */}
                    <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-0" />
                    <div className="flex justify-between relative z-10">
                        {ROADMAP_NODES.map((node, i) => (
                            <div key={i} className={`flex flex-col items-center group w-28 ${node.status === "locked" ? "opacity-60 cursor-not-allowed hover:opacity-100" : "cursor-pointer"} transition-opacity`}>
                                <div className="relative mb-3">
                                    {node.status === "current" && <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />}
                                    <div className={`
                    ${node.status === "current" ? "size-20 -mt-2" : "size-16"}
                    rounded-full bg-white border-4
                    ${node.status === "completed" ? "border-green-500" : node.status === "current" ? "border-blue-500 shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)]" : "border-gray-200"}
                    flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-20
                  `}>
                                        <span className={`material-symbols-outlined ${node.status === "completed" ? "text-green-500" : node.status === "current" ? "text-blue-500" : "text-gray-400"} ${node.status === "current" ? "text-3xl" : "text-2xl"}`}>
                                            {node.status === "completed" ? "check" : node.icon}
                                        </span>
                                    </div>
                                    <div className={`absolute -top-1 -right-1 ${node.status === "completed" ? "bg-green-500" : node.status === "current" ? "bg-blue-500 animate-bounce" : "bg-gray-400"} rounded-full p-1 border-2 border-white z-30`}>
                                        <span className="material-symbols-outlined text-white text-[10px] font-bold block">
                                            {node.status === "completed" ? "done" : node.status === "current" ? "play_arrow" : "lock"}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center mt-1">
                                    <h4 className={`font-bold text-sm mb-1 ${node.status === "current" ? "text-blue-600" : "text-gray-900"}`}>{node.name}</h4>
                                    <p className={`text-[10px] font-medium ${node.status === "current" ? "text-blue-500/70 uppercase tracking-wider font-bold" : "text-gray-500"}`}>
                                        {node.status === "current" ? "In Progress" : node.problems > 0 ? `${node.problems} Problems` : "Final Exam"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-auto flex-1 max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                    <input className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#13daec]/20 focus:border-[#13daec] outline-none shadow-sm" placeholder="Search modules..." type="text" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md whitespace-nowrap flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">grid_view</span> All
                    </button>
                    {[
                        { label: "Basics", icon: "eco", color: "text-green-500" },
                        { label: "Langs", icon: "code", color: "text-blue-500" },
                        { label: "Comp", icon: "trophy", color: "text-purple-500" },
                    ].map((f) => (
                        <button key={f.label} className="px-4 py-2 bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1">
                            <span className={`material-symbols-outlined text-sm ${f.color}`}>{f.icon}</span> {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Course Cards */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COURSES.map((c) => {
                        const cm = colorMap[c.color] || colorMap.blue;
                        const isCompleted = progress.completedCourses.includes(c.id);
                        return (
                            <div key={c.id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 relative ${c.status === "locked" ? "opacity-75 hover:opacity-100" : ""}`}>
                                <div className={`absolute top-0 left-0 right-0 h-1 ${cm.btn.split(" ")[0]}`} />
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`size-12 rounded-lg ${cm.bg} flex items-center justify-center ${cm.text} group-hover:scale-110 transition-transform`}>
                                            <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Status</span>
                                            <CourseStatusBadge status={isCompleted ? "completed" : c.status} />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{c.name}</h3>
                                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">{c.desc}</p>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200">{c.problems} Problems</span>
                                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200">{c.level}</span>
                                    </div>
                                    <button className={`w-full py-2.5 ${cm.btn} text-white rounded-lg text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2`} disabled={c.status === "locked"}>
                                        <span className="material-symbols-outlined text-lg">{c.status === "locked" ? "lock" : c.status === "current" ? "play_arrow" : "rocket_launch"}</span>
                                        {c.status === "locked" ? "Start Learning" : c.status === "current" ? "Continue Learning" : "Review Course"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right sidebar */}
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
                        </div>
                    </div>

                    {/* Classmates */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#3b82f6] text-xl">group</span>
                                Classmates
                            </h2>
                            <span className="text-[10px] font-bold text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded-md">View All</span>
                        </div>
                        <div className="space-y-5">
                            {CLASSMATES.map((c, i) => (
                                <div key={i} className="flex items-start gap-3 group cursor-pointer">
                                    <div className="relative">
                                        {c.avatar ? (
                                            <div className="size-8 rounded-full bg-cover bg-center ring-2 ring-white shadow-sm" style={{ backgroundImage: `url("${c.avatar}")` }} />
                                        ) : (
                                            <div className={`size-8 rounded-full bg-${c.color}-100 text-${c.color}-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm`}>{c.initials}</div>
                                        )}
                                        {c.lvl && <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] font-bold px-1 rounded-full border border-white">Lvl {c.lvl}</div>}
                                    </div>
                                    <div className="flex-1 min-w-0 bg-gray-50 p-2.5 rounded-r-xl rounded-bl-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <p className="text-xs font-bold text-gray-900">{c.name}</p>
                                            <span className="text-[10px] font-mono text-gray-500">{c.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-tight">{c.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Mentor CTA */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-xl cursor-pointer group">
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all" />
                        <div className="relative z-10">
                            <div className="mb-2 inline-flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> Pro Feature
                            </div>
                            <h3 className="mb-1 font-bold">Unlock AI Mentor</h3>
                            <p className="text-xs text-indigo-100 mb-3">Get instant help with your code anytime.</p>
                            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:underline">
                                Upgrade Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined absolute bottom-4 right-4 text-6xl text-white/10 rotate-12 group-hover:scale-110 transition-transform">smart_toy</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
