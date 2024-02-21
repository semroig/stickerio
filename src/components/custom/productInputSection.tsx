'use client'

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import addItem from "@/app/actions";

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
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const sizes = [
    {
      value: "chico",
      label: "4x4 - $300",
    },
    {
      value: "mediano",
      label: "6x6 - $400",
    },
    {
      value: "grande",
      label: "8x8 - $500",
    }
]

const initialState = {
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
        <Button 
            className="mt-8"
            type="submit"
            aria-disabled={pending}
        >
            Agregar al carrito
        </Button>
    );
}

export default function ProductInputSection({ records }: any) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [state, formAction] = useFormState(addItem, initialState);

    // TO DO: No permitir numeros negativos en input de cantidad

    return (
        <form action={formAction}>
            <div className="flex flex-row justify-start mt-8">
                <div className="basis-1/2">
                    <p className="text-lg my-4">Tamaño:</p>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                            >
                            {value
                                ? sizes.find((size) => size.value === value)?.label
                                : "Elegir tamaño..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
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
                <div className="basis-1/3">
                    <p className="text-lg my-4">Cantidad:</p>
                    <Input type="number" name="cantidad" required></Input>
                    <input type="hidden" name="size" value={value} />
                </div>
            </div>

            <SubmitButton />

            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}
