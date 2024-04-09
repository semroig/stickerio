import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import createSupabaseServerClient from "@/lib/supabase/server";

import Navbar from "@/components/custom/landing/navbar"
import Footer from "@/components/custom/landing/footer"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import Link from "next/link";

import TarjetaCarrito from "@/components/custom/tarjetaCarrito";
import DeleteCartItemButton from "@/components/custom/deleteCartItemButton";
import RefresherCarrito from "@/components/custom/refresherCarrito";

export default async function Home() {
  const { data: sessionData } = await readUserSession();
  if(!sessionData.session) return redirect('/login');

  // Inicializo cliente de supabase
  const supabase = await createSupabaseServerClient();

  // Traigo todos los cart items
  const { data: items, error } = await supabase
    .from("CartItem")
    .select(`*, Product(*)`)
    .eq('user_id', sessionData.session.user.id);
  if (error) console.error(error);

  // Itero por los items para sumar totales
  let cantChicos = 0;
  let cantGrandes = 0;
  items?.forEach((element) => {
    if (element.size === 'grande') cantGrandes += element.quantity;
    if (element.size === 'chico') cantChicos += element.quantity;
  })

  return (
    <>
      <Navbar userSessionData={sessionData.session} />

      {/* Componente temporal para hacer refresh al cargar ruta */}
      <RefresherCarrito />

      <div className="flex justify-center mx-28 mt-16">
        <div className="basis-9/12">
          <p className="font-semibold text-2xl">Carrito</p>

          {items?.length === 0 && 
            <p className='m-20'>Aun no hay productos agregados al carrito :(</p>
          }

          {items?.map((item : any) => (
            <div key={item.id} className="flex items-center">
              <div className="basis-11/12">
                <TarjetaCarrito record={item} />
              </div>
              <div className="basis-1/12 ml-5">
                <DeleteCartItemButton recordId={item.id} />
              </div>
            </div>
          ))}
        </div>
        <div className="basis-3/12">
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
              {/* <Link href="/checkout">
                <Button>Finalizar compra</Button>
              </Link> */}
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  )
}
