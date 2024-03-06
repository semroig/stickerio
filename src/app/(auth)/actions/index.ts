'use server'

import createSupabaseServerClient from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword(data: {
    name: string;
    email: string;
    password: string;
    confirm: string;
}){
    const supabase = await createSupabaseServerClient();

    // TO DO: como enviar el nombre para que se guarde en la tabla de user data

    const result = await supabase.auth.signUp({email: data.email, password: data.password});
    return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
    email: string;
    password: string;
}){
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword({email: data.email, password: data.password});
    return JSON.stringify(result);
}