"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OldCompilerPage() {
    const router = useRouter();
    useEffect(() => { router.replace("/dashboard/learning/compiler"); }, [router]);
    return null;
}
