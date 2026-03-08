'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// XP 레벨 공식: xp_for_level(n) = floor(50 * n^1.5)
function xpForLevel(level: number): number {
  return Math.floor(50 * Math.pow(level, 1.5))
}

function calculateLevel(totalXp: number): { level: number; currentLevelXp: number; nextLevelXp: number; progress: number } {
  let level = 1
  let remaining = totalXp

  while (level < 100) {
    const required = xpForLevel(level)
    if (remaining < required) {
      return {
        level,
        currentLevelXp: remaining,
        nextLevelXp: required,
        progress: Math.round((remaining / required) * 100),
      }
    }
    remaining -= required
    level++
  }

  return { level: 100, currentLevelXp: remaining, nextLevelXp: 0, progress: 100 }
}

export async function getStudentXP(studentId: string) {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('total_xp, level, rank')
    .eq('id', studentId)
    .single()

  if (error) return { data: null, error: error.message }

  const levelInfo = calculateLevel(profile.total_xp || 0)

  return {
    data: {
      totalXp: profile.total_xp || 0,
      ...levelInfo,
      rank: profile.rank || 'beginner',
      canTakeRankExam: levelInfo.level >= 30,
    },
    error: null,
  }
}

export async function grantXP(studentId: string, amount: number, reason: string, sourceType?: string, sourceId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '인증이 필요합니다.' }

  // Insert XP log
  const { error: logError } = await supabase.from('xp_logs').insert({
    student_id: studentId,
    amount,
    reason,
    source_type: sourceType || 'manual',
    source_id: sourceId || null,
    granted_by: user.id,
  })

  if (logError) return { error: logError.message }

  // Update total XP
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp')
    .eq('id', studentId)
    .single()

  const newTotalXp = (profile?.total_xp || 0) + amount
  const { level } = calculateLevel(newTotalXp)

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      total_xp: newTotalXp,
      level,
    })
    .eq('id', studentId)

  if (updateError) return { error: updateError.message }

  // Log activity
  await supabase.from('activity_logs').insert({
    student_id: studentId,
    activity_type: 'xp_gained',
    metadata: { amount, reason },
  })

  revalidatePath('/dashboard')
  return { error: null, newTotalXp, newLevel: level }
}

export async function getXPHistory(studentId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('xp_logs')
    .select(`
      *,
      profiles!xp_logs_granted_by_fkey (name)
    `)
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function canTakeRankExam(studentId: string) {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('level, rank')
    .eq('id', studentId)
    .single()

  if (!profile) return { canTake: false, reason: '프로필을 찾을 수 없습니다.' }

  if ((profile.level || 1) < 30) {
    return { canTake: false, reason: `레벨 30 이상이어야 합니다. (현재: ${profile.level})` }
  }

  // Check if already has a pending exam
  const { data: pendingExam } = await supabase
    .from('rank_exams')
    .select('id')
    .eq('student_id', studentId)
    .in('status', ['pending', 'in_progress'])
    .maybeSingle()

  if (pendingExam) {
    return { canTake: false, reason: '이미 진행 중인 시험이 있습니다.' }
  }

  return { canTake: true, reason: null }
}

export async function startRankExam(studentId: string) {
  const supabase = await createClient()

  const eligibility = await canTakeRankExam(studentId)
  if (!eligibility.canTake) return { error: eligibility.reason }

  const { data, error } = await supabase.from('rank_exams').insert({
    student_id: studentId,
    status: 'pending',
    started_at: new Date().toISOString(),
  }).select().single()

  if (error) return { error: error.message }
  return { data, error: null }
}

export async function completeRankExam(examId: string, passed: boolean, score: number, feedback?: string) {
  const supabase = await createClient()

  const { data: exam, error: fetchError } = await supabase
    .from('rank_exams')
    .select('student_id')
    .eq('id', examId)
    .single()

  if (fetchError || !exam) return { error: '시험을 찾을 수 없습니다.' }

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('rank_exams')
    .update({
      status: passed ? 'passed' : 'failed',
      score,
      feedback: feedback || null,
      examined_by: user?.id,
      completed_at: new Date().toISOString(),
    })
    .eq('id', examId)

  if (error) return { error: error.message }

  // If passed, upgrade rank
  if (passed) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('rank')
      .eq('id', exam.student_id)
      .single()

    const rankOrder = ['beginner', 'intermediate', 'advanced', 'expert', 'master']
    const currentIndex = rankOrder.indexOf(profile?.rank || 'beginner')
    const nextRank = rankOrder[Math.min(currentIndex + 1, rankOrder.length - 1)]

    await supabase
      .from('profiles')
      .update({ rank: nextRank })
      .eq('id', exam.student_id)
  }

  revalidatePath('/dashboard')
  return { error: null }
}

export async function getRankExams(studentId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('rank_exams')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}
