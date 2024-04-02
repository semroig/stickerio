import * as React from "react";

import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="sticky z-50 top-0 flex justify-center items-center px-20 py-4 w-full text-naranja whitespace-nowrap max-md:px-5 max-md:max-w-full bg-white">
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full mx-12" >
          <Link href={"/"} className="my-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/30921df5111aa506c586a7551e38e7484402027c4872fe944ecc79a426346910?apiKey=6c89b4a2db244c5d969134d9199949c2&"
              alt="Logo"
              className="shrink-0 max-w-full aspect-[6.67] fill-neutral-700 w-[189px]"
            />
          </Link>
          <div className="flex gap-5">
          <Link href={"/signup"}>
            <div className="justify-center px-5 py-1.5 border-2 border-naranja border-solid rounded-[50px] font-medium text-lg">
              Registrarse
            </div>
          </Link>
          <Link href={"/login"}>
            <div className="justify-center px-5 py-1.5 border-2 border-naranja border-solid rounded-[50px] font-medium text-lg">
              Ingresar
            </div>
          </Link>
          </div>
        </div>
    </header>
  );
};

export default Navbar;