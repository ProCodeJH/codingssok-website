'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import { submitHomework, gradeSubmission } from '@/lib/actions/homework'
import Link from 'next/link'
import {
    ArrowLeft,
    Calendar,
    Loader2,
    Upload,
    FileText,
    CheckCircle2,
    User,
    Star,
    X,
} from 'lucide-react'

interface HomeworkData {
    id: string
    title: string
    description: string | null
    due_date: string
    max_score: number
    status: string
    classes: { name: string } | null
}

interface SubmissionData {
    id: string
    student_id: string
    content: string | null
    file_url: string | null
    score: number | null
    feedback: string | null
    submitted_at: string
    graded_at: string | null
    profiles?: { name: string; email: string } | null
}

export default function HomeworkDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: homeworkId } = use(params)
    const [hw, setHw] = useState<HomeworkData | null>(null)
    const [role, setRole] = useState<string>('student')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Student
    const [mySubmission, setMySubmission] = useState<SubmissionData | null>(null)
    const [submitting, setSubmitting] = useState(false)

    // Teacher
    const [submissions, setSubmissions] = useState<SubmissionData[]>([])
    const [gradingId, setGradingId] = useState<string | null>(null)
    const [savingGrade, setSavingGrade] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            const userRole = user.user_metadata?.role || 'student'
            setRole(userRole)

            // 숙제 정보
            const { data: hwData } = await supabase
                .from('homework')
                .select('*, classes(name)')
                .eq('id', homeworkId)
                .single()
            setHw(hwData as HomeworkData)

            if (userRole === 'teacher') {
                const { data: subs } = await supabase
                    .from('submissions')
                    .select('*, profiles!submissions_student_id_fkey(name, email)')
                    .eq('homework_id', homeworkId)
                    .order('submitted_at', { ascending: true })
                setSubmissions((subs as SubmissionData[]) || [])
            } else {
                const { data: mySub } = await supabase
                    .from('submissions')
                    .select('*')
                    .eq('homework_id', homeworkId)
                    .eq('student_id', user.id)
                    .maybeSingle()
                setMySubmission(mySub as SubmissionData | null)
            }
            setLoading(false)
        }
        fetch()
    }, [homeworkId]) // eslint-disable-line react-hooks/exhaustive-deps

    const isExpired = hw ? new Date(hw.due_date) < new Date() : false

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')
        setSuccess('')
        const formData = new FormData(e.currentTarget)
        const result = await submitHomework(homeworkId, formData)
        if (result.error) {
            setError(result.error)
        } else {
            setSuccess('숙제가 제출되었습니다!')
            // refresh
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: mySub } = await supabase
                    .from('submissions')
                    .select('*')
                    .eq('homework_id', homeworkId)
                    .eq('student_id', user.id)
                    .maybeSingle()
                setMySubmission(mySub as SubmissionData | null)
            }
        }
        setSubmitting(false)
    }

    const handleGrade = async (e: React.FormEvent<HTMLFormElement>, subId: string) => {
        e.preventDefault()
        setSavingGrade(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const result = await gradeSubmission(subId, formData)
        if (result.error) {
            setError(result.error)
        } else {
            setGradingId(null)
            // refresh
            const { data: subs } = await supabase
                .from('submissions')
                .select('*, profiles!submissions_student_id_fkey(name, email)')
                .eq('homework_id', homeworkId)
                .order('submitted_at', { ascending: true })
            setSubmissions((subs as SubmissionData[]) || [])
        }
        setSavingGrade(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    if (!hw) return <div className="text-center py-20">숙제를 찾을 수 없습니다.</div>

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <Link
                href="/dashboard/homework"
                className="inline-flex items-center gap-1 text-sm mb-3 hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
            >
                <ArrowLeft size={16} />
                숙제 목록
            </Link>

            <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h1 className="text-2xl font-bold mb-2">{hw.title}</h1>
                <div className="flex items-center gap-4 text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>{(hw.classes as { name: string } | null)?.name}</span>
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(hw.due_date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="flex items-center gap-1">
                        <Star size={14} />
                        {hw.max_score}점
                    </span>
                </div>
                {hw.description && (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-text-secondary)' }}>
                        {hw.description}
                    </p>
                )}
                {isExpired && (
                    <div className="mt-3 p-2 rounded-lg text-xs font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                        마감되었습니다
                    </div>
                )}
            </div>

            {error && (
                <div className="p-3 rounded-lg text-sm mb-4" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    {error}
                    <button onClick={() => setError('')} className="ml-2"><X size={14} /></button>
                </div>
            )}
            {success && (
                <div className="p-3 rounded-lg text-sm mb-4" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <CheckCircle2 size={14} className="inline mr-1" />
                    {success}
                </div>
            )}

            {/* ─── Student View ─── */}
            {role !== 'teacher' && (
                <div>
                    {mySubmission ? (
                        <div className="rounded-2xl p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <CheckCircle2 size={20} style={{ color: '#22C55E' }} />
                                내 제출
                            </h2>
                            {mySubmission.content && (
                                <div className="mb-3">
                                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>내용</p>
                                    <p className="text-sm whitespace-pre-wrap p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>{mySubmission.content}</p>
                                </div>
                            )}
                            {mySubmission.file_url && (
                                <div className="mb-3">
                                    <a href={mySubmission.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm hover:underline" style={{ color: 'var(--color-primary)' }}>
                                        <FileText size={14} />
                                        첨부파일 보기
                                    </a>
                                </div>
                            )}
                            {mySubmission.graded_at && (
                                <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                                    <p className="text-sm font-bold mb-1" style={{ color: '#22C55E' }}>
                                        점수: {mySubmission.score}/{hw.max_score}
                                    </p>
                                    {mySubmission.feedback && (
                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{mySubmission.feedback}</p>
                                    )}
                                </div>
                            )}
                            <p className="text-xs mt-3" style={{ color: 'var(--color-text-secondary)' }}>
                                제출일: {new Date(mySubmission.submitted_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl p-6 space-y-4"
                            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                        >
                            <h2 className="text-lg font-bold">숙제 제출</h2>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>답안 내용</label>
                                <textarea
                                    name="content"
                                    rows={5}
                                    placeholder="답안을 입력하세요..."
                                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none resize-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                    파일 첨부 (10MB 이하)
                                </label>
                                <label
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer hover:bg-white/5 transition-colors"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                >
                                    <Upload size={16} style={{ color: 'var(--color-text-secondary)' }} />
                                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>파일 선택...</span>
                                    <input name="file" type="file" className="hidden" accept=".pdf,.jpg,.png,.zip,.c,.txt" />
                                </label>
                            </div>
                            <button type="submit" disabled={submitting || isExpired} className="btn btn-primary w-full justify-center">
                                {submitting ? <Loader2 size={18} className="animate-spin" /> : isExpired ? '마감됨' : '제출하기'}
                            </button>
                        </form>
                    )}
                </div>
            )}

            {/* ─── Teacher View ─── */}
            {role === 'teacher' && (
                <div>
                    <h2 className="text-lg font-bold mb-4">제출 현황 ({submissions.length}명)</h2>
                    {submissions.length === 0 ? (
                        <div className="text-center py-12 rounded-xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <User size={32} className="mx-auto mb-2" style={{ color: 'var(--color-text-secondary)' }} />
                            <p style={{ color: 'var(--color-text-secondary)' }}>아직 제출한 학생이 없습니다</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {submissions.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="rounded-xl p-5"
                                    style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--gradient-primary)' }}>
                                                {sub.profiles?.name?.charAt(0)?.toUpperCase() || '?'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{sub.profiles?.name}</p>
                                                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{sub.profiles?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {sub.graded_at ? (
                                                <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                                                    {sub.score}/{hw.max_score}
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => setGradingId(gradingId === sub.id ? null : sub.id)}
                                                    className="text-xs px-3 py-1 rounded-lg font-medium"
                                                    style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--color-primary)' }}
                                                >
                                                    채점하기
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {sub.content && (
                                        <p className="text-sm whitespace-pre-wrap mb-2 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>{sub.content}</p>
                                    )}
                                    {sub.file_url && (
                                        <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs mb-2 hover:underline" style={{ color: 'var(--color-primary)' }}>
                                            <FileText size={12} />
                                            첨부파일
                                        </a>
                                    )}

                                    {sub.graded_at && sub.feedback && (
                                        <div className="mt-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)' }}>
                                            💬 {sub.feedback}
                                        </div>
                                    )}

                                    {/* Grading Form */}
                                    {gradingId === sub.id && !sub.graded_at && (
                                        <form onSubmit={(e) => handleGrade(e, sub.id)} className="mt-3 p-4 rounded-xl space-y-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>점수 (/ {hw.max_score})</label>
                                                    <input
                                                        name="score"
                                                        type="number"
                                                        min={0}
                                                        max={hw.max_score}
                                                        required
                                                        className="w-full px-3 py-2 rounded-lg border bg-transparent text-white text-sm focus:outline-none"
                                                        style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>피드백</label>
                                                    <input
                                                        name="feedback"
                                                        placeholder="피드백을 입력하세요"
                                                        className="w-full px-3 py-2 rounded-lg border bg-transparent text-white placeholder:text-gray-500 text-sm focus:outline-none"
                                                        style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={() => setGradingId(null)} className="btn btn-secondary text-xs">취소</button>
                                                <button type="submit" disabled={savingGrade} className="btn btn-primary text-xs">
                                                    {savingGrade ? <Loader2 size={14} className="animate-spin" /> : '채점 완료'}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        {new Date(sub.submitted_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
