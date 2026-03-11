/**
 * XP/레벨 엔진 — 코딩쏙 아카데미
 * 경험치 계산, 레벨업, 티어 관련 유틸리티
 */

// ── XP 보상 테이블 ──
export const XP_REWARDS = {
    attendance: 10,
    homework_submit: 30,
    lesson_complete: 20,
    daily_mission: 50,
    challenge_easy: 80,
    challenge_medium: 120,
    challenge_hard: 200,
    promotion_pass: 500,
    code_submit: 15,
} as const;

// ── XP 패널티 테이블 ──
export const XP_PENALTIES = {
    wrong_answer: 5,  // 오답 시 차감
} as const;

// ── 레벨 계산 ──
export function calcLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForLevel(level: number): number {
    return (level - 1) * (level - 1) * 100;
}

export function xpForNextLevel(currentXp: number): { current: number; needed: number; progress: number } {
    const level = calcLevel(currentXp);
    const currentLevelXp = xpForLevel(level);
    const nextLevelXp = xpForLevel(level + 1);
    const diff = nextLevelXp - currentLevelXp;
    const progress = diff > 0 ? ((currentXp - currentLevelXp) / diff) * 100 : 100;
    return { current: currentXp - currentLevelXp, needed: diff, progress: Math.min(progress, 100) };
}

// ── 배치 전 (Lv30 미만) ──
export const UNRANKED_TIER = {
    name: 'Unranked', nameKo: '배치 전', icon: '❓', color: '#94a3b8',
    gradient: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', order: 0,
};

