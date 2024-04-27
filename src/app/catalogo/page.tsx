import createSupabaseServerClient from "@/lib/supabase/server";
import readUserSession from '@/lib/actions'

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
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// import { Check, ChevronsUpDown, AlertCircle } from "lucide-react"

export default async function Home({ searchParams }: any) {
  const { data: sessionData } = await readUserSession();

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
    .eq('isActive', true)
    .in('collection_id', filteringCategories)
    .range((pagina - 1) * 12, pagina * 12 - 1)

    if (filteringCategories.length === 1) categoriaLanding = parseInt(filteringCategories[0]);
  }
  else {
    resp = await supabase
    .from("Product")
    .select("*", { count: 'exact' })
    .eq('isActive', true)
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

  // Pagination TO DO: hacerlo un componente aparte

  return (
    <div>
      <Navbar userSessionData={ sessionData.session } />

      <div className="lg:flex lg:flex-row lg:justify-center lg:mx-0 lg:px-20 mt-5 lg:mt-16">
        <div className="lg:m-6 lg:basis-1/5 mx-16 my-7 lg:my-1.5 lg:mx-1">
          <p className="font-medium text-3xl text-verde">Colecciones</p>
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

          <Pagination className="mt-7">
            <PaginationContent>
              {pagina != 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/catalogo?category=${searchParams.category ? searchParams.category : ''}&page=${pagina - 1}`}
                  />
                </PaginationItem>
              )}

              {pagItems}

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

      {/* <div className="container">
        <Alert variant="destructive" className="my-40">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Sitio en mantenimiento, vuelva mas tarde :)
            </AlertDescription>
        </Alert>

      </div> */}

      <Footer />
    </div>
  )
}