"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OldDashboardPage() {
    const router = useRouter();
    useEffect(() => { router.replace("/dashboard/learning"); }, [router]);
    return null;
}
