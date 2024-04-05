// DEPRECADO

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

    const result = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            emailRedirectTo: 'http://localhost:3000/signup/confirmation',
            // emailRedirectTo: 'https://stickerio-ekqv-git-dev-semroigs-projects.vercel.app/signup/confirmation'
        }
    });

    console.log(result);

    // Once the user is signed up, update their profile to include additional data
    if (!result.error) {
        const { data: usuario } = result;
        const response = await supabase
            .from('UserData')
            .insert([{ 
                id: usuario!.user!.id,
                name: formData.name
            }])
            .select();

        if (response.error) {
            console.error(response.error)
            return JSON.stringify(response);
        }
    }
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