import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
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

  const formData = await req.formData();
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  await supabase
    .auth
    .signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
        data: {
          first_name: name
        }
      }
    });

  return NextResponse.redirect(url.origin, {
    status: 301
  });
}
