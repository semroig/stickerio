'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr'

export default function OAuthForm() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const loginWithGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            // options: {
            //     redirectTo: `${Location.origin}/app/callback`
            // }
        })
    }

    return (
        <Button className='w-full' onClick={loginWithGoogle}>Log in with Google</Button>
    )
}