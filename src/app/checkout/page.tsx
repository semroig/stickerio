import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import createSupabaseServerClient from "@/lib/supabase/server";

import CheckoutFinalSection from "@/components/custom/checkoutFinalSection";

export default async function Home() {
  const { data } = await readUserSession();
  if(!data.session) return redirect('/login');

  // Inicializo cliente de supabase
  const supabase = await createSupabaseServerClient();

  // Traigo todos los cart items
  const { data: items, error } = await supabase
    .from("CartItem")
    .select(`*, Product(*)`);
  if (error) console.error(error);

  return (
    <div className="flex justify-center">
      <div className="m-5">
        <CheckoutFinalSection records={items} />
      </div>
    </div>
  )
}