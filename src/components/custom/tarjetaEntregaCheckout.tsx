import {
  Card,
  CardContent
} from "@/components/ui/card";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function TarjetaEntregaCheckout({ opcion }: any) {
    const precio = opcion.price !== 0 ? '$ ' + opcion.price.toString() : 'Gratis'
    return (
        <Card className="mb-4 shadow-md p-3">
            <CardContent>
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="basis-9/12">
                        <div className="flex items-center space-x-2 mt-2">
                            <RadioGroupItem value={opcion.value} id="r1" />
                            <Label htmlFor="r1" className="text-lg font-medium">
                                {opcion.label}
                            </Label>
                        </div>
                        <p className="ml-6 text-base font-light">
                            {opcion.description}
                        </p>
                    </div>

                    <hr className="my-2 block lg:hidden"/>

                    <div className="text-right lg:text-center">
                        {opcion.price === 0 ?
                            (
                                <div className="text-3xl text-verde">Gratis</div>
                            ) :
                            (
                                <div className="text-3xl font-medium text-gris">$ {opcion.price}</div>
                            )
                        }
                    </div>
                    
                </div>
            </CardContent>
        </Card>
    )
}
