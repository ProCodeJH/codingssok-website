'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createClass } from '@/lib/actions/classes'
import Link from 'next/link'
import {
    Plus,
    BookOpen,
    Users,
    Calendar,
    ChevronRight,
    X,
    Loader2,
} from 'lucide-react'

interface ClassData {
    id: string
    name: string
    schedule: string | null
    teacher_id: string
    created_at: string
    class_members?: { count: number }[] | null
}

export default function ClassesPage() {
    const [classes, setClasses] = useState<ClassData[]>([])
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<string>('student')
    const [showModal, setShowModal] = useState(false)
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState('')
    const supabase = createClient()

    const fetchClasses = async () => {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const userRole = user.user_metadata?.role || 'student'
        setRole(userRole)

        if (userRole === 'teacher') {
            const { data } = await supabase
                .from('classes')
                .select('*, class_members(count)')
                .eq('teacher_id', user.id)
                .order('created_at', { ascending: false }) as unknown as { data: ClassData[] | null }
            setClasses(data || [])
        } else {
            const { data } = await supabase
                .from('class_members')
                .select('classes(*)')
                .eq('student_id', user.id) as unknown as { data: { classes: ClassData }[] | null }
            const result = data?.map((m) => m.classes).filter(Boolean) || []
            setClasses(result)
        }
        setLoading(false)
    }

    useEffect(() => { fetchClasses() }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCreating(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const result = await createClass(formData)
        if (result.error) {
            setError(result.error)
        } else {
            setShowModal(false)
            fetchClasses()
        }
        setCreating(false)
    }

    const getMemberCount = (cls: ClassData) => {
        if (cls.class_members && cls.class_members.length > 0) {
            return cls.class_members[0]?.count ?? 0
        }
        return 0
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        {role === 'teacher' ? '반 관리' : '내 수업'}
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                        {role === 'teacher' ? '수업 반을 관리하세요' : '소속된 반을 확인하세요'}
                    </p>
                </div>
                {role === 'teacher' && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary text-sm"
                    >
                        <Plus size={18} />
                        반 추가
                    </button>
                )}
            </div>

            {/* Classes Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                </div>
            ) : classes.length === 0 ? (
                <div className="text-center py-20">
                    <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="text-lg font-medium mb-1">
                        {role === 'teacher' ? '아직 생성된 반이 없습니다' : '소속된 반이 없습니다'}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {role === 'teacher' ? '"+반 추가" 버튼으로 새 반을 만들어보세요' : '선생님에게 반 등록을 요청하세요'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classes.map((cls) => (
                        <Link
                            key={cls.id}
                            href={`/dashboard/classes/${cls.id}`}
                            className="group block rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--color-primary)' }}
                                >
                                    <BookOpen size={20} />
                                </div>
                                <ChevronRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{cls.name}</h3>
                            <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                {cls.schedule && (
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {cls.schedule}
                                    </span>
                                )}
                                {role === 'teacher' && (
                                    <span className="flex items-center gap-1">
                                        <Users size={14} />
                                        {getMemberCount(cls)}명
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Create Class Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl p-6"
                        style={{
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold">새 반 만들기</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-white/5">
                                <X size={20} style={{ color: 'var(--color-text-secondary)' }} />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                    반 이름 *
                                </label>
                                <input
                                    name="name"
                                    required
                                    placeholder="예: 초등반 A"
                                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                    수업 일정
                                </label>
                                <input
                                    name="schedule"
                                    placeholder="예: 매주 화/목 16:00~18:00"
                                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                            {error && (
                                <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                                    {error}
                                </div>
                            )}
                            <button type="submit" disabled={creating} className="btn btn-primary w-full justify-center">
                                {creating ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <>
                                        <Plus size={18} />
                                        반 생성
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
