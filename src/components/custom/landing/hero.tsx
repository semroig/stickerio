import * as React from "react";

import Image from 'next/image';
import Link from 'next/link';


interface CountdownItemProps {
  value: number;
  label: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, label }) => (
  <div className="flex flex-col p-3 bg-sky-200 rounded-lg">
    <div className="text-3xl font-medium tracking-tight">{value}</div>
    <div className="text-lg tracking-normal">{label}</div>
  </div>
);

const Landing: React.FC = () => {
  const countdownItems = [
    { value: 5, label: "días" },
    { value: 6, label: "horas" },
    { value: 36, label: "min" },
  ];

  return (
    <div className="lg:flex lg:flex-row items-center justify-center mt-10 lg:mt-1 lg:mx-14">
      {/* Left column for text content */}
      <div className="basis-3/5">
        <div className="px-16 lg:pl-20 lg:pr-44 lg:py-28 lg:border-2 border-emerald-800 rounded-[40px]">
          <p className="lg:tracking-tight lg:text-6xl text-4xl font-medium text-verde">
            Ponele<span className="highlight highlight-celeste"> onda </span>a tus cosas con nuestros stickers
          </p>
          <p className="mt-6 text-xl text-gris font-light">
            Mirá nuestra selección de stickers desde la comodidad de tu
            casa!
          </p>
          <Link href={'/catalogo'}>
            <button className="justify-center self-start px-7 py-3 mt-6 text-lg font-medium text-crema whitespace-nowrap bg-naranja rounded-[50px] max-md:px-5">
              Ver catálogo
            </button>
          </Link>
        </div>
      </div>

      {/* Right column for image */}
      <div className="basis-2/5 lg:ml-5 m-10">
          <Image
              src={"https://lh3.googleusercontent.com/d/1A2nZTCwcLvX9aE9ShQe8FkPWDabouPV8"}
              alt="Description of your image"
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-[40px]"
          />
      </div>
    </div>
  );
};

export default Landing;