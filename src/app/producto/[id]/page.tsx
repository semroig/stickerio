import { cookies } from "next/headers";
import { createServerClient } from '@supabase/ssr'

import readUserSession from '@/lib/actions'

import Navbar from "@/components/custom/landing/navbar"
import Footer from "@/components/custom/landing/footer"

import Image from 'next/image';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import ProductInputSection from "@/components/custom/productInputSection";

import { ArrowLeft } from 'lucide-react';
import { Check, ChevronsUpDown, AlertCircle } from "lucide-react"

export default async function Home({ params }: any) {
    // Verifico si esta logueado
    const { data: sessionData } = await readUserSession();

    // Obtengo id de prod y busco registro
    const { id } = params;
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
    const { data: product } = await supabase
        .from("Product").select().eq('id', id);

    return (
      <div>
        <Navbar userSessionData={ sessionData.session } />

        <Link href={'/catalogo'} className="text-gris text-lg font-light flex mx-5 mt-5 lg:mx-48 lg:mt-8">
          <ArrowLeft color="#016241" className="mr-1"/> Volver al catálogo
        </Link>

        <div className="lg:flex lg:flex-row lg:justify-center lg:px-20">
          <div className="m-6 basis-2/5">
            <Image
                src={product![0].image_url}
                width={500}
                height={500}
                alt="Picture of the author"
                className='rounded-lg'
            />
          </div>
          <div className="m-6 basis-2/5">

            <p className="font-medium text-4xl lg:text-5xl text-verde">{ product![0].name }</p>
            <p className="text-xl mt-3 text-gris font-light">{ product![0].description }</p>
            {/* <p className="font-light text-5xl my-10 ">$ 200</p> */}

            {!sessionData.session && (
              <Alert className="mt-20 p-7">
                  <AlertTitle>Hola! :)</AlertTitle>
                  <AlertDescription>
                      Para poder agregar este sticker a tu carrito tenes que ingresar a tu cuenta.
                  </AlertDescription>
              </Alert>
            )}

            {sessionData.session && <ProductInputSection record={product![0]} userSessionData={ sessionData.session } />}

          </div>
        </div>

        <Footer />

      </div>
    )
}
