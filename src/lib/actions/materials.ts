'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMaterials() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('learning_materials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function getMaterialById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('learning_materials')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function createMaterial(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '인증이 필요합니다.' }

  const file = formData.get('file') as File
  if (!file) return { error: '파일을 선택해주세요.' }

  // Upload file to storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `materials/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('learning-materials')
    .upload(filePath, file, { upsert: false })

  if (uploadError) return { error: '파일 업로드에 실패했습니다: ' + uploadError.message }

  const { data: urlData } = supabase.storage
    .from('learning-materials')
    .getPublicUrl(filePath)

  const { error } = await supabase.from('learning_materials').insert({
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    category: formData.get('category') as string || null,
    track_id: formData.get('track_id') as string || null,
    file_url: urlData.publicUrl,
    file_type: file.type,
    file_size: file.size,
    file_name: file.name,
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
    created_by: user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard/materials')
  return { error: null }
}

export async function updateMaterial(id: string, formData: FormData) {
  const supabase = await createClient()

  const updates: Record<string, unknown> = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    category: formData.get('category') as string || null,
    track_id: formData.get('track_id') as string || null,
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
    updated_at: new Date().toISOString(),
  }

  const file = formData.get('file') as File
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `materials/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('learning-materials')
      .upload(filePath, file, { upsert: false })

    if (uploadError) return { error: '파일 업로드에 실패했습니다.' }

    const { data: urlData } = supabase.storage
      .from('learning-materials')
      .getPublicUrl(filePath)

    updates.file_url = urlData.publicUrl
    updates.file_type = file.type
    updates.file_size = file.size
    updates.file_name = file.name
  }

  const { error } = await supabase
    .from('learning_materials')
    .update(updates)
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/materials')
  return { error: null }
}

export async function deleteMaterial(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('learning_materials')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/materials')
  return { error: null }
}

export async function recordMaterialView(materialId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('material_views').upsert({
    material_id: materialId,
    student_id: user.id,
    viewed_at: new Date().toISOString(),
  }, { onConflict: 'material_id,student_id' })

  // Log activity
  await supabase.from('activity_logs').insert({
    student_id: user.id,
    activity_type: 'material_view',
    metadata: { material_id: materialId },
  })
}
