import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from 'react';

import { Button } from "@/components/ui/button"
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient({ cookies: () => cookieStore })
})

export default async function Home({ params }: any) {

    // Obtengo id de prod y busco registro
    const { id } = params;
    const supabase = createServerSupabaseClient();
    const { data: products } = await supabase
        .from("Product").select().eq('id', id);

    return (
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

                <p className="font-semibold text-3xl">{ products[0].name }</p>
                <p className="text-lg mt-3">Descripción bla bla</p>
                <p className="font-semibold text-5xl my-10">$ { products[0].price }</p>

                <div className="flex flex-row justify-start mt-8">
                    <div className="basis-1/2">
                        <p className="text-lg my-4">Tamaño:</p>
                        <Button>Click me</Button>
                    </div>
                    <div className="basis-1/2">
                        <p className="text-lg my-4">Cantidad:</p>
                        <Button>Click me</Button>
                    </div>
                </div>
                
                <Button className="mt-8">Click me</Button>

            </div>
        </div>
    )
}
