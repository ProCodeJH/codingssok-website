import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getTokenFromCookie(cookieHeader);

        if (!token) {
            return NextResponse.json({ user: null });
        }

        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json({ user: null });
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                points: true
            }
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ user: null });
    }
}
