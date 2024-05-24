"use server"

import { z } from "zod";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function addItem(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
    const form = Object.fromEntries(formData.entries());

    const schema = z.object({
        size: z.string().min(1),
        cantidad: z.number().int().gt(0).lt(100),
        id: z.string().min(1),
        user_id: z.string().min(1),
    });
    const parse = schema.safeParse({
        size: form.size,
        cantidad: typeof form.cantidad === 'string' ? parseInt(form.cantidad) : undefined,
        id: form.id,
        user_id: form.user_id,
    });

    if (!parse.success) {
        console.error(parse.error.errors[0].message)
        return { message: parse.error.errors[0].message };
    }
    const parsedData = parse.data;

    const supabase = await createSupabaseServerClient();

    // Inserto cart items
    const { data, error } = await supabase
        .from('CartItem')
        .insert([{ 
            product_id: parsedData.id,
            size: parsedData.size,
            quantity: parsedData.cantidad,
            user_id: parsedData.user_id
        }])
        .select();

    if (error) {
        console.error(error)
        return { message: "Failed to create cart item" };
    }
    if (data) {
        return { message: "Success" };
    }
}

export async function signUpWithEmailAndPassword(formData: {
    name: string;
    email: string;
    password: string;
    confirm: string;
}){
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            emailRedirectTo: process.env.EMAIL_CONFIRMATION_REDIRECT_URL,
            data: {
                display_name: formData.name
            }
        }
    });
    return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
    email: string;
    password: string;
}){
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    });
    return JSON.stringify(result);
}