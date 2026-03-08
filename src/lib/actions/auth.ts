'use server'

import { createClient } from '@/lib/supabase/server'

export async function simpleAuth(name: string, birthDate: string, role: 'student' | 'parent' = 'student') {
  const supabase = await createClient()

  // 이름+생년월일 조합으로 이메일 생성 (Supabase Auth 호환)
  // 한글 이름은 이메일에 사용 불가하므로 hex 인코딩
  const normalizedName = name.trim().toLowerCase().replace(/\s+/g, '')
  const nameHex = Buffer.from(normalizedName).toString('hex')
  const normalizedDate = birthDate.replace(/-/g, '')
  const syntheticEmail = `u${nameHex}_${normalizedDate}@codingssok.local`
  const syntheticPassword = `cs_${normalizedDate}_${nameHex}`

  // 1) 먼저 로그인 시도
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: syntheticEmail,
    password: syntheticPassword,
  })

  if (loginData?.user) {
    return { error: null, isNewUser: false }
  }

  // 2) 로그인 실패 시 -> 회원가입 시도
  if (loginError) {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: syntheticEmail,
      password: syntheticPassword,
      options: {
        data: {
          name: name.trim(),
          role,
          birth_date: birthDate,
        },
      },
    })

    if (signUpError) {
      console.error('[simpleAuth] signUp error:', signUpError.message, signUpError.status)
      if (signUpError.message.includes('already registered')) {
        // 이미 등록된 유저인데 비밀번호가 다를 수 있음
        return { error: '이미 등록된 정보입니다. 이름과 생년월일을 확인해주세요.' }
      }
      return { error: `가입 오류: ${signUpError.message}` }
    }

    // signUp 성공했지만 세션이 없는 경우 (이메일 확인 필요 상태)
    if (signUpData?.user && !signUpData.session) {
      const { data: retryLogin, error: retryError } = await supabase.auth.signInWithPassword({
        email: syntheticEmail,
        password: syntheticPassword,
      })

      if (retryError || !retryLogin?.user) {
        return { error: '가입은 완료되었으나 자동 로그인에 실패했습니다. 다시 시도해주세요.' }
      }

      return { error: null, isNewUser: true }
    }

    // signUp 성공 + 세션도 있음
    if (signUpData?.session) {
      return { error: null, isNewUser: true }
    }

    // 가입 후 로그인
    const { error: autoLoginError } = await supabase.auth.signInWithPassword({
      email: syntheticEmail,
      password: syntheticPassword,
    })

    if (autoLoginError) {
      return { error: '가입은 완료되었으나 로그인에 실패했습니다. 다시 시도해주세요.' }
    }

    return { error: null, isNewUser: true }
  }

  return { error: '알 수 없는 오류가 발생했습니다.' }
}

export async function teacherLogin(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
  }

  return { error: null }
}
