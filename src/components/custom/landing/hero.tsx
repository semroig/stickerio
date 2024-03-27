import * as React from "react";

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
    <div className="flex flex-col pb-10 bg-neutral-100">
      <main className="self-center mt-4 w-full max-w-[1214px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <section className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center items-start px-16 py-16 border-2 border-emerald-800 border-solid rounded-[40px] max-md:px-5 max-md:mt-5 max-md:max-w-full">
              <div className="flex flex-col mt-6 max-w-full w-[486px]">
                <h1 className="text-6xl font-bold tracking-tighter text-emerald-800 leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
                  Ponele onda a tus cosas con nuestros stickers
                </h1>
                <p className="mt-6 text-lg text-neutral-700 max-md:max-w-full">
                  Mirá nuestras selecciónes de stickers desde la comodidad de tu
                  casa!
                </p>
                <button className="justify-center self-start px-6 py-4 mt-6 text-lg font-semibold text-orange-50 whitespace-nowrap bg-orange-600 rounded-[50px] max-md:px-5">
                  Comenzar
                </button>
                <div className="flex flex-col px-6 py-4 mt-6 max-w-full rounded-3xl border-2 border-sky-200 border-solid w-[199px] max-md:px-5">
                  <div className="text-base tracking-normal text-neutral-700">
                    Lanzamiento en:
                  </div>
                  <div className="flex gap-2 justify-center mt-2 text-emerald-800 whitespace-nowrap">
                    {countdownItems.map((item, index) => (
                      <CountdownItem
                        key={index}
                        value={item.value}
                        label={item.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://ujfmhfambjwfboketpby.supabase.co/storage/v1/object/public/images/landing/original%20hero.png"
              alt="Stickers"
              className="grow w-full aspect-[0.85] max-md:mt-5 max-md:max-w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;