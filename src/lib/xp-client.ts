/**
 * XP 클라이언트 함수 — Supabase 연동
 * 브라우저에서 직접 XP를 적립/차감하는 함수들
 */
import { createClient } from '@/lib/supabase';
import { calcLevel, XP_REWARDS } from './xp-engine';
import { trackMission } from './mission-tracker';
import { processLevelUp, checkTierPromotion, getActiveXpBoost } from './reward-engine';

export async function awardXP(userId: string, amount: number, action: string, icon?: string) {
    const supabase = createClient();

    // XP 부스트 적용
    const boost = getActiveXpBoost();
    if (boost) {
        amount = Math.round(amount * boost.multiplier);
    }

    await supabase.from('activity_log').insert({
        user_id: userId,
        action,
        xp_earned: amount,
        icon: icon || 'check_circle',
        icon_bg: '#dcfce7',
        icon_color: '#15803d',
    });

    const { data: progress } = await supabase
        .from('user_progress')
        .select('xp, level, total_problems, last_active_date')
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

        const levelUp = newLevel > (progress.level || 1);

        // 레벨업 시 보상 처리 (아이스, 힌트, 마일스톤 XP)
        if (levelUp) {
            const bonusXp = await processLevelUp(userId, progress.level || 1, newLevel);
            // 티어 승급 체크
            await checkTierPromotion(userId);
            return { xp: newXp + bonusXp, level: calcLevel(newXp + bonusXp), levelUp: true };
        }

        return { xp: newXp, level: newLevel, levelUp: false };
    } else {
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

export async function deductXP(userId: string, amount: number, reason: string) {
    const supabase = createClient();

    await supabase.from('activity_log').insert({
        user_id: userId,
        action: reason,
        xp_earned: -amount,
        icon: 'remove_circle',
        icon_bg: '#fee2e2',
        icon_color: '#dc2626',
    });

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
    trackMission('login');
    return { alreadyChecked: false, ...result };
}
