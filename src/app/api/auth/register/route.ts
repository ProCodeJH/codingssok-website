import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, validateEducationCode, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, eduCode } = await request.json();

        // 필수 필드 검증
        if (!name || !email || !password || !eduCode) {
            return NextResponse.json(
                { error: '모든 필드를 입력해주세요' },
                { status: 400 }
            );
        }

        // 교육코드 검증
        if (!validateEducationCode(eduCode)) {
            return NextResponse.json(
                { error: '잘못된 교육코드입니다' },
                { status: 400 }
            );
        }

        // 이메일 중복 확인
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: '이미 등록된 이메일입니다' },
                { status: 400 }
            );
        }

        // 비밀번호 해싱
        const hashedPassword = await hashPassword(password);

        // 사용자 생성
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                eduCode,
                role: 'STUDENT',
                points: 0
            }
        });

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
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: '회원가입 중 오류가 발생했습니다' },
            { status: 500 }
        );
    }
}
