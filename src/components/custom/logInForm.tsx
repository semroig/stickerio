'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { signInWithEmailAndPassword } from "@/app/(auth)/actions"
import { useTransition } from "react";

const FormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6, {
			message: "La contraseña debe tener al menos 6 caracteres.",
		}),
	})

export default function LogInForm() {
    const [isPending, startTransition] = useTransition();

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
            const { error }  = JSON.parse(result);
            if(error) console.error(error.message)
            else console.log('todo ok el registro');
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

            {/* Usar isPending para renderizado condicional de boton con spinner */}
    
            <Button type="submit">Ingresar</Button>
            </form>
        </Form>
    )
}
