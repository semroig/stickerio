import { cookies } from "next/headers";
import { createServerClient } from '@supabase/ssr'

import Navbar from "@/components/custom/landing/navbar"
import Footer from "@/components/custom/landing/footer"

import Image from 'next/image';
import {
  Card,
  CardContent
} from "@/components/ui/card";

import ProductInputSection from "@/components/custom/productInputSection";

export default async function Home({ params }: any) {
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
      <>
        <Navbar />
        <div className="flex flex-row justify-center px-20 mt-8">
          <div className="m-6 basis-2/5">
            <Card className="w-fit rounded-lg pt-5">
              <CardContent>
                  <Image
                      src={product![0].image_url}
                      width={600}
                      height={600}
                      alt="Picture of the author"
                      className='rounded-lg'
                  />
              </CardContent>
            </Card>
          </div>
          <div className="m-6 basis-2/5">

            <p className="font-medium text-3xl text-verde">{ product![0].name }</p>
            <p className="text-lg mt-3 text-gris">{ product![0].description }</p>
            {/* <p className="font-light text-5xl my-10 ">$ 200</p> */}

            <ProductInputSection record={product![0]}></ProductInputSection>
          </div>
        </div>
        <Footer />
      </>
    )
}
