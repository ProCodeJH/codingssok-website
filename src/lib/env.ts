/**
 * 환경변수 검증 — 빌드/런타임 시 필수 환경변수 존재 확인
 */

function requireEnv(name: string): string {
    const value = process.env[name]
    if (!value) {
        if (typeof window !== 'undefined') {
            console.warn(`[env] ${name} is not set`)
        }
        return ''
    }
    return value
}

export const env = {
    get SUPABASE_URL() {
        return requireEnv('NEXT_PUBLIC_SUPABASE_URL')
    },
    get SUPABASE_ANON_KEY() {
        return requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    },
}
