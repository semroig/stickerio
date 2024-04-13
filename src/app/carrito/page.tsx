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

import { ArrowLeft } from 'lucide-react';

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
      
      <Link href={'/catalogo'} className="text-gris text-lg font-light flex mx-5 mt-5 lg:mx-28 lg:mt-14">
        <ArrowLeft color="#016241" className="mr-1"/> Seguir comprando
      </Link>

      <div className="lg:flex lg:justify-center mx-5 lg:mx-28 mt-5 lg:mt-8 lg:gap-20">
        <div className="basis-9/12">
          <p className="font-medium text-3xl lg:text-4xl text-verde">Carrito</p>

          {items?.length === 0 && 
            <p className='m-20'>Aun no hay productos agregados al carrito :(</p>
          }

          <div className='mt-5'>
            {items?.map((item : any) => (
              <TarjetaCarrito record={item} key={item.id}/>
            ))}
          </div>

        </div>
        <div className="basis-3/12">
          <p className="mt-5 font-medium text-3xl lg:text-4xl text-verde">Resumen</p>
          <Card className="mt-5 pt-5 shadow-md">
            <CardContent>
              {/* <p className="font-semibold text-xl">Dirección</p> */}
              <div className='flex justify-between text-lg my-1'>
                <p>Sticker chico x{cantChicos}</p>
                <p>
                  <span className="ml-3 text-right">$ {cantChicos * 450}</span>
                </p>
              </div>
              <div className='flex justify-between text-lg my-1'>
                <p>Sticker grande x{cantGrandes}</p>
                <p>
                  <span className="ml-3 text-right">$ {cantGrandes * 600}</span>
                </p>
              </div>
              <hr/>
              <div className='flex justify-between text-lg my-1 font-semibold'>
                <p>Total (sin envio)</p>
                <p>
                  <span className="ml-3 text-right">$ {cantChicos * 450 + cantGrandes * 600}</span>
                </p>
              </div>
            </CardContent>

            {items?.length !== 0 && 
              <CardFooter className="flex justify-center">
                <Link href="/checkout">
                  <Button className='mt-3 w-full px-12 py-6 text-xl font-normal text-crema whitespace-nowrap bg-naranja rounded-[50px]'>Finalizar compra</Button>
                </Link>
              </CardFooter>
            }

          </Card>
        </div>
      </div>

      <Footer />
    </>
  )
}
