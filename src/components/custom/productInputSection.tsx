'use client'

import { useState } from "react";

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

const frameworks = [
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

export default function ProductInputSection({ records }: any) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    // TO DO: No permitir numeros negativos en input de cantidad

    return (
        <div>
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
                                ? frameworks.find((framework) => framework.value === value)?.label
                                : "Elegir tamaño..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandGroup>
                                    {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="basis-1/3">
                    <p className="text-lg my-4">Cantidad:</p>
                    <Input type="number"></Input>
                </div>
            </div>

            <Button className="mt-8">Agregar al carrito</Button>

        </div>
    )
}
