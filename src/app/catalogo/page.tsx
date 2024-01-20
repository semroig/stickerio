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
import Link from 'next/link';
import Tarjeta from "@/components/custom/tarjeta";
import CategoriesSection from "@/components/custom/categoriesSection";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

export default async function Home({ searchParams }) {
  // Inicializo cliente de supabase
  const supabase = createServerSupabaseClient();

  // Traigo todas las categorias
  const { data: categories } = await supabase.from("Category").select();

  console.log('searchParams');
  console.log(searchParams);

  let resp;
  if (searchParams.category){
    console.log('entre en if');

    let filteringCategories = searchParams.category.split('-');
    resp = await supabase
    .from("Product")
    .select("*")
    .in('category_id', filteringCategories);
  }
  else {
    resp = await supabase
    .from("Product")
    .select("*");
  }

  console.log(resp);

  return (
    <div>
      <div className="flex flex-row justify-center px-20 mt-5">
        <div className="m-6 basis-1/4">
          <p className="font-semibold text-2xl mb-8">Buscar por Categoría</p>

          <CategoriesSection records={categories}></CategoriesSection>

        </div>
        <div className="m-6 basis-2/3">
          <div className="flex flex-wrap">

            {resp.data?.map((product) => (
              <div key={product.id}>
                <Tarjeta record={product}></Tarjeta>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}