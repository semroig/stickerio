import createSupabaseServerClient from "@/lib/supabase/server";

import Navbar from "@/components/custom/landing/navbar"
import Footer from "@/components/custom/landing/footer"
import Tarjeta from "@/components/custom/tarjeta";
import CategoriesSection from "@/components/custom/categoriesSection";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Toaster } from "@/components/ui/toaster"

export default async function Home({ searchParams }: any) {
  // Inicializo cliente de supabase
  const supabase = await createSupabaseServerClient();

  // Traigo todas las categorias
  const { data: categories } = await supabase.from("Collection").select();

  // Reviso si hay paginacion
  let pagina = 1;
  if (searchParams.page && searchParams.page >= 1) pagina = parseInt(searchParams.page);

  // Traigo los prods segun search params de categories seleccionados
  let resp;
  let categoriaLanding;
  if (searchParams.category){
    const filteringCategories = searchParams.category.split('-');
    resp = await supabase
    .from("Product")
    .select("*", { count: 'exact' })
    .in('collection_id', filteringCategories)
    .range((pagina - 1) * 12, pagina * 12 - 1)

    if (filteringCategories.length === 1) categoriaLanding = parseInt(filteringCategories[0]);
  }
  else {
    resp = await supabase
    .from("Product")
    .select("*", { count: 'exact' })
    .range((pagina - 1) * 12, pagina * 12 - 1)
  }

  const pagItems = [];
  for (let i = 0; i < resp.count! / 12; i++) {
      pagItems.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href={`/catalogo?category=${searchParams.category ? searchParams.category : ''}&page=${i + 1}`}
            isActive={i + 1 == pagina}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
  }

  return (
    <div>
      <Navbar />

      <div className="lg:flex lg:flex-row lg:justify-center lg:mx-0 lg:px-20 mt-5">
        <div className="m-2 lg:m-6 lg:basis-1/4 mx-10">
          <p className="font-medium text-2xl text-verde">Buscar por Colección</p>
          <CategoriesSection records={categories} categoriaChecked={categoriaLanding} />
        </div>
        <div className="lg:basis-3/4">
          <div className="flex flex-wrap justify-center mt-5 lg:mt-0">
            {resp.data?.map((product) => (
              <div key={product.id}>
                <Tarjeta record={product}></Tarjeta>
              </div>
            ))}
          </div>

          {/* Pagination TO DO: hacerlo un componente aparte */}
          <Pagination className="mt-7">
            <PaginationContent>
              {/* Previous button */}
              {pagina != 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/catalogo?category=${searchParams.category ? searchParams.category : ''}&page=${pagina - 1}`}
                  />
                </PaginationItem>
              )}

              {/* Render all buttons */}
              {pagItems}

              {/* Next button */}
              {pagina != Math.ceil(resp.count! / 12) && (
                <PaginationItem>
                  <PaginationNext
                    href={`/catalogo?category=${searchParams.category ? searchParams.category : ''}&page=${pagina + 1}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>

        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  )
}