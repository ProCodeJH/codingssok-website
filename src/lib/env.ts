/**
 * 환경변수 — NEXT_PUBLIC_* 는 리터럴로 접근해야 Next.js가 빌드 시 인라인함
 */

export const env = {
    get SUPABASE_URL() {
        return process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    },
    get SUPABASE_ANON_KEY() {
        return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    },
}
