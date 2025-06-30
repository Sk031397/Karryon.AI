import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createSupabaseServer } from "@/lib/server"
export async function POST(req:Request) {
  const supabase = createSupabaseServer()

  const { agent_name,agent_type,id,agent_description,agent_url} = await req.json();
  const { error } = await supabase.from('agents').upsert({
    id,
    agent_name,
    agent_type,
    agent_description,
    agent_url
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
