import type { Metadata } from 'next'
export const metadata: Metadata = { title: "Checkout" }

import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import Link from "next/link";

import createSupabaseServerClient from "@/lib/supabase/server";

import Navbar from "@/components/custom/landing/navbar";
import Footer from "@/components/custom/landing/footer";

import CheckoutFinalSection from "@/components/custom/checkoutFinalSection";

import { ArrowLeft } from 'lucide-react';

export default async function Home() {
  const { data: sessionData } = await readUserSession();
  if(!sessionData.session) return redirect('/login');

  // Inicializo cliente de supabase
  const supabase = await createSupabaseServerClient();

  // Traigo todos los cart items
  const { data: items, error } = await supabase
    .from("CartItem")
    .select(`*, Product(*)`)
    .eq('user_id', sessionData.session.user.id);
  if (error) console.error(error);

  return (
    <>
      <Navbar userSessionData={sessionData.session} />

      <Link href={'/carrito'} className="text-gris text-lg font-light flex mx-5 mt-5 lg:mx-28 lg:mt-14">
        <ArrowLeft color="#016241" className="mr-1"/> Volver al carrito
      </Link>

      <CheckoutFinalSection records={items} userSessionData={sessionData.session}/>

      <Footer />
    </>
  )
}