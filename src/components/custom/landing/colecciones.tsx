import * as React from "react";

import { ArrowUpRight } from "lucide-react"

interface CollectionCardProps {
  imageSrc: string;
  title: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ imageSrc, title }) => (
  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
    <div className="flex overflow-hidden relative flex-col grow justify-center p-2.5 text-xl text-white whitespace-nowrap rounded-2xl aspect-[0.81] max-md:mt-6">
      <img src={imageSrc} alt={`${title} collection`} className="object-cover absolute inset-0 size-full" />
      <div className="flex relative justify-between mt-64 p-3 rounded-2xl border-2 border-white border-solid bg-black bg-opacity-60 max-md:mt-10">
        <div>{title}</div>
        <ArrowUpRight />
      </div>
    </div>
  </div>
);

const collections = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/635385e0017435f8ef0809881b5ec73044f656fe6d4c7707c0c4a80f9bfb5311?apiKey=6c89b4a2db244c5d969134d9199949c2&",
    title: "Argentina"
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c37168cf7b783b235c620450e84dcc848efc6328e46886b8b25270b0fb705b67?apiKey=6c89b4a2db244c5d969134d9199949c2&",
    title: "Disney"
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9679356f04f3f1e5edd46c469f17002e09c93c1898d39bbd1cd7fc82b145ce50?apiKey=6c89b4a2db244c5d969134d9199949c2&",
    title: "Flores"
  },
];

function Colecciones() {
  return (
    <section className="flex justify-center items-center px-16 py-20 bg-zinc-100 max-md:px-5">
      <div className="flex flex-col justify-center mt-2.5 w-full max-w-[876px] max-md:max-w-full">
        <div className="flex flex-col self-center max-w-full text-center w-[542px]">
          <h2 className="text-5xl font-bold tracking-tighter leading-10 text-emerald-800 max-md:max-w-full max-md:text-4xl">
            Mirá nuestras colecciones
          </h2>
          <p className="self-center mt-6 text-lg text-neutral-700 max-md:max-w-full">
            Lorem ipsum dolor sit amet consectetur. Cursus sem adipiscing est diam pulvinar adipiscing ut sit.
          </p>
        </div>
        <div className="mt-10 max-md:max-w-full">
          <div className="flex items-end gap-5 max-md:flex-col max-md:gap-0">
            {collections.map((collection, index) => (
              <CollectionCard key={index} {...collection} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Colecciones;