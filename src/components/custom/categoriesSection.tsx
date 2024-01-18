'use client'

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useRef } from "react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CategoriesSection({ record }) {
    const ref = useRef(null);
    const [isActive, setIsActive] = useState(false);

    // Busco prods filtrados por id de categoria cliqueada
    async function retrieveFilteredProds(event) {
        const { data: registros } = await supabase
            .from("Product")
            .select("*")
            .eq('category_id', record.id);

        console.table(registros);

        event.currentTarget.className.add('font-medium');
        setIsActive(!isActive);
    }

    // TO DO: armar componente padre que maneje los estados de las categorias

    return (
        <p
            className="text-lg my-4 cursor-pointer"
            onClick={retrieveFilteredProds}
            ref={ref}
        >{record.name}</p>
    )
}
