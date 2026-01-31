import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getTokenFromCookie(cookieHeader);

        if (!token) {
            return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
        }

        const { points } = await request.json();

        // 최소 교환 포인트 확인
        if (points < 500) {
            return NextResponse.json({ error: '최소 500P 이상 교환 가능합니다' }, { status: 400 });
        }

        // 사용자 포인트 확인
        const user = await prisma.user.findUnique({
            where: { id: payload.userId }
        });

        if (!user || user.points < points) {
            return NextResponse.json({ error: '포인트가 부족합니다' }, { status: 400 });
        }

        // 교환 신청 생성 및 포인트 차감
        const exchange = await prisma.pointExchange.create({
            data: {
                userId: payload.userId,
                points,
                giftType: '문화상품권',
                status: 'PENDING'
            }
        });

        await prisma.user.update({
            where: { id: payload.userId },
            data: { points: { decrement: points } }
        });

        return NextResponse.json({ success: true, exchange });
    } catch (error) {
        console.error('Exchange failed:', error);
        return NextResponse.json({ error: '교환 신청에 실패했습니다' }, { status: 500 });
    }
}
