import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'codingssok-secret-key-2026';
const EDUCATION_CODE = '74123';

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
}

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

// 비밀번호 검증
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// JWT 토큰 생성
export function generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// JWT 토큰 검증
export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

// 교육코드 검증
export function validateEducationCode(code: string): boolean {
    return code === EDUCATION_CODE;
}

// 쿠키에서 토큰 추출
export function getTokenFromCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    const match = cookieHeader.match(/auth-token=([^;]+)/);
    return match ? match[1] : null;
}
