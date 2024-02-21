'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

export default function ProfileAddressCard() {
    return (
        <Card className="mt-4 pt-5">
            <CardContent>
              <p className="font-semibold text-xl">Dirección</p>
              <p className="text-lg">Maipú 233</p>
              <p className="font-semibold text-xl mt-2">Localidad</p>
              <p className="text-lg">General Pacheco</p>
              <p className="font-semibold text-xl mt-2">Provincia</p>
              <p className="text-lg">Buenos Aires</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Editar</Button>
            </CardFooter>
          </Card>
    )
}
