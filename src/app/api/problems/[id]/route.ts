import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const problem = await prisma.problem.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                subject: true,
                difficulty: true,
                points: true,
                hint: true
            }
        });

        if (!problem) {
            return NextResponse.json({ error: '문제를 찾을 수 없습니다' }, { status: 404 });
        }

        return NextResponse.json({ problem });
    } catch (error) {
        console.error('Failed to fetch problem:', error);
        return NextResponse.json({ error: '문제를 불러오는데 실패했습니다' }, { status: 500 });
    }
}
