'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSessionsByClass(classId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const { data, error } = await supabase
        .from('session_logs')
        .select('*')
        .eq('class_id', classId)
        .order('date', { ascending: false })

    return { data, error: error?.message || null }
}

export async function createSession(classId: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.' }

    const date = formData.get('date') as string
    const content = formData.get('content') as string

    if (!date || !content?.trim()) {
        return { error: '날짜와 내용을 입력하세요.' }
    }

    const { error } = await supabase
        .from('session_logs')
        .insert({
            class_id: classId,
            date,
            content: content.trim(),
            teacher_id: user.id,
        })

    if (error) return { error: error.message }

    revalidatePath(`/dashboard/classes/${classId}`)
    return { error: null }
}
