import * as React from "react";

import Link from "next/link";

import SignOut from '@/components/custom/signOut'

import { ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';

export default async function Navbar({ userSessionData, isHamburguesaOpen } : any) {
  // TO DO: Revisar cuando ya este logeado el user y mostrar navbar dinamico
  // TO DO: usar next image component

  return (
    <nav className="sticky z-50 top-0 flex lg:flex-wrap justify-between items-center px-10 lg:px-16 py-4 w-full lg:whitespace-nowrap bg-white">
        <Link href={"/"} className="my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/30921df5111aa506c586a7551e38e7484402027c4872fe944ecc79a426346910?apiKey=6c89b4a2db244c5d969134d9199949c2&"
            alt="Logo"
            className="shrink-0 max-w-full aspect-[6.67] fill-neutral-700 w-[189px]"
          />
        </Link>

        {isHamburguesaOpen === true ? 
          (
            <Link href={"/catalogo"} prefetch={false} className="md:hidden block"><X /></Link>
            ) :
          (
            <Link href={"/hamburguesa"} prefetch={false} className="md:hidden block"><Menu /></Link>
          )
        }

        <div className="justify-center items-center gap-6 hidden lg:flex">

          <Link href={"/catalogo"}>
            <div className="flex justify-center text-gris font-medium text-lg">
              Catálogo <ChevronDown className="mt-0.5"/>
            </div>
          </Link>

          { userSessionData ? 
            (
              <>
                <Link href={"/order"}>
                  <div className="flex justify-center text-gris font-medium text-lg">
                    Mis pedidos
                  </div>
                </Link>

                <Link href={"/carrito"} prefetch={false}>
                  <ShoppingCart />
                </Link>
                <SignOut />
              </>
            ) :
            (
              <>
                <Link href={"/signup"}>
                  <div className="justify-center px-5 py-1.5 text-naranja font-medium text-lg">
                    Registrarse
                  </div>
                </Link>
                <Link href={"/login"}>
                  <div className="justify-center px-5 py-1.5 text-naranja border-2 border-naranja border-solid rounded-[50px] font-medium text-lg">
                    Ingresar
                  </div>
                </Link>
              </>
            )
          }

        </div>

    </nav>
  );
};