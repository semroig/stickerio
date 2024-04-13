import Image from 'next/image';
import {
  Card,
  CardContent
} from "@/components/ui/card";

import { SIZES } from '@/app/constants';

export default function TarjetaOrder({ record }: any) {
    // Almaceno en esta var la data del tamano del sticker
    let sticker;
    SIZES.forEach((element) => {
        if (element.value === record.size) {
            sticker = element;
        }
    })

    return (
        <Card className="mt-4 lg:mt-5 shadow-md">
            {/* Small screen component */}
            <CardContent className='block lg:hidden'>
                <div className="flex flex-row items-center pt-4 gap-4">
                    <Image
                        src={record.Product.image_url}
                        width={70}
                        height={70}
                        alt="Sticker image"
                        className='rounded-lg'
                    />
                    <p className="text-xl font-medium">{record.Product.name}</p>
                </div>
                <div className='flex flex-row items-center justify-between mt-2'>
                    <p className="lg:basis-4/12 text-lg">{sticker!.shortLabel}</p>
                    <p className="lg:basis-1/12 text-xl">{record.quantity}</p>
                </div>
                <hr className='my-2'/>
                <div className='flex flex-row items-center justify-end'>
                    <p className="lg:basis-2/12 text-3xl font-medium">$ {sticker!.price * record.quantity}</p>
                </div>
            </CardContent>

            {/* Large screen component */}
            <CardContent className='hidden lg:block'>
                <div className="flex flex-row items-center pt-4">
                    <Image
                        src={record.Product.image_url}
                        width={80}
                        height={80}
                        alt="Sticker image"
                        className='rounded-lg'
                    />
                    <div className="basis-full flex items-center justify-center text-gris">
                        <div className="basis-4/12 ml-4">
                            <p className="text-xl font-medium">{record.Product.name}</p>
                            {/* <p>{record.Product.description}</p> */}
                        </div>
                        <p className="basis-4/12 text-lg">{sticker!.shortLabel}</p>
                        <p className="basis-1/12 text-xl">{record.quantity}</p>
                        <p className="basis-2/12 text-3xl font-medium">$ {sticker!.price * record.quantity}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
