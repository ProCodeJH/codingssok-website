'use server'

import { createClient } from '@/lib/supabase/server'

export async function getPCStatus() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const { data, error } = await supabase
        .from('pc_sessions')
        .select('*')
        .order('pc_name', { ascending: true })

    if (error) return { error: error.message, data: null }

    const online = (data || []).filter((pc: { status: string }) => pc.status === 'online').length
    const offline = (data || []).filter((pc: { status: string }) => pc.status === 'offline').length
    const locked = (data || []).filter((pc: { status: string }) => pc.status === 'locked').length

    return {
        error: null,
        data: {
            pcs: data || [],
            summary: { online, offline, locked, total: (data || []).length },
        },
    }
}

export async function getRecentPCActivity() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: '인증이 필요합니다.', data: null }

    const { data, error } = await supabase
        .from('pc_activity_logs')
        .select('*, pc_sessions(pc_name)')
        .order('created_at', { ascending: false })
        .limit(20)

    return { data: data || [], error: error?.message || null }
}
