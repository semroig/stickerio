'use server'

import createSupabaseServerClient from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword(formData: {
    name: string;
    email: string;
    password: string;
    confirm: string;
}){
    const supabase = await createSupabaseServerClient();

    // TO DO: como enviar el nombre para que se guarde en la tabla de user data

    const result = await supabase.auth.signUp(
        {
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: 'http://localhost:3000/signup/confirmation',
                // emailRedirectTo: 'https://stickerio-ekqv-git-dev-semroigs-projects.vercel.app/signup/confirmation'
                // data: {
                //     // You can add any additional user data here
                //     // For example, if you want to include the user's name:
                //     nombre: formData.name
                // },
            }
        },
    );
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