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
            <Card className="m-3" >
                <CardContent>
                    <Image
                        src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        width={450}
                        height={450}
                        alt="Picture of the author"
                    />
                </CardContent>
            </Card>
          </div>
          <div className="m-6 basis-2/5">

            <p className="font-semibold text-3xl">{ product![0].name }</p>
            <p className="text-lg mt-3">Descripción bla bla</p>
            <p className="font-semibold text-5xl my-10">$ 200</p>

            <ProductInputSection record={product![0]}></ProductInputSection>
          </div>
        </div>
        <Footer />
      </>
    )
}
