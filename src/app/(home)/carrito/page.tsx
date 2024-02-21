import { cookies } from "next/headers";
import { createServerClient } from '@supabase/ssr'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import TarjetaCarrito from "@/components/custom/tarjetaCarrito";

export default async function Home() {
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

  // Traigo todos los cart items
  const { data: items, error } = await supabase
    .from("CartItem")
    .select(`*, Product(*)`);

  if (error) console.error(error);

  return (
    <div className="flex flex-row justify-center px-20 mt-5">
      <div className="m-6 basis-2/3">
        <p className="font-semibold text-2xl">Carrito</p>

          {items?.map((item : any) => (
            <div key={item.id}>
              <TarjetaCarrito record={item}></TarjetaCarrito>
            </div>
          ))}

      </div>
      <div className="m-6 basis-1/3">
        <p className="font-semibold text-2xl">Resumen de compra</p>
        <Card className="mt-4 pt-5">
          <CardContent>
            <p className="font-semibold text-xl">Dirección</p>
            <p className="text-lg">Maipú 233</p>
            <p className="font-semibold text-xl mt-2">Localidad</p>
            <p className="text-lg">General Pacheco</p>
            <p className="font-semibold text-xl mt-2">Provincia</p>
            <p className="text-lg">Buenos Aires</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">Editar</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
