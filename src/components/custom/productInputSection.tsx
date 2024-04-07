'use client'

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "@/app/actions";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const sizes = [
    {
      value: "chico",
      label: "Chico 4x4 - $400",
    },
    // {
    //   value: "mediano",
    //   label: "6x6 - $400",
    // },
    {
      value: "grande",
      label: "Grande 7x7 - $550",
    }
]

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button 
            className="mt-8 w-full"
            type="submit"
            aria-disabled={pending}
        >
            Agregar al carrito
        </Button>
    );
}

// Componente de alert usando state message del form action
function AlertBox({ msg }: any) {
    // Valido si es error o exito
    if (msg == 'Success') return (
        <Alert variant="exito">
            <Check className="h-4 w-4" />
            <AlertTitle>Listo!</AlertTitle>
            <AlertDescription>
                Producto agregado al carrito exitosamente.
            </AlertDescription>
        </Alert>
    )

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {msg}
            </AlertDescription>
        </Alert>
    )
}

export default function ProductInputSection({ record }: any) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [state, formAction] = useFormState<any, FormData>(addItem, { message: "" });

    // TO DO: No permitir numeros negativos en input de cantidad
    // TO DO: El alert debe desaparecer luego de algunos segundos

    return (
        <form action={formAction} className="mt-8 lg:mt-14">
            <div className="lg:flex lg:flex-row lg:justify-start gap-5">
                <div className="basis-1/2">
                    <p className="text-lg my-3 font-medium text-gris">Tamaño:</p>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full lg:w-64 justify-between"
                            >
                                {   
                                    value
                                    ? sizes.find((size) => size.value === value)?.label
                                    : "Elegir tamaño..."
                                }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full lg:w-64 p-0">
                            <Command>
                                <CommandGroup>
                                    {sizes.map((size) => (
                                        <CommandItem
                                            key={size.value}
                                            value={size.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === size.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {size.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="basis-1/2">
                    <p className="text-lg my-3 font-medium text-gris">Cantidad:</p>
                    <Input type="number" name="cantidad" min="0" required></Input>
                    <input type="hidden" name="size" value={value} />
                    <input type="hidden" name="id" value={record.id} />
                </div>
            </div>

            {state?.message && (
                <div className="mt-3">
                    <AlertBox msg={state?.message}></AlertBox>
                </div>
            )}

            <SubmitButton />

        </form>
    )
}
