'use client';

import { useState } from "react";
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import TarjetaEntregaCheckout from "@/components/custom/tarjetaEntregaCheckout"

import { METODOS_ENTREGA } from '@/app/constants';

export default function CheckoutFinalSection ({ records, userSessionData }: any) {
    const [entrega, setEntrega] = useState(METODOS_ENTREGA[0]);
    const router = useRouter();
    const [direccion, setDireccion] = useState('');

    // Itero por los items para sumar totales
    let subTotal = 0;
    records?.forEach((element: any) => {
        if (element.size === 'chico') subTotal += element.quantity * 450;
        if (element.size === 'grande') subTotal += element.quantity * 600;
        if (element.size === 'gigante') subTotal += element.quantity * 750;
    })

    async function confirmarPedido() {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: order, error: orderError } = await supabase
            .from('Order')
            .insert([
                { 
                    metodo_pago: 'transferencia',
                    subtotal_stickers: subTotal,
                    metodo_entrega: entrega,
                    total: subTotal + entrega.price,
                    user_id: userSessionData.user.id,
                    direccion_entrega: direccion
                },
            ])
            .select()
        
        if (order) console.log(order);
        if (orderError) {
            console.error(orderError);
            return orderError;
        }

        // Armo body para insert de items
        let body: any[] = [];
        records.forEach((linea: any) => {
            body.push({
                product_id: linea.product_id,
                quantity: linea.quantity,
                size: linea.size,
                order_id: order[0].id
            })
        });

        const { data: items, error: itemsError } = await supabase
            .from('OrderItem')
            .insert(body)
            .select()
        
        if (items) console.log(items);
        if (itemsError) {
            console.error(itemsError);
            return itemsError;
        }

        const { data: cartItems, error: cartItemsError } = await supabase
            .from('CartItem')
            .delete()
            .eq('user_id', userSessionData.user.id);

        if (cartItems) console.log(cartItems);
        if (cartItemsError) {
            console.error(cartItemsError);
            return cartItemsError;
        }

        router.push(`/order/${order[0].id}`);
    }

    async function cambiarEntrega(valor : string) {
        METODOS_ENTREGA.forEach(opcion => {
            if (opcion.value === valor) setEntrega(opcion);
        })
    }

    return (
        <div className="lg:flex lg:justify-center mx-5 lg:mx-28 mt-5 lg:mt-8 lg:gap-20">
            <div className="basis-9/12">
                <div>
                    <p className="font-medium text-3xl lg:text-4xl text-verde">Elegí método de entrega</p>
                    <RadioGroup 
                        defaultValue="moto"
                        className="mt-5"
                        onValueChange={cambiarEntrega}
                    >
                        {METODOS_ENTREGA!.map((opcion : any) => (
                            <TarjetaEntregaCheckout key={opcion.value} opcion={opcion} setDireccion={setDireccion} entregaActiva={entrega.value}/>
                        ))}
                    </RadioGroup>
                </div>
        
                <div className='mt-5 lg:mt-10'>
                    <p className="font-medium text-3xl lg:text-4xl text-verde">Elegí método de pago</p>

                    <Card className="mt-5 shadow-md p-3">
                        <CardContent>
                            <div className="lg:flex lg:items-center lg:justify-between">
                                <div className="lg:basis-9/12">
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Label className="text-lg font-medium">
                                            Transferencia
                                        </Label>
                                    </div>
                                    <p className="text-base font-light">
                                        Tendras que enviarnos el comprobante luego de realizado el pago.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:basis-3/12">
                <p className="font-medium text-3xl lg:text-4xl text-verde">Resumen</p>
                <Card className="mt-5 pt-5 shadow-md">
                    <CardContent>
                        <div className="flex justify-between text-lg text-right my-1">
                            <p>Sub total stickers</p>
                            <p>$ {subTotal}</p>
                        </div>
                        <div className="flex justify-between text-lg text-right my-1 text-cyan-700">
                            <p>{entrega.label}</p>
                            <p>$ {entrega.price}</p>
                        </div>
                        <hr/>
                        <div className="flex justify-between text-lg text-right my-1 font-semibold">
                            <p>Total</p>
                            <p>$ {subTotal + entrega.price}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <Link href="/checkout">
                            <Button
                                onClick={confirmarPedido}
                                className='mt-3 w-full px-12 py-6 text-xl font-normal text-crema whitespace-nowrap bg-naranja rounded-[50px]'
                            >
                                Finalizar compra
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
           </div>

        </div>

        
    )
}