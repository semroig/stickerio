import * as React from "react";

interface PriceCardProps {
  size: string;
  price: string;
  measurement: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ size, price, measurement }) => {
  return (
    <div className="flex flex-col justify-end px-6 py-8 bg-white rounded-3xl shadow-lg max-md:px-5">
      <div className="text-base">{size}</div>
      <div className="justify-center mt-4 text-3xl font-semibold whitespace-nowrap text-neutral-700">
        {price}
      </div>
      <div className="justify-center mt-4 text-base">
        Medida: {measurement}
      </div>
    </div>
  );
};

function Precios() {
  const priceData = [
    {
      size: "Pequeño",
      price: "$400",
      measurement: "4x4 cm",
    },
    {
      size: "Grande",
      price: "$700",
      measurement: "7x7 cm",
    },
  ];

  return (
    <div className="flex flex-col justify-center py-14 bg-zinc-100">
      <div className="px-20 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden relative flex-col grow px-7 py-20 text-lg font-bold text-white min-h-[555px] rounded-[40px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://ujfmhfambjwfboketpby.supabase.co/storage/v1/object/public/images/landing/precios.png"
                alt="Background"
                className="object-cover absolute inset-0 size-full"
              />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10">
              <h2 className="text-5xl font-bold tracking-tighter leading-10 text-emerald-800 max-md:text-4xl">
                Nuestros precios
              </h2>
              <p className="mt-6 text-lg text-neutral-700">
                Elegí el tamaño que más te guste y pegalo donde quieras!
                Nuestros stickers son de vinilo resistentes a la humedad.
              </p>
              <div className="flex gap-5 justify-between mt-6 text-neutral-600">
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
      </div>
    </div>
  );
}

export default Precios;