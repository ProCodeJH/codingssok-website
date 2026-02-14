'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMembersByClass(classId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const { data, error } = await supabase
        .from('class_members')
        .select('student_id, joined_at, profiles!class_members_student_id_fkey(id, name, email)')
        .eq('class_id', classId)
        .order('joined_at', { ascending: true })

    return { data, error: error?.message || null }
}

export async function searchStudentByEmail(email: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email')
        .eq('role', 'student')
        .ilike('email', `%${email}%`)
        .limit(10)

    return { data, error: error?.message || null }
}

export async function addMember(classId: string, studentId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const { error } = await supabase
        .from('class_members')
        .insert({
            class_id: classId,
            student_id: studentId,
        })

    if (error) {
        if (error.code === '23505') {
            return { error: '이미 등록된 학생입니다.' }
        }
        return { error: error.message }
    }

    revalidatePath(`/dashboard/classes/${classId}`)
    return { error: null }
}

export async function removeMember(classId: string, studentId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const { error } = await supabase
        .from('class_members')
        .delete()
        .eq('class_id', classId)
        .eq('student_id', studentId)

    if (error) return { error: error.message }

    revalidatePath(`/dashboard/classes/${classId}`)
    return { error: null }
}
