import * as React from "react";

import Image from 'next/image';

interface PriceCardProps {
  size: string;
  price: string;
  measurement: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ size, price, measurement }) => {
  return (
    <div className="px-10 py-7 bg-white rounded-3xl shadow-lg">
      <div className="text-base">{size}</div>
      <div className="mt-2 text-4xl font-semibold whitespace-nowrap text-neutral-700">
        {price}
      </div>
      <div className="mt-2 text-base">
        Medida: {measurement}
      </div>
    </div>
  );
};

function Precios() {
  const priceData = [
    {
      size: "Chico",
      price: "$400",
      measurement: "4x4 cm",
    },
    {
      size: "Grande",
      price: "$550",
      measurement: "7x7 cm",
    },
  ];

  return (
    <div className="lg:flex items-center justify-center mt-32 lg:mx-32">
      <div className="basis-1/2">
        <Image
            src="https://ujfmhfambjwfboketpby.supabase.co/storage/v1/object/public/images/landing/precios.png"
            alt="Description of your image"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-[40px]"
        />
      </div>
      <div className="basis-1/2 lg:px-20 sm:mt-10">
        <div className="flex flex-col self-stretch my-auto">
          <h2 className="text-5xl font-medium tracking-tighter leading-10 text-verde">
            Nuestros precios
          </h2>
          <p className="mt-6 text-lg text-gris font-light">
            Elegí el tamaño que más te guste y pegalo donde quieras!
            Nuestros stickers son de vinilo resistentes a la humedad.
          </p>
          <div className="flex gap-10 justify-center mt-6 text-neutral-600">
            {priceData.map((item, index) => (
              <PriceCard
                key={index}
                size={item.size}
                price={item.price}
                measurement={item.measurement}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Precios;