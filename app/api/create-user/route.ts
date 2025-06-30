import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { currentUser } from '@clerk/nextjs/server';
import { createSupabaseServer } from "@/lib/server"
export async function POST() {
  const user = await currentUser();
  const supabase = createSupabaseServer()

  if (!user || !user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { error } = await supabase.from('users').upsert({
    id:user.id,
    email:user.emailAddresses[0]?.emailAddress,
    full_name:user.fullName,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
