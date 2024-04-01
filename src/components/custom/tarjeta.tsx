'use client'

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";


export default function Tarjeta({ record }: any) {
    const { toast } = useToast()

    return (
        <Card 
            className="hover:cursor-pointer w-fit m-2 lg:m-3 rounded-lg shadow-md hover:shadow-xl"
            onClick={() => {
                toast({
                    title: "Proximamente!",
                    description: "Muy pronto vas a poder armar tu pedido desde esta misma web! Por ahora podes ir chusmeando nuestro catalogo ;)",
                    duration: 3000,
                    action: <ToastAction altText="Oki">Oki</ToastAction>
                })
            }}
        >
            {/* <Link href={`/producto/${record.id}`}> */}
                <CardHeader>
                <CardTitle className='font-normal font-sm text-gris'>{record.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image
                        src={record.image_url}
                        width={220}
                        height={220}
                        alt="Picture of the author"
                        className='rounded-lg'
                    />
                </CardContent>
            {/* </Link> */}

            {/* <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bienvenido a The Sticker Co!</AlertDialogTitle>
                        <AlertDialogDescription>
                        Proximamente vas a poder armar tu pedido desde esta misma web! Por ahora podes ir chusmeando nuestro catalogo ;)
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => {
                            setOpen(false)
                            console.log(open)
                            }} >Oki</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </Card>
    )
}
