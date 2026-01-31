import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const subject = searchParams.get('subject');
        const difficulty = searchParams.get('difficulty');

        const where: { subject?: string; difficulty?: string } = {};
        if (subject) where.subject = subject;
        if (difficulty) where.difficulty = difficulty;

        const problems = await prisma.problem.findMany({
            where,
            select: {
                id: true,
                title: true,
                subject: true,
                difficulty: true,
                points: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ problems });
    } catch (error) {
        console.error('Failed to fetch problems:', error);
        return NextResponse.json({ problems: [] });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title, description, subject, difficulty, points, answer, hint } = await request.json();

        // 간단한 권한 체크 (실제로는 admin 체크 필요)
        const problem = await prisma.problem.create({
            data: {
                title,
                description,
                subject,
                difficulty,
                points: points || 10,
                answer,
                hint
            }
        });

        return NextResponse.json({ success: true, problem });
    } catch (error) {
        console.error('Failed to create problem:', error);
        return NextResponse.json({ error: '문제 생성에 실패했습니다' }, { status: 500 });
    }
}
