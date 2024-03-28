import { cookies } from "next/headers";
import { createServerClient } from '@supabase/ssr'

import Navbar from "@/components/custom/landing/navbar"
import Footer from "@/components/custom/landing/footer"
import Tarjeta from "@/components/custom/tarjeta";
import CategoriesSection from "@/components/custom/categoriesSection";

export default async function Home({ searchParams }: any) {
  // Inicializo cliente de supabase
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

  // Traigo todas las categorias
  const { data: categories } = await supabase.from("Collection").select();

  // Traigo los prods segun search params de categories seleccionados
  let resp;
  if (searchParams.category){
    let filteringCategories = searchParams.category.split('-');
    resp = await supabase
    .from("Product")
    .select("*")
    .in('collection_id', filteringCategories);
  }
  else {
    resp = await supabase
    .from("Product")
    .select("*");
  }

  return (
    <div>
      <Navbar />

      <div className="flex flex-row justify-center px-20 mt-5">
        <div className="m-6 basis-1/4">
          <p className="font-semibold text-2xl mb-8">Buscar por Categoría</p>
          <CategoriesSection records={categories}></CategoriesSection>
        </div>
        <div className="basis-2/3">
          <div className="flex flex-wrap">

            {resp.data?.map((product) => (
              <div key={product.id}>
                <Tarjeta record={product}></Tarjeta>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}