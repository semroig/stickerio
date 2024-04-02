'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import Category from "@/components/custom/category";

export default function CategoriesSection({ records, categoriaChecked }: any) {
    const router = useRouter();
    console.log('categoriaChecked', categoriaChecked);
    const [filteringCategoryIds, setFilteringCategoryIds] = useState<Number[]>([categoriaChecked]);

    // Funcion para agregar id de catalogo a lista de filters y consumir ruta con params
    async function addFilteringCategoryId(id : any) {
        const newArray = [...filteringCategoryIds, id];
        const filteredArr = newArray.filter(cod => cod);
        setFilteringCategoryIds(filteredArr);
        router.push('/catalogo?category=' + filteredArr.join('-'));
    }

    // Funcion para sacar id de catalogo a lista de filters y consumir ruta con params
    async function removeFilteringCategoryId(id : any) {
        const newArray = filteringCategoryIds.filter((cat) => cat !== id);
        const filteredArr = newArray.filter(cod => cod);
        setFilteringCategoryIds(filteredArr)
        router.push('/catalogo?category=' + filteredArr.join('-'));
    }

    return (
        <div className="mt-5 text-gris">
            {records?.map((category : any) => (
                <div key={category.id}>
                    <Category
                        record={category}
                        addFilter={addFilteringCategoryId}
                        removeFilter={removeFilteringCategoryId}
                        categoriaChecked={categoriaChecked == category.id ? true : false}
                    ></Category>
                </div>
            ))}
        </div>
    )
}
