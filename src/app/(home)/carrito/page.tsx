import { cookies } from "next/headers";
import { createServerClient } from '@supabase/ssr'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import TarjetaCarrito from "@/components/custom/tarjetaCarrito";

export default async function Home() {
  const { data } = await readUserSession();
  if(!data.session) return redirect('/login');

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
    <div className="flex m-20">
      <div className="basis-3/4 ml-10">
        <p className="font-semibold text-2xl">Carrito</p>

        {items?.map((item : any) => (
          <div key={item.id} className="flex items-center">
            <div className="basis-4/5"><TarjetaCarrito record={item}></TarjetaCarrito></div>
            <p className="basis-1/5 ml-5">delete</p>
          </div>
        ))}
      </div>
      <div className="m-6 basis-1/4">
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
            <Button>Comprar carrito</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
