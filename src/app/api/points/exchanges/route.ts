import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getTokenFromCookie(cookieHeader);

        if (!token) {
            return NextResponse.json({ exchanges: [] });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ exchanges: [] });
        }

        const exchanges = await prisma.pointExchange.findMany({
            where: { userId: payload.userId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ exchanges });
    } catch (error) {
        console.error('Failed to fetch exchanges:', error);
        return NextResponse.json({ exchanges: [] });
    }
}
