"use client"

import { useState } from "react";

export default function CarritoWrapper({children} : any) {
    const [carritoItems, setcarritoItems] = useState<any[]>([]);

    // Funcion para agregar id de catalogo a lista de filters y consumir ruta con params
    async function addItem(id : any, quantity : any, size : any) {
        const newArray = [...carritoItems, {
            id: id,
            quantity: quantity,
            size: size
        }];
        setcarritoItems(newArray);
    }

    return <>
        {children}
    </>
}