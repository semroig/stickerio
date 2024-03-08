import { Button } from "@/components/ui/button";
import createSupabaseServerClient from "@/lib/supabase/server";
import React from "react";
import { redirect } from "next/navigation";

export default function SignOut() {
    const logout = async () => {
        'use server';
        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
        redirect("/");
    }

    return (
        <form action={logout}>
            <Button>Salir</Button>
        </form>
    );
}