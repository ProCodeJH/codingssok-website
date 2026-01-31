import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getTokenFromCookie(cookieHeader);

        if (!token) {
            return NextResponse.json({ error: '권한이 없습니다' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload || payload.role !== 'ADMIN') {
            return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
        }

        const exchanges = await prisma.pointExchange.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ exchanges });
    } catch (error) {
        console.error('Failed to fetch exchanges:', error);
        return NextResponse.json({ exchanges: [] });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getTokenFromCookie(cookieHeader);

        if (!token) {
            return NextResponse.json({ error: '권한이 없습니다' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload || payload.role !== 'ADMIN') {
            return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
        }

        const { exchangeId, status } = await request.json();

        // 거절 시 포인트 환불
        if (status === 'REJECTED') {
            const exchange = await prisma.pointExchange.findUnique({
                where: { id: exchangeId }
            });

            if (exchange && exchange.status === 'PENDING') {
                await prisma.user.update({
                    where: { id: exchange.userId },
                    data: { points: { increment: exchange.points } }
                });
            }
        }

        await prisma.pointExchange.update({
            where: { id: exchangeId },
            data: { status }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update exchange:', error);
        return NextResponse.json({ error: '처리에 실패했습니다' }, { status: 500 });
    }
}
