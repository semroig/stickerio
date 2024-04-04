'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTransition, useState } from "react";
import Link from 'next/link'

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
import { signUpWithEmailAndPassword } from "@/app/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Loader2, AlertCircle } from "lucide-react"

const FormSchema = z
	.object({
    name: z.string().min(1, {
			message: "Name is required.",
		}),
		email: z.string().email(),
		password: z.string().min(6, {
			message: "La contraseña debe tener al menos 6 caracteres.",
		}),
		confirm: z.string().min(6, {
			message: "La contraseña debe tener al menos 6 caracteres.",
		}),
	})
	.refine((data) => data.confirm === data.password, {
		message: "Password did not match",
		path: ["confirm"],
	});

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [errorGenerated, setErrorGenerated] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
      name: "",
			email: "",
			password: "",
			confirm: "",
		},
	});

	async function onSubmit(datos: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await signUpWithEmailAndPassword(datos);
      const { error }  = JSON.parse(result);
      if(error) {
        console.error(error.message);

        // Cambio estado del error para renderizar alert
        setErrorGenerated(error.message);
      }
      else {
        console.log('todo ok el registro');

        // TO DO: ocultar form y mostrar cartel de confirmation
        setEmail(datos.email);
      }
    })

		// toast({
		// 	title: "You submitted the following values:",
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">
		// 				{JSON.stringify(data, null, 2)}
		// 			</code>
		// 		</pre>
		// 	),
		// });
	}

  // TO DO: que salga un asterisco rojo indicando que es required

  return (
    <div>
      <div className="lg:mx-72">
        <Link href={"/"} className="my-auto">
            <img className="mx-auto h-10 w-auto" src="https://cdn.builder.io/api/v1/image/assets/TEMP/30921df5111aa506c586a7551e38e7484402027c4872fe944ecc79a426346910?apiKey=6c89b4a2db244c5d969134d9199949c2&" alt="Your Company" />
        </Link>
      </div>

      {/* Renderizado condicional de tarjeta confirmation */}
      {email === '' ? 
        (
          <div>
            <h2 className="mt-10 text-center text-2xl font-semibold text-verde">
              Crear una cuenta nueva
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Carlos" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repetir contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {errorGenerated !== '' && (
                    <Alert variant="destructive" className="my-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error al crear el usuario</AlertTitle>
                      <AlertDescription>{errorGenerated}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" disabled={isPending} className="w-full">
                    Registrarse
                    { isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <></>}
                  </Button>
                </form>
              </Form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Ya tenés una cuenta? {" "}
                <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Ingresar con mi cuenta</Link>
              </p>
            </div>

          </div>
        ) :
        (
          <div className="lg:mx-72">
            <div className="mx-7">
              <p className="mt-10 text-2xl lg:text-3xl font-bold text-verde">Estas a un paso de crear tu cuenta!</p>

              <p className="mt-5 text-sm lg:text-lg text-gris">
                  Te enviamos un link a <a className='font-semibold'>{ email } </a>{" "}
                  para que valides tu usuario. Por las dudas podes revisar tu casilla de spam.
              </p>

              {/* TO DO: hacer andar el botond e reenviar mail */}
              {/* <p className="mt-10 text-center text-sm text-gray-500">
                  Todavia no lo recibiste? {" "}
                  <Link href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Reenviar link</Link>
              </p> */}
            </div>
          </div>
        )
      }
    </div>
  )
}
