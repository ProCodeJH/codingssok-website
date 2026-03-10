"use client";
import { useState, useCallback, useEffect, useRef } from "react";

export interface StudyNote {
    content: string;
    color: string;
    updatedAt: number;
}

const STORAGE_KEY = "codingssok_study_notes";

function loadAll(): Record<string, StudyNote> {
    if (typeof window === "undefined") return {};
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function persistAll(notes: Record<string, StudyNote>) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {}
}

export function useStudyNotes() {
    const [notes, setNotes] = useState<Record<string, StudyNote>>(loadAll);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Save note with debounce
    const saveNote = useCallback((key: string, content: string, color: string) => {
        setNotes(prev => {
            const next = { ...prev, [key]: { content, color, updatedAt: Date.now() } };
            // Debounced persist
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => persistAll(next), 400);
            return next;
        });
    }, []);

    const getNote = useCallback((key: string): StudyNote | null => {
        return notes[key] || null;
    }, [notes]);

    const getAllNotes = useCallback((courseId: string): { key: string; note: StudyNote }[] => {
        return Object.entries(notes)
            .filter(([k]) => k.startsWith(`${courseId}_`))
            .map(([key, note]) => ({ key, note }))
            .sort((a, b) => b.note.updatedAt - a.note.updatedAt);
    }, [notes]);

    const deleteNote = useCallback((key: string) => {
        setNotes(prev => {
            const next = { ...prev };
            delete next[key];
            persistAll(next);
            return next;
        });
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

    return { notes, saveNote, getNote, getAllNotes, deleteNote };
}
