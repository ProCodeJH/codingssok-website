import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        // 인증 확인
        const cookieHeader = request.headers.get('cookie');
        const token = getTokenFromCookie(cookieHeader);

        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
        }

        const { problemId, answer } = await request.json();

        // 문제 조회
        const problem = await prisma.problem.findUnique({
            where: { id: problemId }
        });

        if (!problem) {
            return NextResponse.json({ error: '문제를 찾을 수 없습니다' }, { status: 404 });
        }

        // 이미 맞힌 문제인지 확인
        const existingCorrect = await prisma.submission.findFirst({
            where: {
                userId: payload.userId,
                problemId,
                isCorrect: true
            }
        });

        // 정답 확인 (대소문자 무시, 공백 제거)
        const isCorrect = answer.trim().toLowerCase() === problem.answer.trim().toLowerCase();

        // 포인트 계산 (이미 맞힌 문제면 0점)
        const earnedPts = isCorrect && !existingCorrect ? problem.points : 0;

        // 제출 기록 저장
        await prisma.submission.create({
            data: {
                userId: payload.userId,
                problemId,
                answer: answer.trim(),
                isCorrect,
                earnedPts
            }
        });

        // 포인트 적립
        if (earnedPts > 0) {
            await prisma.user.update({
                where: { id: payload.userId },
                data: { points: { increment: earnedPts } }
            });
        }

        return NextResponse.json({
            success: true,
            isCorrect,
            earnedPoints: earnedPts,
            alreadySolved: !!existingCorrect
        });
    } catch (error) {
        console.error('Submission failed:', error);
        return NextResponse.json({ error: '제출에 실패했습니다' }, { status: 500 });
    }
}
