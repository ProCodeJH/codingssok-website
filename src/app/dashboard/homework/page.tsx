"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OldHomeworkPage() {
    const router = useRouter();
    useEffect(() => { router.replace("/dashboard/learning/homework"); }, [router]);
    return null;
}
