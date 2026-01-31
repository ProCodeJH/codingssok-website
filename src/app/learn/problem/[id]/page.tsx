"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

interface Problem {
    id: string;
    title: string;
    description: string;
    subject: string;
    difficulty: string;
    points: number;
    hint?: string;
}

export default function ProblemPage() {
    const { user, loading, refreshUser } = useAuth();
    const router = useRouter();
    const params = useParams();
    const problemId = params.id as string;

    const [problem, setProblem] = useState<Problem | null>(null);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState<{ correct: boolean; points: number } | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await fetch(`/api/problems/${problemId}`);
                const data = await res.json();
                setProblem(data.problem);
            } catch (error) {
                console.error("Failed to fetch problem:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user && problemId) {
            fetchProblem();
        }
    }, [problemId, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim() || submitting) return;

        setSubmitting(true);

        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problemId, answer: answer.trim() })
            });
            const data = await res.json();

            if (data.success) {
                setResult({ correct: data.isCorrect, points: data.earnedPoints });
                if (data.isCorrect) {
                    refreshUser(); // 포인트 갱신
                }
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user || !problem) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/learn" className="text-gray-400 hover:text-gray-600">
                        ← 돌아가기
                    </Link>
                    <span className="text-sm font-semibold text-blue-600">{user.points.toLocaleString()} P</span>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Problem Info */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`text-xs px-3 py-1 rounded-full ${problem.difficulty === 'EASY' ? 'bg-green-100 text-green-700' :
                                    problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {problem.difficulty === 'EASY' ? '쉬움' :
                                    problem.difficulty === 'MEDIUM' ? '보통' : '어려움'}
                            </span>
                            <span className="text-blue-600 font-semibold text-sm">+{problem.points}P</span>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-6">{problem.title}</h1>

                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                                {problem.description}
                            </p>
                        </div>

                        {problem.hint && (
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="text-sm text-gray-400 hover:text-gray-600"
                                >
                                    {showHint ? '힌트 숨기기 ▲' : '힌트 보기 ▼'}
                                </button>
                                {showHint && (
                                    <p className="mt-2 p-4 bg-yellow-50 rounded-xl text-sm text-yellow-800">
                                        💡 {problem.hint}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Answer Form */}
                    {result ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`rounded-2xl p-8 text-center ${result.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                                }`}
                        >
                            <div className={`text-5xl mb-4 ${result.correct ? '' : ''}`}>
                                {result.correct ? '🎉' : '😢'}
                            </div>
                            <h2 className={`text-2xl font-bold mb-2 ${result.correct ? 'text-green-700' : 'text-red-700'
                                }`}>
                                {result.correct ? '정답입니다!' : '오답입니다'}
                            </h2>
                            {result.correct && (
                                <p className="text-green-600 font-semibold mb-6">
                                    +{result.points}P 적립되었습니다!
                                </p>
                            )}
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href="/learn"
                                    className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800"
                                >
                                    다른 문제 풀기
                                </Link>
                                {!result.correct && (
                                    <button
                                        onClick={() => { setResult(null); setAnswer(""); }}
                                        className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold border border-gray-200 hover:bg-gray-50"
                                    >
                                        다시 시도
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                정답 입력
                            </label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                                placeholder="정답을 입력하세요..."
                                required
                            />
                            <motion.button
                                type="submit"
                                disabled={submitting || !answer.trim()}
                                className="mt-4 w-full py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
                                whileHover={{ scale: submitting ? 1 : 1.01 }}
                                whileTap={{ scale: submitting ? 1 : 0.99 }}
                            >
                                {submitting ? '제출 중...' : '정답 제출'}
                            </motion.button>
                        </form>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
