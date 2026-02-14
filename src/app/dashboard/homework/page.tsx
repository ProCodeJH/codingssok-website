'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
    ClipboardList,
    Plus,
    Clock,
    CheckCircle2,
    AlertCircle,
    FileText,
    Loader2,
    ChevronRight,
} from 'lucide-react'

interface HomeworkItem {
    id: string
    class_id: string
    title: string
    description: string | null
    due_date: string
    max_score: number
    status: string
    created_at: string
    classes: { name: string } | null
    submissions?: { count: number }[] | null
    my_submission?: {
        score: number | null
        submitted_at: string
        graded_at: string | null
    } | null
}

type TabFilter = 'all' | 'pending' | 'submitted' | 'graded'

export default function HomeworkListPage() {
    const [homework, setHomework] = useState<HomeworkItem[]>([])
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<string>('student')
    const [activeTab, setActiveTab] = useState<TabFilter>('all')
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const userRole = user.user_metadata?.role || 'student'
            setRole(userRole)

            if (userRole === 'teacher') {
                const { data } = await supabase
                    .from('homework')
                    .select('*, classes(name), submissions(count)')
                    .eq('created_by', user.id)
                    .order('created_at', { ascending: false })
                setHomework((data as HomeworkItem[]) || [])
            } else {
                // student
                const { data: memberData } = await supabase
                    .from('class_members')
                    .select('class_id')
                    .eq('student_id', user.id)
                const classIds = (memberData || []).map((m: { class_id: string }) => m.class_id)

                if (classIds.length > 0) {
                    const { data } = await supabase
                        .from('homework')
                        .select('*, classes(name)')
                        .in('class_id', classIds)
                        .in('status', ['active', 'closed'])
                        .order('due_date', { ascending: true })

                    const { data: submissions } = await supabase
                        .from('submissions')
                        .select('homework_id, score, submitted_at, graded_at')
                        .eq('student_id', user.id)

                    const subMap = new Map(
                        (submissions || []).map((s: { homework_id: string }) => [s.homework_id, s])
                    )

                    const enriched = (data || []).map((hw: HomeworkItem) => ({
                        ...hw,
                        my_submission: subMap.get(hw.id) || null,
                    }))
                    setHomework(enriched as HomeworkItem[])
                }
            }
            setLoading(false)
        }
        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getDday = (dueDate: string) => {
        const now = new Date()
        const due = new Date(dueDate)
        const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        if (diff < 0) return { text: `D+${Math.abs(diff)}`, color: '#EF4444', expired: true }
        if (diff === 0) return { text: 'D-Day', color: '#F59E0B', expired: false }
        if (diff <= 3) return { text: `D-${diff}`, color: '#F59E0B', expired: false }
        return { text: `D-${diff}`, color: '#22C55E', expired: false }
    }

    const getSubmissionStatus = (hw: HomeworkItem) => {
        if (!hw.my_submission) return 'pending'
        if (hw.my_submission.graded_at) return 'graded'
        return 'submitted'
    }

    const filteredHomework = homework.filter((hw) => {
        if (role === 'teacher') return true
        if (activeTab === 'all') return true
        return getSubmissionStatus(hw) === activeTab
    })

    const studentTabs: { id: TabFilter; label: string; icon: React.ReactNode }[] = [
        { id: 'all', label: '전체', icon: <ClipboardList size={14} /> },
        { id: 'pending', label: '미제출', icon: <AlertCircle size={14} /> },
        { id: 'submitted', label: '제출', icon: <FileText size={14} /> },
        { id: 'graded', label: '채점', icon: <CheckCircle2 size={14} /> },
    ]

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">숙제</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                        {role === 'teacher' ? '숙제를 출제하고 채점하세요' : '숙제를 확인하고 제출하세요'}
                    </p>
                </div>
                {role === 'teacher' && (
                    <Link href="/dashboard/homework/new" className="btn btn-primary text-sm">
                        <Plus size={18} />
                        숙제 출제
                    </Link>
                )}
            </div>

            {/* Tabs (students only) */}
            {role !== 'teacher' && (
                <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {studentTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all flex-1 justify-center"
                            style={{
                                background: activeTab === tab.id ? 'rgba(0,102,255,0.15)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                </div>
            ) : filteredHomework.length === 0 ? (
                <div className="text-center py-20">
                    <ClipboardList size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="text-lg font-medium mb-1">숙제가 없습니다</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {role === 'teacher' ? '"숙제 출제" 버튼으로 새 숙제를 만들어보세요' : '아직 할당된 숙제가 없습니다'}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredHomework.map((hw) => {
                        const dday = getDday(hw.due_date)
                        const status = role !== 'teacher' ? getSubmissionStatus(hw) : null
                        const subCount = hw.submissions?.[0]?.count ?? 0

                        return (
                            <Link
                                key={hw.id}
                                href={`/dashboard/homework/${hw.id}`}
                                className="group flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold truncate">{hw.title}</h3>
                                        <span
                                            className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                                            style={{ background: `${dday.color}20`, color: dday.color }}
                                        >
                                            {dday.text}
                                        </span>
                                        {status === 'submitted' && (
                                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(59,130,246,0.15)', color: '#3B82F6' }}>
                                                제출됨
                                            </span>
                                        )}
                                        {status === 'graded' && (
                                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                                                채점 {hw.my_submission?.score}/{hw.max_score}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                        <span>{(hw.classes as { name: string } | null)?.name || '—'}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(hw.due_date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} 마감
                                        </span>
                                        {role === 'teacher' && (
                                            <span>{subCount}명 제출</span>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight
                                    size={18}
                                    className="ml-3 group-hover:translate-x-1 transition-transform"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                />
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
