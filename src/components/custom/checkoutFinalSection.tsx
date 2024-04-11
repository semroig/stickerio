'use client';

import { useState } from "react";
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import TarjetaEntregaCheckout from "@/components/custom/tarjetaEntregaCheckout"

// import { METODOS_ENTREGA } from '@/app/constants';

export const METODOS_ENTREGA = [
    { 
        value: "correo",
        label: "Envio por correo",
        price: 3650,
        description: "Disponible para todo el pais. Llega en los proximos 10 dias."
    },
    {
        value: "moto",
        label: "Envio por moto",
        price: 2000,
        description: "Disponible solo para Ciudad de Buenos Aires. Llega en los proximos 5 dias."
    },
    {
        value: "retiro",
        label: "Retiro en persona",
        price: 0,
        description: "De lunes a viernes entre las 8hs y 17hs por Villa Urquiza, Ciudad de Buenos Aires. Disponible a partir de manana!"
    }
  ];

export default function CheckoutFinalSection ({ records }: any) {
    const [entrega, setEntrega] = useState(METODOS_ENTREGA[0]);
    const router = useRouter();

    // Itero por los items para sumar totales
    let subTotal = 0;
    records?.forEach((element: any) => {
        if (element.size === 'grande') subTotal += 550;
        if (element.size === 'chico') subTotal += 400;
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
                    total: subTotal + entrega.price
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
            .gt('id', 0)

        if (cartItems) console.log(cartItems);
        if (cartItemsError) {
            console.error(cartItemsError);
            return cartItemsError;
        }

        router.push(`/order/${order[0].id}`);
    }

    async function changeEntrega({value}: any) {
        console.log('debug')
        console.log(value)
        METODOS_ENTREGA.forEach(opcion => {
            if (opcion.value === value) setEntrega(opcion);
        })
    }

    return (
        <div className="flex justify-center mx-28 mt-8 gap-20">
            <div className="basis-9/12">
                <div className=''>
                    <p className="font-medium text-4xl text-verde">Elegí método de entrega</p>
                    <RadioGroup defaultValue="moto" className="mt-5" onValueChange={changeEntrega}>
                        {METODOS_ENTREGA!.map((opcion : any) => (
                            <TarjetaEntregaCheckout key={opcion.value} opcion={opcion} />
                        ))}
                    </RadioGroup>
                </div>
        
                <div className='mt-10'>
                    <p className="font-medium text-4xl text-verde">Elegí método de pago</p>
                    <RadioGroup defaultValue="transferencia" className="mt-5">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transferencia" id="s1" />
                        <Label htmlFor="s1" className="text-lg font-medium">Transferencia</Label>
                        </div>
                        <p className="ml-5 text-base font-normal">
                        Tendras que enviarnos el comprobante luego de realizado el pago.
                        </p>
                    </RadioGroup>
                </div>
            </div>

            <div className="basis-3/12">
                <p className="font-medium text-4xl text-verde">Resumen</p>
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
                        {/* <Button onClick={confirmarPedido}>Finalizar compra</Button> */}
                    </CardFooter>
                </Card>
           </div>

        </div>

        
    )
}