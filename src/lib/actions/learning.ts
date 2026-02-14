'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ─── 교재 목록 (7트랙) ──────────────────────────────────
export const learningTracks = [
    { id: 'python-entry', name: '파이썬 입문', icon: '🐍', color: '#3B82F6', totalLessons: 20 },
    { id: 'c-basic', name: 'C언어 기초', icon: '⚙️', color: '#10B981', totalLessons: 25 },
    { id: 'algo-think', name: '알고리즘 사고', icon: '🧠', color: '#8B5CF6', totalLessons: 15 },
    { id: 'entry-coding', name: '엔트리 코딩', icon: '🎮', color: '#F59E0B', totalLessons: 18 },
    { id: 'arduino', name: '아두이노', icon: '🔌', color: '#EF4444', totalLessons: 12 },
    { id: 'web-basic', name: '웹 기초', icon: '🌐', color: '#06B6D4', totalLessons: 16 },
    { id: 'cert-prep', name: '자격증 대비', icon: '📜', color: '#EC4899', totalLessons: 30 },
]

// ─── 학생 진도 조회 ─────────────────────────────────────
export async function getProgressList(studentId?: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const targetId = studentId || user.id

    const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('student_id', targetId)
        .order('updated_at', { ascending: false })

    if (error) return { error: error.message, data: null }

    return { data, error: null }
}

// ─── 진도 업데이트 (UPSERT) ────────────────────────────
export async function updateProgress(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const contentId = formData.get('content_id') as string
    const trackId = formData.get('track_id') as string
    const progress = parseInt(formData.get('progress') as string || '0', 10)
    const completed = formData.get('completed') === 'true'

    // Upsert: 있으면 update, 없으면 insert
    const { data: existing } = await supabase
        .from('learning_progress')
        .select('id')
        .eq('student_id', user.id)
        .eq('content_id', contentId)
        .maybeSingle()

    if (existing) {
        const { error } = await supabase
            .from('learning_progress')
            .update({
                progress: Math.min(progress, 100),
                completed,
                updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
        if (error) return { error: error.message }
    } else {
        const { error } = await supabase
            .from('learning_progress')
            .insert({
                student_id: user.id,
                content_id: contentId,
                track_id: trackId,
                progress: Math.min(progress, 100),
                completed,
            })
        if (error) return { error: error.message }
    }

    revalidatePath('/dashboard/learn')
    return { error: null }
}

// ─── 선생님: 학생별 진도 조회 ──────────────────────────
export async function getStudentProgressByClass(classId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const { data: members } = await supabase
        .from('class_members')
        .select('student_id, profiles!class_members_student_id_fkey(name, email)')
        .eq('class_id', classId)

    if (!members || members.length === 0) return { data: [], error: null }

    const studentIds = (members as { student_id: string }[]).map(m => m.student_id)

    const { data: progressData } = await supabase
        .from('learning_progress')
        .select('*')
        .in('student_id', studentIds)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (members as any[]).map(m => {
        const profile = Array.isArray(m.profiles) ? m.profiles[0] : m.profiles
        const studentProgress = (progressData || []).filter(
            (p: { student_id: string }) => p.student_id === m.student_id
        )
        const completed = studentProgress.filter((p: { completed: boolean }) => p.completed).length
        const total = studentProgress.length

        return {
            student_id: m.student_id,
            name: profile?.name || '—',
            email: profile?.email || '—',
            completed,
            total,
            rate: total > 0 ? Math.round((completed / total) * 100) : 0,
        }
    })

    return { data: result, error: null }
}
