import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from 'react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import TarjetaCarrito from "@/components/custom/tarjetaCarrito";

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

export default async function Home() {
  // Inicializo cliente de supabase
  const supabase = createServerSupabaseClient();

  // Traigo todo los cart items
  const { data: items } = await supabase.from("CartItem")
    .select(`*, Product(*)`);
  
  console.log('items');
  console.log(items);

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
