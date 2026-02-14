'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createHomework } from '@/lib/actions/homework'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    Loader2,
    BookOpen,
} from 'lucide-react'

interface ClassOption {
    id: string
    name: string
}

export default function NewHomeworkPage() {
    const [classes, setClasses] = useState<ClassOption[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchClasses = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            const { data } = await supabase
                .from('classes')
                .select('id, name')
                .eq('teacher_id', user.id)
                .order('name')
            setClasses((data as ClassOption[]) || [])
            setLoading(false)
        }
        fetchClasses()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const result = await createHomework(formData)
        if (result.error) {
            setError(result.error)
            setSaving(false)
        } else {
            router.push('/dashboard/homework')
        }
    }

    // 기본 마감일: 7일 후
    const defaultDue = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link
                href="/dashboard/homework"
                className="inline-flex items-center gap-1 text-sm mb-4 hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
            >
                <ArrowLeft size={16} />
                숙제 목록
            </Link>
            <h1 className="text-2xl font-bold mb-6">숙제 출제</h1>

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 space-y-5"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
                {/* 반 선택 */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        반 선택 *
                    </label>
                    {classes.length === 0 ? (
                        <div className="flex items-center gap-2 p-3 rounded-xl text-sm" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>
                            <BookOpen size={16} />
                            먼저 반을 생성해주세요
                        </div>
                    ) : (
                        <select
                            name="class_id"
                            required
                            className="w-full px-4 py-3 rounded-xl border bg-transparent text-white focus:outline-none"
                            style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                        >
                            <option value="" style={{ background: '#1a1a2e' }}>반을 선택하세요</option>
                            {classes.map((c) => (
                                <option key={c.id} value={c.id} style={{ background: '#1a1a2e' }}>{c.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                {/* 제목 */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        제목 *
                    </label>
                    <input
                        name="title"
                        required
                        placeholder="예: 변수와 자료형 연습문제"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                        style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                    />
                </div>

                {/* 설명 */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        설명
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        placeholder="숙제 설명을 입력하세요..."
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none resize-none"
                        style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                    />
                </div>

                {/* 마감일 & 만점 */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                            마감일 *
                        </label>
                        <input
                            name="due_date"
                            type="datetime-local"
                            required
                            defaultValue={defaultDue}
                            className="w-full px-4 py-3 rounded-xl border bg-transparent text-white focus:outline-none"
                            style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                            만점
                        </label>
                        <input
                            name="max_score"
                            type="number"
                            min={1}
                            defaultValue={100}
                            className="w-full px-4 py-3 rounded-xl border bg-transparent text-white focus:outline-none"
                            style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                        {error}
                    </div>
                )}

                <button type="submit" disabled={saving || classes.length === 0} className="btn btn-primary w-full justify-center">
                    {saving ? <Loader2 size={18} className="animate-spin" /> : '숙제 출제'}
                </button>
            </form>
        </div>
    )
}
