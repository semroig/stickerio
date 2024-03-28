import * as React from "react";

import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="flex justify-center items-center px-20 py-6 w-full text-lg font-semibold text-orange-600 whitespace-nowrap max-md:px-5 max-md:max-w-full bg-white">
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full mx-12" >
          <Link href={"/"} className="my-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/30921df5111aa506c586a7551e38e7484402027c4872fe944ecc79a426346910?apiKey=6c89b4a2db244c5d969134d9199949c2&"
              alt="Logo"
              className="shrink-0 max-w-full aspect-[6.67] fill-neutral-700 w-[189px]"
            />
          </Link>
          {/* <div className="justify-center px-5 py-2 border-2 border-orange-600 border-solid rounded-[50px] max-md:px-5">
            Ingresar
          </div> */}
        </div>
    </header>
  );
};

export default Navbar;