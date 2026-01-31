import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // 필수 필드 검증
        if (!email || !password) {
            return NextResponse.json(
                { error: '이메일과 비밀번호를 입력해주세요' },
                { status: 400 }
            );
        }

        // 사용자 조회
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json(
                { error: '이메일 또는 비밀번호가 일치하지 않습니다' },
                { status: 401 }
            );
        }

        // 비밀번호 검증
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
            return NextResponse.json(
                { error: '이메일 또는 비밀번호가 일치하지 않습니다' },
                { status: 401 }
            );
        }

        // JWT 토큰 생성
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        // 쿠키에 토큰 저장
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                points: user.points
            }
        });

        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7일
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: '로그인 중 오류가 발생했습니다' },
            { status: 500 }
        );
    }
}
