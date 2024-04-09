import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import createSupabaseServerClient from "@/lib/supabase/server";

import Navbar from "@/components/custom/landing/navbar";
import Footer from "@/components/custom/landing/footer";

import CheckoutFinalSection from "@/components/custom/checkoutFinalSection";

export default async function Home() {
  const { data: sessionData } = await readUserSession();
  if(!sessionData.session) return redirect('/login');

  // Inicializo cliente de supabase
  const supabase = await createSupabaseServerClient();

  // Traigo todos los cart items
  const { data: items, error } = await supabase
    .from("CartItem")
    .select(`*, Product(*)`);
  if (error) console.error(error);

  return (
    <>
      <Navbar userSessionData={sessionData.session} />

      <div className="flex justify-center">
        <div className="basis-1/2">
          <CheckoutFinalSection records={items} />
        </div>
      </div>

      <Footer />
    </>
  )
}