'use client'

import { Checkbox } from "@/components/ui/checkbox"

export default function Category({ record, addFilter, removeFilter, categoriaChecked }: any) {
    return (
        <div className="my-3 flex items-center space-x-2">
            <Checkbox
                defaultChecked={categoriaChecked}
                id={record.name}
                onCheckedChange={(e) => e ? addFilter(record.id) : removeFilter(record.id)}
            />
            <label
                htmlFor={record.name}
                className="text-xl font-light leading-none cursor-pointer"
            >
                {record.name}
            </label>
        </div>
    )
}
