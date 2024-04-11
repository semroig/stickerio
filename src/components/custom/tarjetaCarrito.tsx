import Image from 'next/image';
import {
  Card,
  CardContent
} from "@/components/ui/card";

import DeleteCartItemButton from "@/components/custom/deleteCartItemButton";

import { SIZES } from '@/app/constants';

export default function TarjetaCarrito({ record }: any) {
    // Almaceno en esta var la data del tamano del sticker
    let sticker;
    SIZES.forEach((element) => {
        if (element.value === record.size) {
            sticker = element;
        }
    })
    
    return (
        <Card className="mt-5 shadow-md">
            <CardContent>
                <div className="flex flex-row items-center pt-4">
                    <Image
                        src={record.Product.image_url}
                        width={100}
                        height={100}
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
                        <div className="basis-1/12"><DeleteCartItemButton recordId={record.id} /></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
