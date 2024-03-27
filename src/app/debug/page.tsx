import * as React from "react";

interface CountdownItemProps {
  value: number;
  unit: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, unit }) => (
  <div className="flex flex-col flex-1 px-2.5 py-1 bg-sky-200 rounded-lg">
    <div className="text-2xl font-medium tracking-tight">{value}</div>
    <div className="text-sm tracking-normal">{unit}</div>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col pb-10 bg-white">
      <header className="flex justify-center items-center px-20 py-6 w-full text-lg font-semibold text-orange-600 whitespace-nowrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full mx-12" >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/30921df5111aa506c586a7551e38e7484402027c4872fe944ecc79a426346910?apiKey=6c89b4a2db244c5d969134d9199949c2&"
            alt="Logo"
            className="shrink-0 my-auto max-w-full aspect-[6.67] fill-neutral-700 w-[189px]"
          />
          <div className="justify-center px-5 py-2 border-2 border-orange-600 border-solid rounded-[50px] max-md:px-5">
            Ingresar
          </div>
        </div>
      </header>
      <main className="self-center w-full max-md:max-w-full" >
        <div className="flex gap-1 max-md:flex-col max-md:gap-0 mx-16">
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
                    <CountdownItem value={74} unit="dias" />
                    <CountdownItem value={90} unit="horas" />
                    <CountdownItem value={36} unit="min" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a645ffd872c2c68129f096d2e1e2c6c7c4298b75f5bd6d1caa94ffcce43abab?apiKey=6c89b4a2db244c5d969134d9199949c2&"
              alt="Stickers"
              className="grow w-full aspect-[0.85] max-md:mt-5 max-md:max-w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;