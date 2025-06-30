import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/server';

export async function GET() {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase.from('agents').select('*');

  if (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ agents: data }, { status: 200 });
}
