"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const subjects = [
    {
        id: "python",
        title: "Python",
        desc: "파이썬 프로그래밍 기초부터 심화까지",
        icon: "🐍",
        color: "from-blue-500 to-blue-600",
        problems: 45
    },
    {
        id: "c-lang",
        title: "C언어",
        desc: "C언어 기초 문법과 알고리즘",
        icon: "⚙️",
        color: "from-purple-500 to-purple-600",
        problems: 38
    },
    {
        id: "scratch",
        title: "스크래치",
        desc: "블록 코딩으로 컴퓨팅 사고력 키우기",
        icon: "🧩",
        color: "from-orange-500 to-orange-600",
        problems: 30
    },
    {
        id: "algorithm",
        title: "알고리즘",
        desc: "문제 해결력과 논리적 사고력 강화",
        icon: "🧠",
        color: "from-green-500 to-green-600",
        problems: 52
    },
];

export default function LearnPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">쏙</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">코딩쏙</span>
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link href="/learn" className="text-sm font-medium text-gray-900">학습하기</Link>
                        <Link href="/points" className="text-sm font-medium text-gray-500 hover:text-gray-900">포인트</Link>
                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                <p className="text-xs text-blue-600">{user.points.toLocaleString()} P</p>
                            </div>
                            <button
                                onClick={logout}
                                className="text-sm text-gray-400 hover:text-gray-600"
                            >
                                로그아웃
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        안녕하세요, {user.name}님! 👋
                    </h1>
                    <p className="text-gray-500">오늘도 열심히 공부해볼까요?</p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100"
                    >
                        <p className="text-sm text-gray-500 mb-1">보유 포인트</p>
                        <p className="text-3xl font-bold text-gray-900">{user.points.toLocaleString()}P</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100"
                    >
                        <p className="text-sm text-gray-500 mb-1">푼 문제</p>
                        <p className="text-3xl font-bold text-gray-900">0문제</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100"
                    >
                        <p className="text-sm text-gray-500 mb-1">정답률</p>
                        <p className="text-3xl font-bold text-gray-900">--%</p>
                    </motion.div>
                </div>

                {/* Subject Cards */}
                <h2 className="text-xl font-bold text-gray-900 mb-6">과목 선택</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {subjects.map((subject, i) => (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                        >
                            <Link href={`/learn/${subject.id}`}>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <span className="text-2xl">{subject.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{subject.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{subject.desc}</p>
                                    <p className="text-xs text-gray-400">{subject.problems}개 문제</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
