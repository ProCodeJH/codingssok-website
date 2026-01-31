"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

interface Problem {
    id: string;
    title: string;
    difficulty: string;
    points: number;
}

const subjectNames: Record<string, string> = {
    "python": "Python",
    "c-lang": "C언어",
    "scratch": "스크래치",
    "algorithm": "알고리즘"
};

const difficultyLabels: Record<string, { label: string; color: string }> = {
    "EASY": { label: "쉬움", color: "bg-green-100 text-green-700" },
    "MEDIUM": { label: "보통", color: "bg-yellow-100 text-yellow-700" },
    "HARD": { label: "어려움", color: "bg-red-100 text-red-700" }
};

export default function SubjectPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const subject = params.subject as string;

    const [problems, setProblems] = useState<Problem[]>([]);
    const [filter, setFilter] = useState<string>("ALL");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const subjectMap: Record<string, string> = {
                    "python": "PYTHON",
                    "c-lang": "C_LANG",
                    "scratch": "SCRATCH",
                    "algorithm": "ALGORITHM"
                };
                const res = await fetch(`/api/problems?subject=${subjectMap[subject] || subject}`);
                const data = await res.json();
                setProblems(data.problems || []);
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchProblems();
        }
    }, [subject, user]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    const filteredProblems = filter === "ALL"
        ? problems
        : problems.filter(p => p.difficulty === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/learn" className="text-gray-400 hover:text-gray-600">
                            ← 돌아가기
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">
                            {subjectNames[subject] || subject}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{user.name}</span>
                        <span className="text-sm font-semibold text-blue-600">{user.points.toLocaleString()} P</span>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Filters */}
                <div className="flex gap-3 mb-8">
                    {["ALL", "EASY", "MEDIUM", "HARD"].map((d) => (
                        <button
                            key={d}
                            onClick={() => setFilter(d)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === d
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                                }`}
                        >
                            {d === "ALL" ? "전체" : difficultyLabels[d].label}
                        </button>
                    ))}
                </div>

                {/* Problem List */}
                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
                    </div>
                ) : filteredProblems.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        아직 등록된 문제가 없습니다.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredProblems.map((problem, i) => (
                            <motion.div
                                key={problem.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/learn/problem/${problem.id}`}>
                                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-400 font-mono text-sm">
                                                #{String(i + 1).padStart(3, '0')}
                                            </span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{problem.title}</h3>
                                                <span className={`text-xs px-2 py-1 rounded-full ${difficultyLabels[problem.difficulty]?.color || 'bg-gray-100'}`}>
                                                    {difficultyLabels[problem.difficulty]?.label || problem.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-blue-600 font-semibold">+{problem.points}P</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
