"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface PresenceOptions {
    courseId?: string;
    courseTitle?: string;
    unitId?: string;
    unitTitle?: string;
    pageId?: string;
    pageTitle?: string;
}

const HEARTBEAT_INTERVAL = 30_000; // 30초

export function usePresenceHeartbeat(options: PresenceOptions) {
    const { user } = useAuth();
    const optionsRef = useRef(options);
    optionsRef.current = options;

    useEffect(() => {
        if (!user?.id) return;

        const supabase = createClient();
        let intervalId: NodeJS.Timeout;

        const upsert = async (online: boolean) => {
            const opts = optionsRef.current;
            try {
                await supabase.from("student_presence").upsert({
                    user_id: user.id,
                    student_name: user.name || user.email?.split("@")[0] || "unknown",
                    course_id: opts.courseId || null,
                    course_title: opts.courseTitle || null,
                    unit_id: opts.unitId || null,
                    unit_title: opts.unitTitle || null,
                    page_id: opts.pageId || null,
                    page_title: opts.pageTitle || null,
                    page_url: typeof window !== "undefined" ? window.location.pathname : null,
                    is_online: online,
                    last_heartbeat: new Date().toISOString(),
                }, { onConflict: "user_id", ignoreDuplicates: false });
            } catch (e) {
                if (process.env.NODE_ENV === "development") console.error("[Presence] upsert:", e);
            }
        };

        // 즉시 온라인 표시
        upsert(true);
        intervalId = setInterval(() => upsert(true), HEARTBEAT_INTERVAL);

        // 페이지 떠날 때 오프라인 표시
        const handleUnload = () => {
            const body = JSON.stringify({
                user_id: user.id,
                student_name: user.name || "unknown",
                is_online: false,
                last_heartbeat: new Date().toISOString(),
                course_id: optionsRef.current.courseId || null,
                course_title: optionsRef.current.courseTitle || null,
                unit_id: optionsRef.current.unitId || null,
                unit_title: optionsRef.current.unitTitle || null,
                page_id: optionsRef.current.pageId || null,
                page_title: optionsRef.current.pageTitle || null,
                page_url: window.location.pathname,
            });
            // fetch keepalive로 페이지 떠날 때도 안정적으로 전송
            const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/student_presence?on_conflict=user_id`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`,
                    "Prefer": "resolution=merge-duplicates",
                },
                body,
                keepalive: true,
            }).catch(() => {});
        };
        window.addEventListener("beforeunload", handleUnload);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("beforeunload", handleUnload);
            upsert(false);
        };
    }, [user?.id, options.courseId, options.unitId, options.pageId]);
}
