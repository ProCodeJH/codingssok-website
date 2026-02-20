"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// goals 페이지는 미션 & 업적 페이지로 통합됨
export default function GoalsRedirect() {
    const router = useRouter();
    useEffect(() => { router.replace("/dashboard/learning/missions"); }, [router]);
    return null;
}
