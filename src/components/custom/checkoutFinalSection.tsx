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

// import { METODOS_ENTREGA } from '@/app/constants';

const METODOS_ENTREGA = [
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

    async function changeEntrega({event}: any) {
        console.log('debug')
        console.log(event)
        METODOS_ENTREGA.forEach(opcion => {
            if (opcion.value === event) setEntrega(opcion);
        })
    }

    return (
        <>
            <div className='mt-12'>
                <p className="font-semibold text-2xl">Opciones de entrega</p>
                <RadioGroup defaultValue="correo" className="mt-3" onValueChange={changeEntrega}>
                    {METODOS_ENTREGA.map((opcion : any) => (
                        <div key={opcion.value}>
                            <div className="flex items-center space-x-2 mt-2">
                                <RadioGroupItem value={opcion.value} id="r1" />
                                <Label htmlFor="r1" className="text-lg font-medium">
                                    $ {opcion.price} - {opcion.label}
                                </Label>
                            </div>
                            <p className="ml-5 text-base font-normal">
                                {opcion.description}
                            </p>
                        </div>
                    ))}
                </RadioGroup>
            </div>
    
            <div className='mt-10'>
                <p className="font-semibold text-2xl">Metodos de pago</p>
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

            <div className='mt-10'>
                <p className="font-semibold text-2xl">Resumen del pedido</p>
                <Card className="mt-5 pt-5 mx-20">
                    <CardContent>
                        <p className="text-lg text-right my-1">
                            Sub total stickers <span className="ml-3">$ {subTotal}</span>
                        </p>
                        <p className="text-lg text-right my-1 text-cyan-700">
                            {entrega.label} 
                            <span className="ml-3">$ {entrega.price}</span>
                        </p>
                        <hr/>
                        <p className="text-lg text-right my-1 font-semibold">
                            Total <span className="ml-3">$ {subTotal + entrega.price}</span>
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        {/* <Button onClick={confirmarPedido}>Finalizar compra</Button> */}
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}