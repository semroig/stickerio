import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import Link from "next/link";

import createSupabaseServerClient from "@/lib/supabase/server";

import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle
} from "@/components/ui/card";

import Navbar from "@/components/custom/landing/navbar";
import Footer from "@/components/custom/landing/footer";

import ProgressBar from "@/components/custom/progressBar";
import TarjetaOrder from "@/components/custom/tarjetaOrder";

import { ArrowLeft } from 'lucide-react';

export default async function Home({ params }: any) {
    const { data: sessionData } = await readUserSession();
    if(!sessionData.session) return redirect('/login');

    // Obtengo id de prod y busco registro
    const { id } = params;

    // Inicializo cliente de supabase
    const supabase = await createSupabaseServerClient();
    const { data: order, error: errorOrder } = await supabase
        .from("Order").select().eq('id', id);

    if (errorOrder) console.error(errorOrder);

    // Traigo todos los order items
    const { data: items, error: errorItems } = await supabase
        .from("OrderItem")
        .select(`*, Product(*)`)
        .eq('order_id', order![0].id);

    if (errorItems) console.error(errorItems);

    // Itero por los items para sumar totales
    let cantChicos = 0;
    let cantGrandes = 0;
    items?.forEach((element) => {
        if (element.size === 'grande') cantGrandes += element.quantity;
        if (element.size === 'chico') cantChicos += element.quantity;
    })

    // Itero por los items para sumar totales
    let subTotal = 0;
    items?.forEach((element: any) => {
        if (element.size === 'grande') subTotal += element.quantity * 600;
        if (element.size === 'chico') subTotal += element.quantity * 450;
    })

    return (
        <>
            <Navbar userSessionData={sessionData.session} />

            <Link href={'/order'} className="text-gris text-xl font-light flex mx-5 mt-5 lg:mx-28 lg:mt-14">
                <ArrowLeft color="#016241" className="mr-1.5"/> Ver todos mis pedidos
            </Link>

            <div className="flex justify-center text-center mt-5 lg:mt-8 mx-5">
                <div>
                    <p className="font-medium text-3xl lg:text-4xl text-verde">
                        Código interno del Pedido: #{id}
                    </p>
                    <p className="font-normal text-xl lg:text-2xl mt-3 text-gris">
                        Estado: {order![0].estado}
                    </p>
                </div>
            </div>

            {/* Renderizado en funcion de screen breakpoint */}
            <div className="ml-10 mr-0 px-0 lg:mx-44 mt-14">
                <div className='block lg:hidden ml-10'>
                    <ProgressBar
                        estado={order![0].estado}
                        orientacion="vertical"
                    />
                </div>
                <div className='hidden lg:block'>
                    <ProgressBar 
                        estado={order![0].estado}
                        orientacion="horizontal"
                    />
                </div>
            </div>

            {order![0].estado === 'pendiente' && (

                <div className="flex justify-center text-left mt-5 lg:mt-8 mx-5 lg:mx-80">
                    <Card className="mt-5 pt-5 shadow-md">
                        <CardContent>
                            <div className='p-4'>
                                <p className='text-3xl text-gris'>
                                    Tu pedido permanecerá en {"Pendiente"} hasta que confirmemos tu pago
                                </p>
                                <p className='text-xl text-gris mt-2'>
                                    Tenés que transferir transferir $ {subTotal + order![0].metodo_entrega.price} al alias
                                    <span className='font-medium text-verde'> thestickercompany</span> y enviarnos el
                                    comprobante de pago por mail (a thestickerco.info@gmail.com) o whatsapp (al +54 9 11 2392 0584)!
                                    En cuanto nos escribas, lo antes posible lo vamos a verificar y empezar a preparar tus stickers 🤙
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            
            )}

            {(order![0].estado === 'viaje' && order![0].metodo_entrega.value === 'retiro') && (

                <div className="flex justify-center text-left mt-5 lg:mt-8 mx-5 lg:mx-80">
                    <Card className="mt-5 pt-5 shadow-md">
                        <CardContent>
                            <div className='p-4'>
                                <p className='text-3xl text-gris'>
                                    Tu pedido ya está listo para que lo vengas a retirar!
                                </p>
                                <p className='text-xl text-gris mt-2'>
                                    Podes pasar de lunes a sábado hasta las 18hs por Av Alvarez Thomas 3250, barrio Villa
                                    Urquiza. Cuando vengas avisanos para confirmarte que vamos a estar! :)
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            )}

            <div className="lg:flex lg:justify-between mx-5 lg:mx-44 mt-8 lg:mt-20 lg:gap-24">
                <div className="lg:basis-8/12">
                    <p className="font-medium text-3xl lg:text-4xl text-verde">Productos del pedido</p>

                    <div className='mt-5'>
                        {items?.map((item : any) => (
                            <TarjetaOrder record={item} key={item.id}/>
                        ))}
                    </div>
                </div>
                <div className="basis-3/12">
                    <p className="mt-5 lg:mt-0 font-medium text-3xl lg:text-4xl text-verde">Totales</p>
                    <Card className="mt-5 pt-5 shadow-md">
                        <CardContent>
                            <div className="flex justify-between text-lg text-right my-1">
                                <p>Sub total stickers</p>
                                <p>$ {subTotal}</p>
                            </div>
                            <div className="flex justify-between text-lg text-right my-1 text-cyan-700">
                                <p>{order![0].metodo_entrega.label}</p>
                                <p>$ {order![0].metodo_entrega.price}</p>
                            </div>
                            <hr/>
                            <div className="flex justify-between text-lg text-right my-1 font-semibold">
                                <p>Total</p>
                                <p>$ {subTotal + order![0].metodo_entrega.price}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </>
    )
}
