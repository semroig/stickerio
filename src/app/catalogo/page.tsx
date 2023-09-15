import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: categories } = await supabase.from("Category").select();

  return (
    <main>
      <h1>Catalogo</h1>
      <Button>Click me</Button>
      <ul className="my-auto text-foreground">
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
       </ul>
    </main>
  )
}
