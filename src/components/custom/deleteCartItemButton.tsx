'use client';

import { useTransition } from "react";
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

import { Trash2 } from "lucide-react";

export default function DeleteCartItemButton({ recordId }: any) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    async function callToDelete () {
        // NO esta agarrando bien las fallas. Por ejemplo, si no se crea el user por emial repetido
        console.log('debuug');
        console.log('recordId', recordId);

        startTransition(async () => {
            const resultado = await deleteItem();
            console.log(resultado);

            // Hago refresh para que vuelva a cargar la data
            router.refresh();
        })

        // hacer algun toast
    }

    async function deleteItem() {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { error } = await supabase
            .from('CartItem')
            .delete()
            .eq('id', recordId)
        
        if (error) {
            console.error(error)
            return { message: "Failed to delete cart item" };
        }

        return { message: "Success" };
    }

    return (
        <Trash2 onClick={callToDelete} className="cursor-pointer"></Trash2>
    )
}