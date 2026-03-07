'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getMyClasses } from '@/lib/actions/classes'
import { getClassCodingActivity } from '@/lib/actions/stats'
import { getStudentProgressByClass } from '@/lib/actions/learning'
import Link from 'next/link'
import {
    BarChart3,
    Loader2,
    Users,
    Code2,
    BookOpen,
    ChevronDown,
    TrendingUp,
    ChevronRight,
} from 'lucide-react'

interface ClassItem {
    id: string
    name: string
}

interface StudentActivity {
    student_id: string
    name: string
    email: string
    success: number
    error: number
    total: number
}

interface StudentProgress {
    student_id: string
    name: string
    completed: number
    total: number
    rate: number
}

export default function AnalyticsPage() {
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [selectedClassId, setSelectedClassId] = useState<string>('')
    const [activity, setActivity] = useState<StudentActivity[]>([])
    const [progress, setProgress] = useState<StudentProgress[]>([])
    const [loading, setLoading] = useState(true)
    const [dataLoading, setDataLoading] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user || user.user_metadata?.role !== 'teacher') {
                setLoading(false)
                return
            }
            const result = await getMyClasses()
            const classList = (result.data || []) as ClassItem[]
            setClasses(classList)
            if (classList.length > 0) {
                setSelectedClassId(classList[0].id)
            }
            setLoading(false)
        }
        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!selectedClassId) return
        const fetchData = async () => {
            setDataLoading(true)
            const [actResult, progResult] = await Promise.all([
                getClassCodingActivity(selectedClassId),
                getStudentProgressByClass(selectedClassId),
            ])
            setActivity((actResult.data || []) as StudentActivity[])
            setProgress((progResult.data || []) as StudentProgress[])
            setDataLoading(false)
        }
        fetchData()
    }, [selectedClassId])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    // Summary stats
    const totalStudents = activity.length
    const totalCompiles = activity.reduce((sum, s) => sum + s.total, 0)
    const totalSuccess = activity.reduce((sum, s) => sum + s.success, 0)
    const avgRate = totalCompiles > 0 ? Math.round((totalSuccess / totalCompiles) * 100) : 0

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BarChart3 size={24} />
                        학습 현황
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                        반별 학생들의 코딩 활동과 학습 진도를 분석하세요
                    </p>
                </div>
            </div>

            {classes.length === 0 ? (
                <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <Users size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="text-lg font-medium mb-2">관리 중인 반이 없습니다</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        먼저 반을 생성하세요
                    </p>
                </div>
            ) : (
                <>
                    {/* Class Selector */}
                    <div className="mb-6 relative inline-block">
                        <select
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                            className="appearance-none px-4 py-2.5 pr-10 rounded-xl text-sm font-medium cursor-pointer"
                            style={{
                                background: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            {classes.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-secondary)' }} />
                    </div>

                    {dataLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,102,255,0.05))', border: '1px solid var(--color-border)' }}>
                                    <Users size={20} className="mb-2" style={{ color: '#3B82F6' }} />
                                    <p className="text-2xl font-bold">{totalStudents}</p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>학생 수</p>
                                </div>
                                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.05))', border: '1px solid var(--color-border)' }}>
                                    <Code2 size={20} className="mb-2" style={{ color: '#06B6D4' }} />
                                    <p className="text-2xl font-bold">{totalCompiles}</p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>주간 컴파일</p>
                                </div>
                                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))', border: '1px solid var(--color-border)' }}>
                                    <TrendingUp size={20} className="mb-2" style={{ color: '#22C55E' }} />
                                    <p className="text-2xl font-bold">{avgRate}%</p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>평균 성공률</p>
                                </div>
                                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))', border: '1px solid var(--color-border)' }}>
                                    <BookOpen size={20} className="mb-2" style={{ color: '#8B5CF6' }} />
                                    <p className="text-2xl font-bold">
                                        {progress.length > 0
                                            ? Math.round(progress.reduce((s, p) => s + p.rate, 0) / progress.length)
                                            : 0}%
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>평균 진도율</p>
                                </div>
                            </div>

                            {/* Coding Activity Table */}
                            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <h2 className="font-bold flex items-center gap-2">
                                        <Code2 size={18} style={{ color: 'var(--color-accent-cyan)' }} />
                                        코딩 활동 (최근 7일)
                                    </h2>
                                </div>
                                {activity.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>학생이 없습니다</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <th className="text-left px-6 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>학생</th>
                                                    <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>총 컴파일</th>
                                                    <th className="text-center px-4 py-3 font-medium" style={{ color: '#22C55E' }}>성공</th>
                                                    <th className="text-center px-4 py-3 font-medium" style={{ color: '#EF4444' }}>실패</th>
                                                    <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>성공률</th>
                                                    <th className="text-right px-6 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activity.map(student => {
                                                    const rate = student.total > 0 ? Math.round((student.success / student.total) * 100) : 0
                                                    return (
                                                        <tr key={student.student_id} style={{ borderBottom: '1px solid var(--color-border)' }} className="hover:bg-white/[0.02]">
                                                            <td className="px-6 py-3">
                                                                <p className="font-medium">{student.name}</p>
                                                                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{student.email}</p>
                                                            </td>
                                                            <td className="text-center px-4 py-3 font-mono">{student.total}</td>
                                                            <td className="text-center px-4 py-3 font-mono" style={{ color: '#22C55E' }}>{student.success}</td>
                                                            <td className="text-center px-4 py-3 font-mono" style={{ color: '#EF4444' }}>{student.error}</td>
                                                            <td className="text-center px-4 py-3">
                                                                <span className="font-bold" style={{ color: rate >= 70 ? '#22C55E' : rate >= 40 ? '#F59E0B' : '#EF4444' }}>
                                                                    {rate}%
                                                                </span>
                                                            </td>
                                                            <td className="text-right px-6 py-3">
                                                                <Link
                                                                    href={`/dashboard/stats/${student.student_id}`}
                                                                    className="text-xs px-3 py-1 rounded-lg inline-flex items-center gap-1"
                                                                    style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--color-primary)' }}
                                                                >
                                                                    상세 <ChevronRight size={12} />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Learning Progress Table */}
                            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                                <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <h2 className="font-bold flex items-center gap-2">
                                        <BookOpen size={18} style={{ color: '#8B5CF6' }} />
                                        교재 학습 진도
                                    </h2>
                                </div>
                                {progress.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>학생이 없습니다</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <th className="text-left px-6 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>학생</th>
                                                    <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>완료</th>
                                                    <th className="text-center px-4 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>전체</th>
                                                    <th className="px-6 py-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>진도율</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {progress.map(student => (
                                                    <tr key={student.student_id} style={{ borderBottom: '1px solid var(--color-border)' }} className="hover:bg-white/[0.02]">
                                                        <td className="px-6 py-3 font-medium">{student.name}</td>
                                                        <td className="text-center px-4 py-3 font-mono" style={{ color: '#22C55E' }}>{student.completed}</td>
                                                        <td className="text-center px-4 py-3 font-mono">{student.total}</td>
                                                        <td className="px-6 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                    <div
                                                                        className="h-full rounded-full"
                                                                        style={{
                                                                            width: `${student.rate}%`,
                                                                            background: student.rate >= 70 ? '#22C55E' : student.rate >= 40 ? '#F59E0B' : '#EF4444',
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-xs font-bold w-10 text-right" style={{
                                                                    color: student.rate >= 70 ? '#22C55E' : student.rate >= 40 ? '#F59E0B' : '#EF4444',
                                                                }}>{student.rate}%</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
