'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMyClasses() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const role = user.user_metadata?.role || 'student'

    if (role === 'teacher') {
        const { data, error } = await supabase
            .from('classes')
            .select('*, class_members(count)')
            .eq('teacher_id', user.id)
            .order('created_at', { ascending: false })

        return { data, error: error?.message || null }
    } else {
        // student: 소속 반만 조회
        const { data, error } = await supabase
            .from('class_members')
            .select('class_id, classes(*)')
            .eq('student_id', user.id)

        const classes = data?.map((m) => (m as Record<string, unknown>).classes).filter(Boolean) || []
        return { data: classes, error: error?.message || null }
    }
}

export async function getClassById(classId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('id', classId)
        .single()

    return { data, error: error?.message || null }
}

export async function createClass(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const name = formData.get('name') as string
    const schedule = formData.get('schedule') as string | null

    if (!name?.trim()) return { error: '반 이름을 입력하세요.' }

    const { error } = await supabase
        .from('classes')
        .insert({
            name: name.trim(),
            schedule: schedule?.trim() || null,
            teacher_id: user.id,
        })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/classes')
    return { error: null }
}

export async function updateClass(classId: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const name = formData.get('name') as string
    const schedule = formData.get('schedule') as string | null

    const { error } = await supabase
        .from('classes')
        .update({
            name: name?.trim(),
            schedule: schedule?.trim() || null,
        })
        .eq('id', classId)
        .eq('teacher_id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/classes')
    revalidatePath(`/dashboard/classes/${classId}`)
    return { error: null }
}

export async function deleteClass(classId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId)
        .eq('teacher_id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/classes')
    return { error: null }
}
