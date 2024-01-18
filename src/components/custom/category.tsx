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
import { useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox"

export default function Category({ record }) {
    const ref = useRef(null);
    const [isActive, setIsActive] = useState(false);

    // Docu de atributos que acepta el checkbox:
    // https://www.radix-ui.com/primitives/docs/components/checkbox

    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id="terms"
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
