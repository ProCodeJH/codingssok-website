import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// 서비스 롤 key가 아닌 anon key 사용 — JWT 검증은 Supabase가 처리
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface CompilerEvent {
    status: 'success' | 'error'
    error_message?: string | null
    code_snippet?: string | null
    execution_time_ms?: number | null
    created_at: string
}

export async function POST(request: NextRequest) {
    try {
        // Bearer JWT 인증
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 })
        }
        const token = authHeader.replace('Bearer ', '')

        // JWT로 사용자 확인
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)
        if (authError || !user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const body = await request.json()

        // 단건 또는 배치 지원
        const events: CompilerEvent[] = Array.isArray(body) ? body : [body]

        if (events.length === 0) {
            return NextResponse.json({ error: 'No events provided' }, { status: 400 })
        }

        if (events.length > 100) {
            return NextResponse.json({ error: 'Maximum 100 events per batch' }, { status: 400 })
        }

        const rows = events.map((event) => ({
            student_id: user.id,
            status: event.status,
            error_message: event.error_message || null,
            code_snippet: event.code_snippet || null,
            execution_time_ms: event.execution_time_ms || null,
            created_at: event.created_at || new Date().toISOString(),
        }))

        const { error } = await supabase
            .from('compiler_activities')
            .insert(rows)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, count: rows.length })
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
