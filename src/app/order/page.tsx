import { redirect } from 'next/navigation';
import Link from 'next/link';

import readUserSession from '@/lib/actions'
import createSupabaseServerClient from "@/lib/supabase/server";

import Navbar from "@/components/custom/landing/navbar"
import Footer from "@/components/custom/landing/footer"

import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ShoppingBag } from 'lucide-react';

export default async function Pedidos() {
    const { data: sessionData } = await readUserSession();
    if(!sessionData.session) return redirect('/login');

    // Inicializo cliente de supabase
    const supabase = await createSupabaseServerClient();

    // Traigo todos los cart items
    const { data: orders, error } = await supabase
        .from("Order")
        .select('*')
        .eq('user_id', sessionData.session.user.id);

    if (orders) console.log(orders)
    if (error) console.error(error);

    return (
        <>
            <Navbar userSessionData={sessionData.session} />

            <div className='flex justify-center mt-10 lg:mt-20'>
                <p className='text-3xl lg:text-4xl text-verde'>Mis pedidos</p>

            </div>

            <div className="flex flex-wrap justify-center mt-5">
                {orders?.map((order) => (
                    <div key={order.id}>
                        <Card 
                            className="p-4 hover:cursor-pointer w-fit m-2 lg:m-3 rounded-lg shadow-md hover:shadow-xl"
                        >
                            <Link href={`/order/${order.id}`}>
                                <CardHeader className="px-4 pb-4">
                                    <CardTitle className='flex justify-center font-medium text-gris'>
                                        <ShoppingBag className='mr-3'/>
                                        <p>Pedido #{order.id}</p>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-lg text-verde'>Estado: {order.estado}</p>
                                    <p className='mt-2 text-lg text-gris'>Entrega: {order.metodo_entrega.label}</p>
                                    <p className='mt-1 text-lg text-gris'>Total: {order.total}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className='mt-3 w-full px-12 py-6 text-xl font-normal text-crema whitespace-nowrap bg-naranja rounded-[50px]'
                                    >
                                        Ver pedido
                                    </Button>
                                </CardFooter>
                            </Link>
                        </Card>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    )
}