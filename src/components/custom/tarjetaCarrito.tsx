import Image from 'next/image';
import {
  Card,
  CardContent
} from "@/components/ui/card";

export default function TarjetaCarrito({ record }: any) {
    return (
        <Card className="mt-4">
            <CardContent>
                <div className="flex flex-row mt-5">
                    <Image
                        src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        width={100}
                        height={100}
                        alt="Picture of the author"
                    />
                    <p className="basis-2/5 text-lg">Product name bla bla</p>
                    <p className="basis-1/5 text-lg">Quantity</p>
                    <p className="basis-1/5 text-lg">$ Price</p>
                    <p className="basis-1/5 text-lg">Delete</p>
                </div>
            </CardContent>
        </Card>
    )
}
