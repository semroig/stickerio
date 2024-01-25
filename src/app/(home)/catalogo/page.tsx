import 'server-only'

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cache } from 'react';

import Tarjeta from "@/components/custom/tarjeta";
import CategoriesSection from "@/components/custom/categoriesSection";

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

export default async function Home({ searchParams }: any) {
  // Inicializo cliente de supabase
  const supabase = createServerSupabaseClient();

  // Traigo todas las categorias
  const { data: categories } = await supabase.from("Category").select();

  // Traigo los prods segun search params de categories seleccionados
  let resp;
  if (searchParams.category){
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