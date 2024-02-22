"use server";

import { cookies } from "next/headers";
import { createServerClient } from '@supabase/ssr'
import { z } from "zod";

// Inicializo cliente de supabase
const cookieStore = cookies()
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  }
)

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

// export async function deleteTodo(
//   prevState: {
//     message: string;
//   },
//   formData: FormData,
// ) {
//   const schema = z.object({
//     id: z.string().min(1),
//     todo: z.string().min(1),
//   });
//   const data = schema.parse({
//     id: formData.get("id"),
//     todo: formData.get("todo"),
//   });

//   try {
//     await sql`
//       DELETE FROM todos
//       WHERE id = ${data.id};
//     `;

//     revalidatePath("/");
//     return { message: `Deleted todo ${data.todo}` };
//   } catch (e) {
//     return { message: "Failed to delete todo" };
//   }
// }
