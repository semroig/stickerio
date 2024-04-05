'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import * as z from "zod";

import { signInWithEmailAndPassword } from "@/app/actions"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Loader2 } from "lucide-react"

const FormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6, {
			message: "La contraseña debe tener al menos 6 caracteres.",
		}),
	})

export default function LogInForm() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: ""
		},
	});

	function onSubmit(datos: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const result = await signInWithEmailAndPassword(datos);
            const { data, error }  = JSON.parse(result);
            if (error) console.error(error.message);
            else {
                toast({
                    title: `Bienvenido ${data.user.user_metadata.display_name}!`,
                    description: "Es lindo tenerte de vuelta ;)",
                    duration: 3000,
                    action: <ToastAction altText="Oki">Oki</ToastAction>,
                });
            }
        })
	}

    // TO DO: que salga un asterisco rojo indicando que es required

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input type="email" placeholder="carlos@mail.com" {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="******" {...field} required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="w-full">
                    Ingresar
                    { isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <></>}
                </Button>
            </form>
        </Form>
    )
}
