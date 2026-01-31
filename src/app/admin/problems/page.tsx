"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Problem {
    id: string;
    title: string;
    subject: string;
    difficulty: string;
    points: number;
}

export default function AdminProblemsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [problems, setProblems] = useState<Problem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "PYTHON",
        difficulty: "EASY",
        points: 10,
        answer: "",
        hint: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/auth/login");
            } else if (user.role !== "ADMIN" && user.role !== "TEACHER") {
                router.push("/learn");
            }
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchProblems = async () => {
            const res = await fetch('/api/problems');
            const data = await res.json();
            setProblems(data.problems || []);
        };
        if (user && (user.role === "ADMIN" || user.role === "TEACHER")) {
            fetchProblems();
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");

        try {
            const res = await fetch('/api/problems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setMessage("문제가 생성되었습니다!");
                setProblems([data.problem, ...problems]);
                setFormData({
                    title: "",
                    description: "",
                    subject: "PYTHON",
                    difficulty: "EASY",
                    points: 10,
                    answer: "",
                    hint: ""
                });
                setShowForm(false);
            } else {
                setMessage(data.error || "문제 생성에 실패했습니다");
            }
        } catch {
            setMessage("오류가 발생했습니다");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !user || (user.role !== "ADMIN" && user.role !== "TEACHER")) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/learn" className="text-gray-400 hover:text-gray-600">← 학습으로</Link>
                        <h1 className="text-xl font-bold text-gray-900">관리자 - 문제 관리</h1>
                    </div>
                    <Link href="/admin/exchanges" className="text-sm text-blue-600 hover:text-blue-700">
                        교환 관리 →
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {message && (
                    <div className={`mb-6 p-4 rounded-xl ${message.includes('생성') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">문제 목록</h2>
                    <motion.button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {showForm ? '취소' : '+ 새 문제'}
                    </motion.button>
                </div>

                {showForm && (
                    <motion.form
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl p-8 border border-gray-100 mb-8"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-6">새 문제 만들기</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">과목</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                                >
                                    <option value="PYTHON">Python</option>
                                    <option value="C_LANG">C언어</option>
                                    <option value="SCRATCH">스크래치</option>
                                    <option value="ALGORITHM">알고리즘</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">난이도</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                                >
                                    <option value="EASY">쉬움 (10P)</option>
                                    <option value="MEDIUM">보통 (20P)</option>
                                    <option value="HARD">어려움 (30P)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">문제 제목</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                                placeholder="예: Python 변수 선언하기"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">문제 내용</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl h-32 resize-none"
                                placeholder="문제 설명을 입력하세요..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">정답</label>
                                <input
                                    type="text"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                                    placeholder="정답 입력"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">배점 (P)</label>
                                <input
                                    type="number"
                                    value={formData.points}
                                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                                    min={1}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">힌트 (선택)</label>
                            <input
                                type="text"
                                value={formData.hint}
                                onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                                placeholder="힌트 (선택사항)"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:opacity-50"
                            whileHover={{ scale: submitting ? 1 : 1.01 }}
                        >
                            {submitting ? "생성 중..." : "문제 생성"}
                        </motion.button>
                    </motion.form>
                )}

                <div className="space-y-4">
                    {problems.length === 0 ? (
                        <p className="text-gray-400 text-center py-12">아직 등록된 문제가 없습니다</p>
                    ) : (
                        problems.map((problem) => (
                            <div key={problem.id} className="bg-white rounded-xl p-6 border border-gray-100 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{problem.title}</h3>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                            {problem.subject}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${problem.difficulty === 'EASY' ? 'bg-green-100 text-green-700' :
                                                problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-blue-600 font-semibold">{problem.points}P</span>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
