'use server'

import { createClient } from '@/lib/supabase/server'

// ─── 학생 코딩 통계 조회 ──────────────────────────────
export async function getStudentStats(studentId: string, days: number = 30) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const since = new Date()
    since.setDate(since.getDate() - days)

    const { data, error } = await supabase
        .from('compiler_activities')
        .select('*')
        .eq('student_id', studentId)
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: true })

    if (error) return { error: error.message, data: null }

    // 일별 컴파일 수
    const dailyMap = new Map<string, { success: number; error: number }>()
    const errorMap = new Map<string, number>()
    let totalSuccess = 0
    let totalError = 0

    for (const row of (data || []) as { status: string; error_message: string | null; created_at: string }[]) {
        const dateKey = new Date(row.created_at).toISOString().split('T')[0]
        const entry = dailyMap.get(dateKey) || { success: 0, error: 0 }
        if (row.status === 'success') {
            entry.success++
            totalSuccess++
        } else {
            entry.error++
            totalError++
            if (row.error_message) {
                errorMap.set(row.error_message, (errorMap.get(row.error_message) || 0) + 1)
            }
        }
        dailyMap.set(dateKey, entry)
    }

    // 일별 데이터 배열
    const dailyStats = Array.from(dailyMap.entries())
        .map(([date, counts]) => ({ date, ...counts }))
        .sort((a, b) => a.date.localeCompare(b.date))

    // 에러 Top 5
    const topErrors = Array.from(errorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([message, count]) => ({ message, count }))

    return {
        error: null,
        data: {
            totalSuccess,
            totalError,
            total: totalSuccess + totalError,
            dailyStats,
            topErrors,
        },
    }
}

// ─── 선생님: 반별 코딩 활동 요약 ──────────────────────
export async function getClassCodingActivity(classId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    // 반 멤버 가져오기
    const { data: members } = await supabase
        .from('class_members')
        .select('student_id, profiles!class_members_student_id_fkey(name, email)')
        .eq('class_id', classId)

    if (!members || members.length === 0) return { data: [], error: null }

    const studentIds = members.map((m: { student_id: string }) => m.student_id)

    // 최근 7일 활동
    const since = new Date()
    since.setDate(since.getDate() - 7)

    const { data: activities } = await supabase
        .from('compiler_activities')
        .select('student_id, status')
        .in('student_id', studentIds)
        .gte('created_at', since.toISOString())

    // 학생별 집계
    const activityMap = new Map<string, { success: number; error: number }>()
    for (const act of (activities || []) as { student_id: string; status: string }[]) {
        const entry = activityMap.get(act.student_id) || { success: 0, error: 0 }
        if (act.status === 'success') entry.success++
        else entry.error++
        activityMap.set(act.student_id, entry)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (members as any[]).map((m) => {
        const activity = activityMap.get(m.student_id) || { success: 0, error: 0 }
        const profile = Array.isArray(m.profiles) ? m.profiles[0] : m.profiles
        return {
            student_id: m.student_id,
            name: profile?.name || '—',
            email: profile?.email || '—',
            ...activity,
            total: activity.success + activity.error,
        }
    })

    return { data: result, error: null }
}
