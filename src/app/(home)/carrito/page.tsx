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
import { Trash2 } from "lucide-react"
import Link from "next/link";

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

  // Itero por los items para sumar totales
  let cantChicos = 0;
  let cantGrandes = 0;
  items?.forEach((element) => {
    if (element.size === 'grande') cantGrandes += element.quantity;
    if (element.size === 'chico') cantChicos += element.quantity;
  })

  return (
    <div className="flex m-20">
      <div className="basis-3/4 ml-10">
        <p className="font-semibold text-2xl">Carrito</p>

        {items?.map((item : any) => (
          <div key={item.id} className="flex items-center">
            <div className="basis-4/5"><TarjetaCarrito record={item}></TarjetaCarrito></div>
            <div className="basis-1/5 ml-5"><Trash2></Trash2></div>
          </div>
        ))}
      </div>
      <div className="basis-1/4 mr-10">
        <p className="font-semibold text-2xl">Resumen</p>
        <Card className="mt-4 pt-5">
          <CardContent>
            {/* <p className="font-semibold text-xl">Dirección</p> */}
            <p className="text-lg text-right my-1">
              Sticker chico x{cantChicos} <span className="ml-3">$ {cantChicos * 400}</span>
            </p>
            <p className="text-lg text-right my-1">
              Sticker grande x{cantGrandes} <span className="ml-3">$ {cantGrandes * 550}</span>
            </p>
            <hr/>
            <p className="text-lg text-right my-1 font-semibold">
              Total (sin envio) <span className="ml-3">$ {cantChicos * 400 + cantGrandes * 550}</span>
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/checkout"><Button>Finalizar compra</Button></Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
