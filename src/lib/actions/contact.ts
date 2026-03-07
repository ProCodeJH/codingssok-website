'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const age = formData.get('age') as string | null
    const track = formData.get('track') as string | null
    const message = formData.get('message') as string | null

    if (!name?.trim() || !phone?.trim()) {
        return { error: '이름과 연락처는 필수입니다.' }
    }

    const supabase = await createClient()

    const { error } = await supabase
        .from('contact_inquiries')
        .insert({
            name: name.trim(),
            phone: phone.trim(),
            student_age: age?.trim() || null,
            interest_track: track || null,
            message: message?.trim() || null,
        })

    if (error) return { error: '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }

    return { error: null }
}
