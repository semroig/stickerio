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
  if (searchParams.category){
    const filteringCategories = searchParams.category.split('-');
    resp = await supabase
    .from("Product")
    .select("*", { count: 'exact' })
    .in('collection_id', filteringCategories)
    .range((pagina - 1) * 12, pagina * 12 - 1)
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

          {/* Pagination */}
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
    </div>
  )
}