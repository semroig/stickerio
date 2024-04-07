'use client'

import { Checkbox } from "@/components/ui/checkbox"

export default function Category({ record, addFilter, removeFilter, categoriaChecked }: any) {
    return (
        <div className="my-4 flex items-center space-x-2">
            <Checkbox
                defaultChecked={categoriaChecked}
                id={record.name}
                onCheckedChange={(e) => e ? addFilter(record.id) : removeFilter(record.id)}
                className="data-[state=checked]:bg-naranja data-[state=checked]:border-0 border-2 border-gris"
            />
            <label
                htmlFor={record.name}
                className="text-xl leading-none cursor-pointer"
            >
                {record.name}
            </label>
        </div>
    )
}
