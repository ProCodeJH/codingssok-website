import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { studentName, grade, phone, course, message } = body;

        if (!studentName || studentName.length < 2) {
            return NextResponse.json(
                { success: false, error: "학생 이름은 2자 이상이어야 합니다." },
                { status: 400 }
            );
        }

        if (!phone || !/^01[0-9]-?\d{3,4}-?\d{4}$/.test(phone.replace(/\s/g, ""))) {
            return NextResponse.json(
                { success: false, error: "올바른 전화번호 형식이 아닙니다." },
                { status: 400 }
            );
        }

        if (!course) {
            return NextResponse.json(
                { success: false, error: "관심 과정을 선택해주세요." },
                { status: 400 }
            );
        }

        console.log("=== 새 상담 신청 ===");
        console.log(`학생 이름: ${studentName}`);
        console.log(`학년: ${grade}`);
        console.log(`연락처: ${phone}`);
        console.log(`관심 과정: ${course}`);
        console.log(`문의 사항: ${message || "(없음)"}`);
        console.log(`접수 시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`);
        console.log("==================");

        return NextResponse.json({
            success: true,
            message: "상담 신청이 접수되었습니다. 24시간 이내 연락드리겠습니다.",
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
            { status: 500 }
        );
    }
}
