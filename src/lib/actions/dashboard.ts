'use server'

import { createClient } from '@/lib/supabase/server'

export async function getStudentDashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // 진행 중인 수업 수
    const { count: classCount } = await supabase
        .from('class_members')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', user.id)

    // 미제출 숙제: 소속 반의 active 숙제 중 제출 안 한 것
    const { data: memberData } = await supabase
        .from('class_members')
        .select('class_id')
        .eq('student_id', user.id)
    const classIds = (memberData || []).map((m: { class_id: string }) => m.class_id)

    let pendingHomework = 0
    if (classIds.length > 0) {
        const { data: hwList } = await supabase
            .from('homework')
            .select('id')
            .in('class_id', classIds)
            .eq('status', 'active')
            .gte('due_date', new Date().toISOString())

        if (hwList && hwList.length > 0) {
            const hwIds = hwList.map((h: { id: string }) => h.id)
            const { data: submissions } = await supabase
                .from('submissions')
                .select('homework_id')
                .eq('student_id', user.id)
                .in('homework_id', hwIds)
            const submittedIds = new Set((submissions || []).map((s: { homework_id: string }) => s.homework_id))
            pendingHomework = hwIds.filter(id => !submittedIds.has(id)).length
        }
    }

    // 이번 주 코딩 활동
    const since = new Date()
    since.setDate(since.getDate() - 7)
    const { count: codingCount } = await supabase
        .from('compiler_activities')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', user.id)
        .gte('created_at', since.toISOString())

    // 학습 진도 (완료 / 전체)
    const { data: progress } = await supabase
        .from('learning_progress')
        .select('completed')
        .eq('student_id', user.id)
    const completedLessons = (progress || []).filter((p: { completed: boolean }) => p.completed).length
    const totalLessons = (progress || []).length

    return {
        classCount: classCount || 0,
        pendingHomework,
        codingCount: codingCount || 0,
        progressText: totalLessons > 0 ? `${completedLessons}/${totalLessons}` : '0',
    }
}

export async function getTeacherDashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // 총 학생 수 (내 반 소속)
    const { data: myClasses } = await supabase
        .from('classes')
        .select('id')
        .eq('teacher_id', user.id)
    const classIds = (myClasses || []).map((c: { id: string }) => c.id)

    let studentCount = 0
    if (classIds.length > 0) {
        const { count } = await supabase
            .from('class_members')
            .select('*', { count: 'exact', head: true })
            .in('class_id', classIds)
        studentCount = count || 0
    }

    // 오늘 수업 (schedule에 오늘 요일 포함)
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    const today = dayNames[new Date().getDay()]
    const { data: allClasses } = await supabase
        .from('classes')
        .select('schedule')
        .eq('teacher_id', user.id)
    const todayClasses = (allClasses || []).filter(
        (c: { schedule: string | null }) => c.schedule?.includes(today)
    ).length

    // 채점 대기
    let pendingGrading = 0
    if (classIds.length > 0) {
        const { data: hwList } = await supabase
            .from('homework')
            .select('id')
            .eq('created_by', user.id)
        const hwIds = (hwList || []).map((h: { id: string }) => h.id)
        if (hwIds.length > 0) {
            const { count } = await supabase
                .from('submissions')
                .select('*', { count: 'exact', head: true })
                .in('homework_id', hwIds)
                .is('graded_at', null)
            pendingGrading = count || 0
        }
    }

    return {
        studentCount,
        todayClasses,
        pendingGrading,
    }
}

export async function getParentDashboardStats(childId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // 수업 수
    const { count: classCount } = await supabase
        .from('class_members')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', childId)

    // 숙제: 소속 반의 숙제 중 제출한 비율
    const { data: memberData } = await supabase
        .from('class_members')
        .select('class_id')
        .eq('student_id', childId)
    const classIds = (memberData || []).map((m: { class_id: string }) => m.class_id)

    let homeworkSubmitted = 0
    let homeworkTotal = 0
    if (classIds.length > 0) {
        const { data: hwList } = await supabase
            .from('homework')
            .select('id')
            .in('class_id', classIds)
        homeworkTotal = (hwList || []).length
        if (homeworkTotal > 0) {
            const hwIds = hwList!.map((h: { id: string }) => h.id)
            const { count } = await supabase
                .from('submissions')
                .select('*', { count: 'exact', head: true })
                .eq('student_id', childId)
                .in('homework_id', hwIds)
            homeworkSubmitted = count || 0
        }
    }

    // 코딩 활동 (최근 7일)
    const since = new Date()
    since.setDate(since.getDate() - 7)
    const { data: activities } = await supabase
        .from('compiler_activities')
        .select('status')
        .eq('student_id', childId)
        .gte('created_at', since.toISOString())
    const codingTotal = (activities || []).length
    const codingSuccess = (activities || []).filter((a: { status: string }) => a.status === 'success').length

    // 교재 진도
    const { data: progress } = await supabase
        .from('learning_progress')
        .select('completed')
        .eq('student_id', childId)
    const completedLessons = (progress || []).filter((p: { completed: boolean }) => p.completed).length
    const totalLessons = (progress || []).length

    return {
        classCount: classCount || 0,
        homeworkText: homeworkTotal > 0 ? `${homeworkSubmitted}/${homeworkTotal}` : '0',
        codingText: codingTotal > 0 ? `${codingTotal}회` : '0회',
        codingRate: codingTotal > 0 ? Math.round((codingSuccess / codingTotal) * 100) : 0,
        progressText: totalLessons > 0 ? `${completedLessons}/${totalLessons}` : '0',
    }
}
