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
          <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden relative flex-col grow px-7 py-20 text-lg font-bold text-white min-h-[555px] rounded-[40px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/103635d6f825b8322ed7b44c244148244a51075426fd56fd380a626b3616ce09?apiKey=6c89b4a2db244c5d969134d9199949c2&"
                alt="Background"
                className="object-cover absolute inset-0 size-full"
              />
              <div className="relative z-10 justify-center self-start p-3 mt-36 rounded-xl shadow-sm backdrop-blur-[7.300000190734863px] bg-white bg-opacity-30 max-md:mt-10">
                Tamaño Grande
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/361bce33b8b85093405e711297f18dd43d928f19db06a06dd9572a6ae9e9e8bc?apiKey=6c89b4a2db244c5d969134d9199949c2&"
                alt="Decorative element"
                className="ml-20 border-2 border-white border-solid aspect-[0.5] stroke-[2px] stroke-white w-[41px] max-md:ml-2.5"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1bc825b7430e074d09b93c99446486683f91cd19aea84ee984a6ab83ccbee32?apiKey=6c89b4a2db244c5d969134d9199949c2&"
                alt="Decorative element"
                className="z-10 self-end mt-16 mr-20 border-2 border-white border-solid aspect-square stroke-[2px] stroke-white w-[49px] max-md:mt-10 max-md:mr-2.5"
              />
              <div className="relative justify-center self-end p-3 rounded-xl shadow-sm backdrop-blur-[7.300000190734863px] bg-white bg-opacity-30">
                Tamaño Pequeño
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
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