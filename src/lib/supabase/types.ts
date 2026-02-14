export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    name: string
                    role: 'student' | 'teacher' | 'parent'
                    avatar_url: string | null
                    parent_id: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    email: string
                    name: string
                    role: 'student' | 'teacher' | 'parent'
                    avatar_url?: string | null
                    parent_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    name?: string
                    role?: 'student' | 'teacher' | 'parent'
                    avatar_url?: string | null
                    parent_id?: string | null
                    created_at?: string
                }
            }
            classes: {
                Row: {
                    id: string
                    name: string
                    teacher_id: string
                    schedule: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    teacher_id: string
                    schedule?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    teacher_id?: string
                    schedule?: string | null
                    created_at?: string
                }
            }
            class_members: {
                Row: {
                    class_id: string
                    student_id: string
                    joined_at: string
                }
                Insert: {
                    class_id: string
                    student_id: string
                    joined_at?: string
                }
                Update: {
                    class_id?: string
                    student_id?: string
                    joined_at?: string
                }
            }
            session_logs: {
                Row: {
                    id: string
                    class_id: string
                    date: string
                    content: string
                    teacher_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    class_id: string
                    date: string
                    content: string
                    teacher_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    class_id?: string
                    date?: string
                    content?: string
                    teacher_id?: string
                    created_at?: string
                }
            }
            homework: {
                Row: {
                    id: string
                    class_id: string
                    title: string
                    description: string | null
                    due_date: string
                    max_score: number
                    created_by: string
                    status: 'draft' | 'active' | 'closed'
                    created_at: string
                }
                Insert: {
                    id?: string
                    class_id: string
                    title: string
                    description?: string | null
                    due_date: string
                    max_score?: number
                    created_by: string
                    status?: 'draft' | 'active' | 'closed'
                    created_at?: string
                }
                Update: {
                    id?: string
                    class_id?: string
                    title?: string
                    description?: string | null
                    due_date?: string
                    max_score?: number
                    created_by?: string
                    status?: 'draft' | 'active' | 'closed'
                    created_at?: string
                }
            }
            submissions: {
                Row: {
                    id: string
                    homework_id: string
                    student_id: string
                    content: string | null
                    file_url: string | null
                    score: number | null
                    feedback: string | null
                    submitted_at: string
                    graded_at: string | null
                }
                Insert: {
                    id?: string
                    homework_id: string
                    student_id: string
                    content?: string | null
                    file_url?: string | null
                    score?: number | null
                    feedback?: string | null
                    submitted_at?: string
                    graded_at?: string | null
                }
                Update: {
                    id?: string
                    homework_id?: string
                    student_id?: string
                    content?: string | null
                    file_url?: string | null
                    score?: number | null
                    feedback?: string | null
                    submitted_at?: string
                    graded_at?: string | null
                }
            }
            compiler_activities: {
                Row: {
                    id: string
                    student_id: string
                    status: 'success' | 'error'
                    error_message: string | null
                    code_snippet: string | null
                    execution_time_ms: number | null
                    synced_at: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    student_id: string
                    status: 'success' | 'error'
                    error_message?: string | null
                    code_snippet?: string | null
                    execution_time_ms?: number | null
                    synced_at?: string
                    created_at: string
                }
                Update: {
                    id?: string
                    student_id?: string
                    status?: 'success' | 'error'
                    error_message?: string | null
                    code_snippet?: string | null
                    execution_time_ms?: number | null
                    synced_at?: string
                    created_at?: string
                }
            }
            content_progress: {
                Row: {
                    id: string
                    student_id: string
                    content_id: string
                    track: string
                    progress_percent: number
                    correct_count: number
                    wrong_count: number
                    last_position: Json | null
                    is_completed: boolean
                    last_accessed_at: string
                }
                Insert: {
                    id?: string
                    student_id: string
                    content_id: string
                    track: string
                    progress_percent?: number
                    correct_count?: number
                    wrong_count?: number
                    last_position?: Json | null
                    is_completed?: boolean
                    last_accessed_at?: string
                }
                Update: {
                    id?: string
                    student_id?: string
                    content_id?: string
                    track?: string
                    progress_percent?: number
                    correct_count?: number
                    wrong_count?: number
                    last_position?: Json | null
                    is_completed?: boolean
                    last_accessed_at?: string
                }
            }
            pc_sessions: {
                Row: {
                    id: string
                    pc_name: string
                    student_id: string | null
                    ip_address: string | null
                    status: 'online' | 'offline' | 'locked'
                    last_screenshot_at: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    pc_name: string
                    student_id?: string | null
                    ip_address?: string | null
                    status?: 'online' | 'offline' | 'locked'
                    last_screenshot_at?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    pc_name?: string
                    student_id?: string | null
                    ip_address?: string | null
                    status?: 'online' | 'offline' | 'locked'
                    last_screenshot_at?: string | null
                    created_at?: string
                }
            }
            pc_activity_logs: {
                Row: {
                    id: string
                    pc_session_id: string
                    event_type: string
                    app_name: string | null
                    url: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    pc_session_id: string
                    event_type: string
                    app_name?: string | null
                    url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    pc_session_id?: string
                    event_type?: string
                    app_name?: string | null
                    url?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
