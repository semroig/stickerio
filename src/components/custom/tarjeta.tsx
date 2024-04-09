'use client'

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader
} from "@/components/ui/card";
import Link from 'next/link';

export default function Tarjeta({ record }: any) {
    return (
        <Card 
            className="hover:cursor-pointer w-fit m-2 lg:m-3 rounded-lg shadow-md hover:shadow-xl pt-4"
        >
            <Link href={`/producto/${record.id}`}>
                <CardContent>
                    <Image
                        src={record.image_url}
                        width={230}
                        height={230}
                        alt="Picture of the author"
                        className='rounded-lg'
                    />
                </CardContent>
                <CardHeader className="px-4 pb-4">
                    <CardTitle className='font-medium text-gris'>{record.name}</CardTitle>
                    <p className='pt-1 flex justify-end text-lg text-verde'>Con Stock</p>
                </CardHeader>
            </Link>
        </Card>
    )
}