// ── 티어 정의 ──
export const TIERS = [
    { name: 'Iron', nameKo: '아이언', icon: '🪨', color: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280, #9ca3af)', order: 1 },
    { name: 'Bronze', nameKo: '브론즈', icon: '🥉', color: '#b45309', gradient: 'linear-gradient(135deg, #b45309, #d97706)', order: 2 },
    { name: 'Silver', nameKo: '실버', icon: '🥈', color: '#6b7280', gradient: 'linear-gradient(135deg, #9ca3af, #d1d5db)', order: 3 },
    { name: 'Gold', nameKo: '골드', icon: '🥇', color: '#ca8a04', gradient: 'linear-gradient(135deg, #ca8a04, #eab308)', order: 4 },
    { name: 'Platinum', nameKo: '플래티넘', icon: '💎', color: '#0891b2', gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)', order: 5 },
    { name: 'Diamond', nameKo: '다이아', icon: '💠', color: '#2563eb', gradient: 'linear-gradient(135deg, #2563eb, #3b82f6)', order: 6 },
    { name: 'Grandmaster', nameKo: '그랜드마스터', icon: '🏆', color: '#1d4ed8', gradient: 'linear-gradient(135deg, #1d4ed8, #2563eb)', order: 7 },
    { name: 'Challenger', nameKo: '챌린저', icon: '👑', color: '#dc2626', gradient: 'linear-gradient(135deg, #dc2626, #ef4444)', order: 8 },
] as const;

export function getTierInfo(tierName: string) {
    return TIERS.find(t => t.name === tierName) || TIERS[0];
}

// 레벨 + 배치 완료 여부에 따라 표시용 티어 반환
export function getDisplayTier(tierName: string, level: number, placementDone?: boolean) {
    // 배치고사를 안 봤거나 Lv30 미만이면 '배치 전'
    if (!placementDone && level < 30) return UNRANKED_TIER;
    return getTierInfo(tierName);
}

export function getTierByOrder(order: number) {
    return TIERS.find(t => t.order === order) || TIERS[0];
}

// 배치고사 결과에 따라 초기 티어 배정
export function getPlacementTier(score: number, total: number): string {
    const pct = (score / total) * 100;
    if (pct >= 90) return 'Gold';
    if (pct >= 70) return 'Silver';
    if (pct >= 50) return 'Bronze';
    return 'Iron';
}

// 승급심사 통과 여부
export function checkPromotion(score: number, total: number): boolean {
    return (score / total) * 100 >= 70;  // 70% 이상이면 승급
}

export function getNextTier(currentTier: string): string | null {
    const current = TIERS.find(t => t.name === currentTier);
    if (!current || current.order >= 8) return null;
    return getTierByOrder(current.order + 1).name;
}

// ── Supabase XP 적립 함수 ──
import { createClient } from '@/lib/supabase';

export async function awardXP(userId: string, amount: number, action: string, icon?: string) {
    const supabase = createClient();

    // activity_log 기록
    await supabase.from('activity_log').insert({
        user_id: userId,
        action,
        xp_earned: amount,
        icon: icon || 'check_circle',
        icon_bg: '#dcfce7',
        icon_color: '#15803d',
    });

    // user_progress XP 업데이트
    const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (progress) {
        const newXp = (progress.xp || 0) + amount;
        const newLevel = calcLevel(newXp);
        const newProblems = action.includes('문제') || action.includes('챌린지')
            ? (progress.total_problems || 0) + 1
            : progress.total_problems || 0;

        await supabase.from('user_progress').update({
            xp: newXp,
            level: newLevel,
            total_problems: newProblems,
            last_active_date: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString(),
        }).eq('user_id', userId);

        return { xp: newXp, level: newLevel, levelUp: newLevel > (progress.level || 1) };
    } else {
        // 처음인 경우 새로 생성
        const newLevel = calcLevel(amount);
        await supabase.from('user_progress').insert({
            user_id: userId,
            xp: amount,
            level: newLevel,
            streak: 1,
            best_streak: 1,
            last_active_date: new Date().toISOString().split('T')[0],
        });
        return { xp: amount, level: newLevel, levelUp: false };
    }
}

// ── XP 차감 함수 (오답 패널티) ──
export async function deductXP(userId: string, amount: number, reason: string) {
    const supabase = createClient();

    // activity_log 기록
    await supabase.from('activity_log').insert({
        user_id: userId,
        action: reason,
        xp_earned: -amount,
        icon: 'remove_circle',
        icon_bg: '#fee2e2',
        icon_color: '#dc2626',
    });

    // user_progress XP 차감
    const { data: progress } = await supabase
        .from('user_progress')
        .select('xp, level')
        .eq('user_id', userId)
        .single();

    if (progress) {
        const newXp = Math.max(0, (progress.xp || 0) - amount);
        const newLevel = calcLevel(newXp);

        await supabase.from('user_progress').update({
            xp: newXp,
            level: newLevel,
            updated_at: new Date().toISOString(),
        }).eq('user_id', userId);

        return { xp: newXp, level: newLevel };
    }
    return { xp: 0, level: 1 };
}

// ── 출석체크 ──
export async function checkAttendance(userId: string) {
    const supabase = createClient();
    const today = new Date().toISOString().split('T')[0];

    const { data: existing } = await supabase
        .from('attendance')
        .select('id')
        .eq('user_id', userId)
        .eq('check_date', today)
        .single();

    if (existing) return { alreadyChecked: true, xp: 0 };

    await supabase.from('attendance').insert({
        user_id: userId,
        check_date: today,
        xp_earned: XP_REWARDS.attendance,
    });

    // 스트릭 업데이트
    const { data: progress } = await supabase
        .from('user_progress')
        .select('streak, best_streak, last_active_date')
        .eq('user_id', userId)
        .single();

    if (progress) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const isConsecutive = progress.last_active_date === yesterdayStr;
        const newStreak = isConsecutive ? (progress.streak || 0) + 1 : 1;
        const newBest = Math.max(newStreak, progress.best_streak || 0);

        await supabase.from('user_progress').update({
            streak: newStreak,
            best_streak: newBest,
            last_active_date: today,
        }).eq('user_id', userId);
    }

    const result = await awardXP(userId, XP_REWARDS.attendance, '출석체크', 'login');
    return { alreadyChecked: false, ...result };
}
