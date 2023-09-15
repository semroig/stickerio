import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {

  // Traigo todas las categorias
  const supabase = createServerComponentClient({ cookies });
  const { data: categories } = await supabase.from("Category").select();
  const { data: products } = await supabase.from("Product").select();

  console.log(products);

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
              <Card className="m-3" key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>Deploy your new one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                    width={200}
                    height={200}
                    alt="Picture of the author"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
