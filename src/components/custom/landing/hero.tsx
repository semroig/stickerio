import * as React from "react";

import Image from 'next/image';

interface CountdownItemProps {
  value: number;
  label: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, label }) => (
  <div className="flex flex-col p-1 bg-sky-200 rounded-lg">
    <div className="text-2xl font-medium tracking-tight">{value}</div>
    <div className="text-sm tracking-normal">{label}</div>
  </div>
);

const Landing: React.FC = () => {
  const countdownItems = [
    { value: 74, label: "dias" },
    { value: 90, label: "horas" },
    { value: 36, label: "min" },
  ];

  return (
    <div className="flex flex-col">
      <main className="self-center mt-4 mx-20">
        <div className="flex gap-4">
          <section className="flex flex-col w-3/5">
            <div className="flex flex-col justify-center items-start px-16 py-40 border-2 border-emerald-800 border-solid rounded-[40px]">
              <div className="flex flex-col mt-6 pr-14">
                <h1 className="text-7xl font-medium tracking-tighter text-verde leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
                  Ponele onda a tus cosas con nuestros stickers
                </h1>
                <p className="mt-6 text-xl text-gris font-light">
                  Mirá nuestras selecciónes de stickers desde la comodidad de tu
                  casa!
                </p>
                <button className="justify-center self-start px-7 py-3 mt-6 text-lg font-semibold text-crema whitespace-nowrap bg-naranja rounded-[50px] max-md:px-5">
                  Comenzar
                </button>
              </div>
            </div>
          </section>
          <div className="flex flex-col w-2/5 relative">
            <Image
              src="https://ujfmhfambjwfboketpby.supabase.co/storage/v1/object/public/images/landing/hero.png"
              fill={true}
              alt="Mock up celular"
              className="rounded-[40px]"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;