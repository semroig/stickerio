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
            <Button className="justify-center px-5 py-1.5 border-2 border-naranja border-solid rounded-[50px] font-medium text-lg bg-white hover:bg-white text-naranja">Salir</Button>
        </form>
    );
}