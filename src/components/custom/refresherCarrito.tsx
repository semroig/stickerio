'use client'

import { useEffect } from 'react'
import { useRouter } from "next/navigation";


export default function RefresherCarrito() {
    const router = useRouter();

    useEffect(() => {
        console.log('renderizado unicoo')
        router.refresh();
    }, [router]);

    return (
        <>
        </>
    )
}
