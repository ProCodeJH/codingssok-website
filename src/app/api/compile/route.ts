import { NextRequest, NextResponse } from 'next/server';

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
        const body = await req.json();
        let code = body.code as string;
        const language = (body.language || 'c') as string;
        const stdin = (body.stdin || '') as string;

        if (!code || typeof code !== 'string') {
            return NextResponse.json({ success: false, error: '코드가 비어 있습니다.' }, { status: 400 });
        }
        if (code.length > 50000) {
            return NextResponse.json({ success: false, error: '코드가 너무 깁니다. (최대 50,000자)' }, { status: 400 });
        }

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
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err?.message || '알 수 없는 오류' }, { status: 500 });
    }
}
