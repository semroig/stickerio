import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  const url = new URL(req.url);
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { error : AuthError } = await supabase.auth.signOut();
  if (AuthError) console.error(AuthError);
  cookieStore.delete('sb-djsmnvyjnyzdvonkzqrh-auth-token')

  return NextResponse.redirect(url.origin, {
    status: 301
  });
}
