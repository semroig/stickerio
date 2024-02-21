'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"

import { useState } from "react";

export default function ProfileDataCard() {
    const [isEditContext, setIsEditContext] = useState<any>(false);

    return (
        isEditContext ? (
            <Card className="mt-4 pt-5">
                <CardContent>
                <p className="font-semibold text-xl">Nombre</p>
                <Input type="text" value="Sem Gabriel Roig"></Input>
                <p className="font-semibold text-xl mt-2">Email</p>
                <Input type="email" value="sem.roig@gmail.com"></Input>
                <p className="font-semibold text-xl mt-2">Teléfono</p>
                <Input type="text" value="+54 9 11 4936 0562"></Input>
                </CardContent>
                <CardFooter className="flex justify-center">
                <Button onClick={() => setIsEditContext(false)}>Guardar</Button>
                </CardFooter>
            </Card>
        ) : (
            <Card className="mt-4 pt-5">
                <CardContent>
                <p className="font-semibold text-xl">Nombre</p>
                <p className="text-lg">Sem Gabriel Roig</p>
                <p className="font-semibold text-xl mt-2">Email</p>
                <p className="text-lg">sem.roig@gmail.com</p>
                <p className="font-semibold text-xl mt-2">Teléfono</p>
                <p className="text-lg">+54 9 11 4936 0562</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                <Button variant="outline" onClick={() => setIsEditContext(true)}>Editar</Button>
                </CardFooter>
            </Card>
        )
    )
}
