'use client'

import { Checkbox } from "@/components/ui/checkbox"

export default function Category({ record, addFilter, removeFilter, categoriaChecked }: any) {
    return (
        <div className="my-2 flex items-center space-x-2">
            <Checkbox
                // checked={categoriaChecked}
                id="category"
                onCheckedChange={(e) => e ? addFilter(record.id) : removeFilter(record.id)}
            />
            <label
                htmlFor="category"
                className="text-xl font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {record.name}
            </label>
        </div>
    )
}
