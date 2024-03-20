"use server";

import { z } from "zod";

import createSupabaseServerClient from "@/lib/supabase/server";

export default async function addItem(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
    const schema = z.object({
        size: z.string().min(1),
        cantidad: z.string().min(1),
        id: z.string().min(1)
    });
    const parse = schema.safeParse({
        size: formData.get("size"),
        cantidad: formData.get("cantidad"),
        id: formData.get("id")
    });

    if (!parse.success) {
        console.error("Failed to create cart item")
        return { message: "Failed to create cart item" };
    }
    const parsedData = parse.data;

    const supabase = await createSupabaseServerClient();

    // Inserto cart items
    const { data, error } = await supabase
        .from('CartItem')
        .insert([{ 
            product_id: parsedData.id,
            size: parsedData.size,
            quantity: parsedData.cantidad
        }])
        .select();

    if (error) {
        console.error(error)
        return { message: "Failed to create cart item" };
    }
    if (data) {
        console.log(data)
        return { message: "Success" };
    }
}