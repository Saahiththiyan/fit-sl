import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST (request) {
  const { title } = await request.json()

  const supabase = createClient()

  const { data } = await supabase.from('posts').insert({ title }).select()
  return NextResponse.json(data)
}
