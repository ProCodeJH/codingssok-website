'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createSession } from '@/lib/actions/sessions'
import { addMember, removeMember, searchStudentByEmail } from '@/lib/actions/members'
import Link from 'next/link'
import {
    ArrowLeft,
    FileText,
    Users,
    Plus,
    Calendar,
    Loader2,
    Search,
    UserPlus,
    Trash2,
    X,
} from 'lucide-react'

interface SessionLog {
    id: string
    class_id: string
    date: string
    content: string
    teacher_id: string
    created_at: string
}

interface MemberData {
    student_id: string
    joined_at: string
    profiles: {
        id: string
        name: string
        email: string
    } | null
}

interface SearchResult {
    id: string
    name: string
    email: string
}

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: classId } = use(params)
    const [className, setClassName] = useState('')
    const [schedule, setSchedule] = useState<string | null>(null)
    const [role, setRole] = useState<string>('student')
    const [activeTab, setActiveTab] = useState<'sessions' | 'students'>('sessions')

    // Session state
    const [sessions, setSessions] = useState<SessionLog[]>([])
    const [showSessionForm, setShowSessionForm] = useState(false)
    const [savingSession, setSavingSession] = useState(false)

    // Members state
    const [members, setMembers] = useState<MemberData[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [searching, setSearching] = useState(false)
    const [addingId, setAddingId] = useState<string | null>(null)
    const [removingId, setRemovingId] = useState<string | null>(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            setRole(user.user_metadata?.role || 'student')

            // Class info
            const { data: cls } = await supabase
                .from('classes')
                .select('*')
                .eq('id', classId)
                .single() as { data: { name: string; schedule: string | null } | null }
            if (cls) {
                setClassName(cls.name)
                setSchedule(cls.schedule)
            }

            // Sessions
            const { data: sessData } = await supabase
                .from('session_logs')
                .select('*')
                .eq('class_id', classId)
                .order('date', { ascending: false }) as unknown as { data: SessionLog[] | null }
            setSessions(sessData || [])

            // Members
            const { data: memData } = await supabase
                .from('class_members')
                .select('student_id, joined_at, profiles!class_members_student_id_fkey(id, name, email)')
                .eq('class_id', classId) as unknown as { data: MemberData[] | null }
            setMembers(memData || [])

            setLoading(false)
        }
        fetchData()
    }, [classId]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleCreateSession = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSavingSession(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const result = await createSession(classId, formData)
        if (result.error) {
            setError(result.error)
        } else {
            setShowSessionForm(false)
            // Refresh sessions
            const { data } = await supabase
                .from('session_logs')
                .select('*')
                .eq('class_id', classId)
                .order('date', { ascending: false }) as unknown as { data: SessionLog[] | null }
            setSessions(data || [])
        }
        setSavingSession(false)
    }

    const handleSearch = async () => {
        if (!searchQuery.trim()) return
        setSearching(true)
        const result = await searchStudentByEmail(searchQuery)
        setSearchResults((result.data as SearchResult[]) || [])
        setSearching(false)
    }

    const handleAddMember = async (studentId: string) => {
        setAddingId(studentId)
        const result = await addMember(classId, studentId)
        if (result.error) {
            setError(result.error)
        } else {
            setSearchResults([])
            setSearchQuery('')
            // Refresh members
            const { data } = await supabase
                .from('class_members')
                .select('student_id, joined_at, profiles!class_members_student_id_fkey(id, name, email)')
                .eq('class_id', classId) as unknown as { data: MemberData[] | null }
            setMembers(data || [])
        }
        setAddingId(null)
    }

    const handleRemoveMember = async (studentId: string) => {
        if (!confirm('이 학생을 반에서 제거하시겠습니까?')) return
        setRemovingId(studentId)
        const result = await removeMember(classId, studentId)
        if (result.error) {
            setError(result.error)
        } else {
            setMembers((prev) => prev.filter((m) => m.student_id !== studentId))
        }
        setRemovingId(null)
    }

    const tabs = [
        { id: 'sessions' as const, label: '수업 기록', icon: <FileText size={16} /> },
        { id: 'students' as const, label: '학생 목록', icon: <Users size={16} />, count: members.length },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/dashboard/classes"
                    className="inline-flex items-center gap-1 text-sm mb-3 hover:underline"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    <ArrowLeft size={16} />
                    반 목록
                </Link>
                <h1 className="text-2xl font-bold">{className}</h1>
                {schedule && (
                    <p className="text-sm mt-1 flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                        <Calendar size={14} />
                        {schedule}
                    </p>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center"
                        style={{
                            background: activeTab === tab.id ? 'rgba(0,102,255,0.15)' : 'transparent',
                            color: activeTab === tab.id ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                        {tab.count !== undefined && (
                            <span
                                className="text-xs px-1.5 py-0.5 rounded-full"
                                style={{ background: 'rgba(0,102,255,0.2)' }}
                            >
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {error && (
                <div className="p-3 rounded-lg text-sm mb-4" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    {error}
                    <button onClick={() => setError('')} className="ml-2"><X size={14} /></button>
                </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
                <div className="space-y-4">
                    {role === 'teacher' && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowSessionForm(!showSessionForm)}
                                className="btn btn-primary text-sm"
                            >
                                <Plus size={16} />
                                수업 기록 추가
                            </button>
                        </div>
                    )}

                    {showSessionForm && (
                        <form
                            onSubmit={handleCreateSession}
                            className="rounded-xl p-5 space-y-4"
                            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                        >
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                    수업 날짜 *
                                </label>
                                <input
                                    name="date"
                                    type="date"
                                    required
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-2.5 rounded-xl border bg-transparent text-white focus:outline-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                    수업 내용 *
                                </label>
                                <textarea
                                    name="content"
                                    required
                                    rows={4}
                                    placeholder="수업 내용을 입력하세요..."
                                    className="w-full px-4 py-2.5 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none resize-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setShowSessionForm(false)} className="btn btn-secondary text-sm">
                                    취소
                                </button>
                                <button type="submit" disabled={savingSession} className="btn btn-primary text-sm">
                                    {savingSession ? <Loader2 size={16} className="animate-spin" /> : '저장'}
                                </button>
                            </div>
                        </form>
                    )}

                    {sessions.length === 0 ? (
                        <div className="text-center py-16">
                            <FileText size={40} className="mx-auto mb-3" style={{ color: 'var(--color-text-secondary)' }} />
                            <p style={{ color: 'var(--color-text-secondary)' }}>아직 수업 기록이 없습니다</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="rounded-xl p-5"
                                    style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar size={14} style={{ color: 'var(--color-primary)' }} />
                                        <span className="text-sm font-medium" style={{ color: 'var(--color-primary-light)' }}>
                                            {new Date(session.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{session.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
                <div className="space-y-4">
                    {/* Search & Add (teacher only) */}
                    {role === 'teacher' && (
                        <div
                            className="rounded-xl p-4"
                            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                        >
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="학생 이메일로 검색..."
                                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border bg-transparent text-white placeholder:text-gray-500 text-sm focus:outline-none"
                                        style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                    />
                                </div>
                                <button onClick={handleSearch} disabled={searching} className="btn btn-primary text-sm px-4">
                                    {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                </button>
                            </div>

                            {/* Search Results */}
                            {searchResults.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {searchResults.map((student) => (
                                        <div
                                            key={student.id}
                                            className="flex items-center justify-between p-3 rounded-lg"
                                            style={{ background: 'rgba(255,255,255,0.03)' }}
                                        >
                                            <div>
                                                <p className="text-sm font-medium">{student.name}</p>
                                                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{student.email}</p>
                                            </div>
                                            <button
                                                onClick={() => handleAddMember(student.id)}
                                                disabled={addingId === student.id}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                                style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--color-primary)' }}
                                            >
                                                {addingId === student.id ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
                                                추가
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Members List */}
                    {members.length === 0 ? (
                        <div className="text-center py-16">
                            <Users size={40} className="mx-auto mb-3" style={{ color: 'var(--color-text-secondary)' }} />
                            <p style={{ color: 'var(--color-text-secondary)' }}>등록된 학생이 없습니다</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {members.map((member) => (
                                <div
                                    key={member.student_id}
                                    className="flex items-center justify-between p-4 rounded-xl"
                                    style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ background: 'var(--gradient-primary)' }}
                                        >
                                            {member.profiles?.name?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{member.profiles?.name || '—'}</p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                                {member.profiles?.email || '—'}
                                            </p>
                                        </div>
                                    </div>
                                    {role === 'teacher' && (
                                        <button
                                            onClick={() => handleRemoveMember(member.student_id)}
                                            disabled={removingId === member.student_id}
                                            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                            style={{ color: 'var(--color-accent-red)' }}
                                            title="학생 제거"
                                        >
                                            {removingId === member.student_id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
