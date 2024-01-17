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

export default function Category({ record }) {
    const cosa = () => {
        console.log("cosa");
    }
    
    return (
        <p className="text-lg my-4 cursor-pointer" onClick={cosa}>{record.name}</p>
    )
}
