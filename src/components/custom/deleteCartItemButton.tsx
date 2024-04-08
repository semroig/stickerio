'use client';

import { useTransition } from "react";
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Trash2, Loader } from "lucide-react";

export default function DeleteCartItemButton({ recordId }: any) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { toast } = useToast()

    async function callToDelete () {
        startTransition(async () => {
            const resultado = await deleteItem();

            // Verifico el resultado del request y muestro toast
            if (resultado.message === "Success") {
                toast({
                    title: `Exito!`,
                    description: "Producto eliminado del carrito.",
                    duration: 3000,
                    action: <ToastAction altText="Oki">Genial</ToastAction>
                });
            }
            else {
                toast({
                    title: `Error code ${resultado.code}: ${resultado.message}`,
                    description: resultado.hint,
                    duration: 4000,
                    action: <ToastAction altText="Oki">Oki</ToastAction>,
                    variant: "destructive"
                });
            }

            // Hago refresh para que vuelva a cargar la data
            router.refresh();
        })

        // hacer algun toast
    }

    // Funcion que elimina cart item de database
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
            return { code: error.code, message: error.message, hint: error.hint };
        }

        return { message: "Success" };
    }

    return (
        <div>
            { isPending 
                ? <Loader className="animate-spin" />
                : <Trash2 onClick={callToDelete} className="cursor-pointer" />
            }
        </div>
    )
}