import * as React from "react";

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
    <div className="flex justify-center mt-32 mx-32">
      <div className="flex flex-col w-1/2">
        <div className="flex relative flex-col grow text-lg font-bold text-white min-h-[555px]">
          <img
            loading="lazy"
            src="https://ujfmhfambjwfboketpby.supabase.co/storage/v1/object/public/images/landing/precios.png"
            alt="Background"
            className="object-cover absolute inset-0 size-full rounded-[40px]"
          />
        </div>
      </div>
      <div className="flex flex-col w-1/2 px-20">
        <div className="flex flex-col self-stretch my-auto max-md:mt-10">
          <h2 className="text-5xl font-medium tracking-tighter leading-10 text-verde max-md:text-4xl">
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