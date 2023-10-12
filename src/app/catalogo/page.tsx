import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from 'react';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tarjeta from "@/components/custom/tarjeta";
import Link from 'next/link';

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

export default async function Home() {

  // Traigo todas las categorias
  const supabase = createServerSupabaseClient();
  const { data: categories } = await supabase.from("Category").select();
  const { data: products } = await supabase.from("Product").select();

  function cosa(){
    console.log("cosa");
  }

  return (
    <div>
      <div className="flex flex-row justify-center px-20 mt-5">
        <div className="m-6 basis-1/4">
          <p className="font-semibold text-2xl mb-8">Buscar por Categoría</p>

          {categories?.map((category) => (
            <p className="text-lg my-4" key={category.id}>{category.name}</p>
          ))}

        </div>
        <div className="m-6 basis-2/3">
          <div className="flex flex-wrap">

            {products?.map((product) => (
              <div key={product.id}>
                <Link href="/">
                  <Tarjeta record={product}></Tarjeta>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
