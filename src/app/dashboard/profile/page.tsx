'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getProfileStats, getActivityHeatmap, getRecentActivity } from '@/lib/actions/profile'
import { getStudentXP } from '@/lib/actions/xp'
import { User, BarChart3, FileText, BookOpen, Zap, Award, Target, TrendingUp } from 'lucide-react'
import { useParentPin } from '@/hooks/useParentPin'

interface ProfileData {
  profile: {
    id: string; name: string; email: string; role: string;
    level: number; total_xp: number; rank: string; birth_date: string;
  }
  stats: {
    totalSubmissions: number; solvedProblems: number; accuracy: number;
    notesCount: number; materialsViewed: number;
  }
  xpLogs: { amount: number; reason: string; created_at: string }[]
  rankExams: { status: string; score: number; created_at: string }[]
}

interface XPData {
  totalXp: number; level: number; currentLevelXp: number;
  nextLevelXp: number; progress: number; rank: string; canTakeRankExam: boolean;
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null)
  const [xpData, setXpData] = useState<XPData | null>(null)
  const [heatmap, setHeatmap] = useState<Record<string, number>>({})
  const [recentActivity, setRecentActivity] = useState<{
    submissions: unknown[]; materialViews: unknown[]; notes: unknown[]
  }>({ submissions: [], materialViews: [], notes: [] })
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const { pin, regeneratePin } = useParentPin(userId)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)

      const [profileResult, xpResult, heatmapResult, activityResult] = await Promise.all([
        getProfileStats(user.id),
        getStudentXP(user.id),
        getActivityHeatmap(user.id),
        getRecentActivity(user.id),
      ])

      if (profileResult.data) setData(profileResult.data as unknown as ProfileData)
      if (xpResult.data) setXpData(xpResult.data)
      if (heatmapResult.data) setHeatmap(heatmapResult.data)
      if (activityResult.data) setRecentActivity(activityResult.data as typeof recentActivity)
      setLoading(false)
    }
    load()
  }, [])

  const rankLabels: Record<string, string> = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
    expert: '전문가',
    master: '마스터',
  }

  const rankColors: Record<string, string> = {
    beginner: '#10B981',
    intermediate: '#3B82F6',
    advanced: '#F59E0B',
    expert: '#EF4444',
    master: '#2563eb',
  }

  // Generate heatmap grid (last 365 days)
  const renderHeatmap = () => {
    const days = 365
    const cells = []
    const today = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const count = heatmap[dateStr] || 0

      let bg = 'rgba(255,255,255,0.05)'
      if (count >= 10) bg = 'rgba(0,102,255,0.8)'
      else if (count >= 5) bg = 'rgba(0,102,255,0.6)'
      else if (count >= 3) bg = 'rgba(0,102,255,0.4)'
      else if (count >= 1) bg = 'rgba(0,102,255,0.2)'

      cells.push(
        <div
          key={dateStr}
          className="w-2.5 h-2.5 rounded-sm"
          style={{ background: bg }}
          title={`${dateStr}: ${count}건`}
        />
      )
    }
    return cells
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) return <div className="text-center py-12">프로필을 불러올 수 없습니다.</div>

  const { profile, stats } = data

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="glass-premium rounded-2xl p-6" style={{ border: '1px solid var(--color-border)' }}>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
            style={{ background: 'var(--gradient-primary)', color: '#fff' }}>
            {profile.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: `${rankColors[profile.rank || 'beginner']}20`, color: rankColors[profile.rank || 'beginner'] }}>
                {rankLabels[profile.rank || 'beginner']}
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Lv.{xpData?.level || profile.level || 1}
            </p>

            {/* XP Progress Bar */}
            {xpData && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    XP: {xpData.currentLevelXp} / {xpData.nextLevelXp}
                  </span>
                  <span style={{ color: 'var(--color-accent-cyan)' }}>
                    총 {xpData.totalXp} XP
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${xpData.progress}%`, background: 'var(--gradient-primary)' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parent Access PIN */}
      {pin && (
        <div className="glass-premium rounded-xl p-5" style={{ border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-sm mb-1 flex items-center gap-2">
                <span style={{ fontSize: 16 }}>🔐</span>
                학부모 접속 코드
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                학부모님께 이 코드를 알려드리면 학습 현황을 확인할 수 있습니다.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <code className="text-2xl font-bold tracking-[0.3em] px-4 py-2 rounded-xl" 
                style={{ background: 'rgba(99,102,241,0.1)', color: '#3b82f6', fontFamily: "'JetBrains Mono', monospace" }}>
                {pin}
              </code>
              <button onClick={regeneratePin} className="text-xs px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', cursor: 'pointer' }}
                title="새 코드 생성">
                🔄 재발급
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: '풀은 문제', value: stats.solvedProblems, icon: <Target size={16} />, color: '#10B981' },
          { label: '총 제출', value: stats.totalSubmissions, icon: <BarChart3 size={16} />, color: '#3B82F6' },
          { label: '정답률', value: `${stats.accuracy}%`, icon: <TrendingUp size={16} />, color: '#F59E0B' },
          { label: '학습 노트', value: stats.notesCount, icon: <FileText size={16} />, color: '#2563eb' },
          { label: '학습 자료', value: stats.materialsViewed, icon: <BookOpen size={16} />, color: '#06B6D4' },
        ].map((stat, i) => (
          <div key={i} className="glass-premium rounded-xl p-4 text-center" style={{ border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-center mb-2" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Activity Heatmap */}
      <div className="glass-premium rounded-xl p-6" style={{ border: '1px solid var(--color-border)' }}>
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Zap size={16} style={{ color: 'var(--color-primary)' }} />
          학습 활동
        </h2>
        <div className="flex flex-wrap gap-0.5 overflow-hidden">
          {renderHeatmap()}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          <span>적음</span>
          {['rgba(255,255,255,0.05)', 'rgba(0,102,255,0.2)', 'rgba(0,102,255,0.4)', 'rgba(0,102,255,0.6)', 'rgba(0,102,255,0.8)'].map((bg, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: bg }} />
          ))}
          <span>많음</span>
        </div>
      </div>

      {/* XP History */}
      {data.xpLogs.length > 0 && (
        <div className="glass-premium rounded-xl p-6" style={{ border: '1px solid var(--color-border)' }}>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Award size={16} style={{ color: 'var(--color-accent-cyan)' }} />
            경험치 이력
          </h2>
          <div className="space-y-2">
            {data.xpLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold" style={{ color: 'var(--color-accent-cyan)' }}>+{log.amount}</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{log.reason}</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {new Date(log.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rank Exams */}
      {data.rankExams.length > 0 && (
        <div className="glass-premium rounded-xl p-6" style={{ border: '1px solid var(--color-border)' }}>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <User size={16} style={{ color: 'var(--color-accent-purple)' }} />
            승급 시험 기록
          </h2>
          <div className="space-y-2">
            {data.rankExams.map((exam, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: exam.status === 'passed' ? 'rgba(16,185,129,0.2)' : exam.status === 'failed' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                    color: exam.status === 'passed' ? '#10B981' : exam.status === 'failed' ? '#EF4444' : '#F59E0B',
                  }}>
                  {exam.status === 'passed' ? '합격' : exam.status === 'failed' ? '불합격' : '대기'}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {exam.score != null && `${exam.score}점 | `}
                  {new Date(exam.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
