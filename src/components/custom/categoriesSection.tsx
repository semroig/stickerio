'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import Category from "@/components/custom/category";

export default function CategoriesSection({ records }: any) {
    const router = useRouter();
    const [filteringCategoryIds, setFilteringCategoryIds] = useState([]);

    // Funcion para agregar id de catalogo a lista de filters y consumir ruta con params
    async function addFilteringCategoryId(id : any) {
        const newArray = [...filteringCategoryIds, id];
        setFilteringCategoryIds(newArray);
        router.push('/catalogo?category=' + newArray.join('-'));
    }

    // Funcion para sacar id de catalogo a lista de filters y consumir ruta con params
    async function removeFilteringCategoryId(id : any) {
        const newArray = filteringCategoryIds.filter((cat) => cat !== id);
        setFilteringCategoryIds(newArray)
        router.push('/catalogo?category=' + newArray.join('-'));
    }

    return (
        <div>
            {records?.map((category : any) => (
                <div key={category.id}>
                    <Category
                        record={category}
                        addFilter={addFilteringCategoryId}
                        removeFilter={removeFilteringCategoryId}
                    ></Category>
                </div>
            ))}
        </div>
    )
}
