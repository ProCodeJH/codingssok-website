import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { compileRequestSchema } from '@/lib/validation';

// Godbolt compiler IDs per language
const COMPILER_MAP: Record<string, { id: string; lang: string }> = {
    c:          { id: 'cg141',         lang: 'c' },
    cpp:        { id: 'g141',          lang: 'c++' },
    python:     { id: 'python312',     lang: 'python' },
    javascript: { id: 'v8trunk',       lang: 'javascript' },
    java:       { id: 'java2100',      lang: 'java' },
};

export async function POST(req: NextRequest) {
    try {
        // Rate Limiting: IP 기반 분당 20회 제한
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        const { success: rateLimitOk } = rateLimit(`compile:${ip}`, { maxRequests: 20, windowMs: 60_000 });
        if (!rateLimitOk) {
            return NextResponse.json(
                { success: false, error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

        const body = await req.json();
        const parsed = compileRequestSchema.safeParse(body);
        if (!parsed.success) {
            const msg = parsed.error.issues?.[0]?.message || '잘못된 요청입니다.';
            return NextResponse.json({ success: false, error: msg }, { status: 400 });
        }

        let code = parsed.data.code;
        const language = parsed.data.language;
        const stdin = parsed.data.stdin;

        const compiler = COMPILER_MAP[language] || COMPILER_MAP.c;

        // Java: Godbolt doesn't use filenames, so remove 'public' from class
        // to avoid "should be declared in Main.java" error
        if (language === 'java') {
            code = code.replace(/public\s+class\s+/g, 'class ');
        }

        const res = await fetch(`https://godbolt.org/api/compiler/${compiler.id}/compile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                source: code,
                compiler: compiler.id,
                options: {
                    userArguments: '',
                    executeParameters: { args: '', stdin },
                    compilerOptions: { executorRequest: true },
                    filters: { execute: true },
                },
            }),
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, error: `컴파일러 서버 오류 (${res.status})` }, { status: 502 });
        }

        const data = await res.json();
        const exitCode = data.code ?? -1;
        const stdout = (data.stdout || []).map((l: { text: string }) => l.text).join('\n');
        const stderr = (data.stderr || []).map((l: { text: string }) => l.text).join('\n');
        const buildResult = (data.buildResult?.stderr || []).map((l: { text: string }) => l.text).join('\n');

        return NextResponse.json({
            success: exitCode === 0 && !buildResult,
            exitCode,
            stdout,
            stderr: buildResult || stderr,
        });
    } catch {
        return NextResponse.json({ success: false, error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}
