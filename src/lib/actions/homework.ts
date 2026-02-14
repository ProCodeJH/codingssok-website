'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ─── 숙제 목록 ─────────────────────────────────────────
export async function getHomeworkList() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const role = user.user_metadata?.role || 'student'

    if (role === 'teacher') {
        // 선생님: 자기가 출제한 숙제
        const { data, error } = await supabase
            .from('homework')
            .select('*, classes(name), submissions(count)')
            .eq('created_by', user.id)
            .order('created_at', { ascending: false })
        return { data, error: error?.message || null }
    } else {
        // 학생: 소속 반의 숙제
        const { data: memberData } = await supabase
            .from('class_members')
            .select('class_id')
            .eq('student_id', user.id)

        const classIds = (memberData || []).map((m: { class_id: string }) => m.class_id)
        if (classIds.length === 0) return { data: [], error: null }

        const { data, error } = await supabase
            .from('homework')
            .select('*, classes(name)')
            .in('class_id', classIds)
            .in('status', ['active', 'closed'])
            .order('due_date', { ascending: true })

        // 학생의 제출 상태도 가져오기
        const { data: submissions } = await supabase
            .from('submissions')
            .select('homework_id, score, submitted_at, graded_at')
            .eq('student_id', user.id)

        const submissionMap = new Map(
            (submissions || []).map((s: { homework_id: string; score: number | null; submitted_at: string; graded_at: string | null }) => [s.homework_id, s])
        )

        const enriched = (data || []).map((hw: { id: string }) => ({
            ...hw,
            my_submission: submissionMap.get(hw.id) || null,
        }))

        return { data: enriched, error: error?.message || null }
    }
}

// ─── 숙제 상세 ─────────────────────────────────────────
export async function getHomeworkById(homeworkId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null, submissions: null, mySubmission: null }

    const { data, error } = await supabase
        .from('homework')
        .select('*, classes(name)')
        .eq('id', homeworkId)
        .single()

    if (error) return { error: error.message, data: null, submissions: null, mySubmission: null }

    const role = user.user_metadata?.role || 'student'

    if (role === 'teacher') {
        // 선생님: 모든 제출물 가져오기
        const { data: subs } = await supabase
            .from('submissions')
            .select('*, profiles!submissions_student_id_fkey(name, email)')
            .eq('homework_id', homeworkId)
            .order('submitted_at', { ascending: true })
        return { data, submissions: subs, mySubmission: null, error: null }
    } else {
        // 학생: 내 제출물만
        const { data: mySub } = await supabase
            .from('submissions')
            .select('*')
            .eq('homework_id', homeworkId)
            .eq('student_id', user.id)
            .maybeSingle()
        return { data, submissions: null, mySubmission: mySub, error: null }
    }
}

// ─── 숙제 출제 (선생님) ─────────────────────────────────
export async function createHomework(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const classId = formData.get('class_id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null
    const dueDate = formData.get('due_date') as string
    const maxScore = parseInt(formData.get('max_score') as string || '100', 10)

    if (!classId || !title?.trim() || !dueDate) {
        return { error: '반, 제목, 마감일을 입력하세요.' }
    }

    const { error } = await supabase
        .from('homework')
        .insert({
            class_id: classId,
            title: title.trim(),
            description: description?.trim() || null,
            due_date: dueDate,
            max_score: maxScore,
            created_by: user.id,
            status: 'active',
        })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/homework')
    return { error: null }
}

// ─── 숙제 제출 (학생) ────────────────────────────────────
export async function submitHomework(homeworkId: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const content = formData.get('content') as string | null
    const file = formData.get('file') as File | null

    let fileUrl: string | null = null

    // 파일 업로드
    if (file && file.size > 0) {
        if (file.size > 10 * 1024 * 1024) {
            return { error: '파일 크기는 10MB 이하여야 합니다.' }
        }

        const ext = file.name.split('.').pop()
        const path = `${user.id}/${homeworkId}/${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage
            .from('homework-submissions')
            .upload(path, file, { upsert: true })

        if (uploadError) return { error: `파일 업로드 실패: ${uploadError.message}` }

        const { data: urlData } = supabase.storage
            .from('homework-submissions')
            .getPublicUrl(path)
        fileUrl = urlData.publicUrl
    }

    // 이미 제출했으면 업데이트, 아니면 새로 생성
    const { data: existing } = await supabase
        .from('submissions')
        .select('id')
        .eq('homework_id', homeworkId)
        .eq('student_id', user.id)
        .maybeSingle()

    if (existing) {
        const { error } = await supabase
            .from('submissions')
            .update({
                content: content?.trim() || null,
                file_url: fileUrl || undefined,
                submitted_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
        if (error) return { error: error.message }
    } else {
        const { error } = await supabase
            .from('submissions')
            .insert({
                homework_id: homeworkId,
                student_id: user.id,
                content: content?.trim() || null,
                file_url: fileUrl,
            })
        if (error) return { error: error.message }
    }

    revalidatePath(`/dashboard/homework/${homeworkId}`)
    return { error: null }
}

// ─── 채점 (선생님) ──────────────────────────────────────
export async function gradeSubmission(submissionId: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const score = parseInt(formData.get('score') as string, 10)
    const feedback = formData.get('feedback') as string | null

    if (isNaN(score) || score < 0) {
        return { error: '올바른 점수를 입력하세요.' }
    }

    const { error } = await supabase
        .from('submissions')
        .update({
            score,
            feedback: feedback?.trim() || null,
            graded_at: new Date().toISOString(),
        })
        .eq('id', submissionId)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/homework')
    return { error: null }
}
