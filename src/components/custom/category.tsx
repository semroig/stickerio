'use client'

import { Checkbox } from "@/components/ui/checkbox"

export default function Category({ record, addFilter, removeFilter }: any) {
    // Docu de atributos que acepta el checkbox:
    // https://www.radix-ui.com/primitives/docs/components/checkbox

    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id="terms"
                onCheckedChange={(e) => e ? addFilter(record.id) : removeFilter(record.id)}
            />
            <label
                htmlFor="terms"
                className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {record.name}
            </label>
        </div>
    )
}
