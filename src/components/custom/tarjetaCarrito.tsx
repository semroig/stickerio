import Image from 'next/image';
import {
  Card,
  CardContent
} from "@/components/ui/card";

export default function TarjetaCarrito({ record }: any) {
    return (
        <Card className="mt-4">
            <CardContent>
                <div className="flex flex-row items-center mt-5">
                    <Image
                        src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        width={100}
                        height={100}
                        alt="Sticker image"
                    />
                    <p className="basis-2/5 text-lg">{record.Product.name}</p>
                    <p className="basis-1/5 text-lg">{record.quantity}</p>
                    <p className="basis-1/5 text-lg">{record.size}</p>
                    <p className="basis-1/5 text-lg">$ 200</p>
                </div>
            </CardContent>
        </Card>
    )
}
