import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();
        if (!code || typeof code !== 'string') {
            return NextResponse.json({ success: false, error: '코드가 비어 있습니다.' }, { status: 400 });
        }
        if (code.length > 10000) {
            return NextResponse.json({ success: false, error: '코드가 너무 깁니다. (최대 10,000자)' }, { status: 400 });
        }

        const res = await fetch('https://godbolt.org/api/compiler/cg141/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                source: code,
                compiler: 'cg141',
                options: {
                    userArguments: '',
                    executeParameters: { args: '', stdin: '' },
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
        // buildResult (컴파일 에러)
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
