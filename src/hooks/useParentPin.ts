"use client";
import { useMemo, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";

const PIN_COURSE = "__parent_pin__";

function generatePin(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Hook to manage parent access PIN.
 * Stores the PIN in the study_progress table with course_id='__parent_pin__'
 * and completed_units=['XXXXXX'] (the 6-digit PIN).
 */
export function useParentPin(userId: string | undefined) {
    const supabase = useMemo(() => createClient(), []);
    const [pin, setPin] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) { setLoading(false); return; }
        (async () => {
            // Check if PIN already exists
            const { data } = await supabase
                .from("study_progress")
                .select("completed_units")
                .eq("user_id", userId)
                .eq("course_id", PIN_COURSE)
                .maybeSingle();

            if (data?.completed_units?.[0]) {
                setPin(data.completed_units[0]);
            } else {
                // Generate new PIN
                const newPin = generatePin();
                await supabase.from("study_progress").upsert({
                    user_id: userId,
                    course_id: PIN_COURSE,
                    completed_units: [newPin],
                    updated_at: new Date().toISOString(),
                }, { onConflict: "user_id,course_id" });
                setPin(newPin);
            }
            setLoading(false);
        })();
    }, [userId, supabase]);

    const regeneratePin = useCallback(async () => {
        if (!userId) return;
        const newPin = generatePin();
        await supabase.from("study_progress").upsert({
            user_id: userId,
            course_id: PIN_COURSE,
            completed_units: [newPin],
            updated_at: new Date().toISOString(),
        }, { onConflict: "user_id,course_id" });
        setPin(newPin);
    }, [userId, supabase]);

    return { pin, loading, regeneratePin };
}

/**
 * Verify a parent PIN for a given student.
 * Returns the student profile if valid, null if invalid.
 */
export async function verifyParentPin(
    supabase: ReturnType<typeof createClient>,
    studentQuery: string,
    pin: string
): Promise<any | null> {
    // Find student by name, email, or UUID
    let profile: any = null;
    const q = studentQuery.trim();

    if (q.includes("@")) {
        const { data } = await supabase.from("profiles").select("*").eq("email", q).single();
        profile = data;
    }
    if (!profile) {
        const { data } = await supabase.from("profiles").select("*").eq("name", q).maybeSingle();
        profile = data;
    }
    if (!profile && q.length > 10) {
        const { data } = await supabase.from("profiles").select("*").eq("id", q).single();
        profile = data;
    }
    if (!profile) return null;

    // Verify PIN
    const { data: pinData } = await supabase
        .from("study_progress")
        .select("completed_units")
        .eq("user_id", profile.id)
        .eq("course_id", PIN_COURSE)
        .maybeSingle();

    if (!pinData?.completed_units?.[0] || pinData.completed_units[0] !== pin) {
        return null; // PIN mismatch
    }

    return profile;
}
