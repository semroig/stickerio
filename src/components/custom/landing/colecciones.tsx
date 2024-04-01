import * as React from "react";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react"

interface CollectionCardProps {
  imageSrc: string;
  title: string;
  id: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ imageSrc, title, id }) => (
  <div className="basis-1/3">
    <Link href={"/catalogo" + "?category=" + id}>
      <div className="hover:shadow-2xl shadow-md m-5 lg:m-2 overflow-hidden relative justify-center p-2.5 text-xl text-white whitespace-nowrap rounded-2xl aspect-[0.81]">
        <img src={imageSrc} alt={`${title} collection`} className="object-cover absolute inset-0 size-full" />
        <div className="flex relative justify-between lg:mt-80 p-3 rounded-2xl border-2 border-white border-solid bg-black bg-opacity-60">
          <div>{title}</div>
          <ArrowUpRight />
        </div>
      </div>
    </Link>
  </div>
);

const collections = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/635385e0017435f8ef0809881b5ec73044f656fe6d4c7707c0c4a80f9bfb5311?apiKey=6c89b4a2db244c5d969134d9199949c2&",
    title: "Argentina",
    id: '2'
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c37168cf7b783b235c620450e84dcc848efc6328e46886b8b25270b0fb705b67?apiKey=6c89b4a2db244c5d969134d9199949c2&",
    title: "Disney",
    id: '1'
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9679356f04f3f1e5edd46c469f17002e09c93c1898d39bbd1cd7fc82b145ce50?apiKey=6c89b4a2db244c5d969134d9199949c2&",
    title: "Moods",
    id: '3'
  },
];

function Colecciones() {
  return (
    <div className="lg:justify-center mt-14 lg:mt-24 mx-10 lg:mx-52">
      <div className="lg:self-center lg:text-center lg:mx-40">
        <p className="text-4xl lg:text-5xl font-medium text-verde">
          Mirá nuestras<span className="highlight highlight-celeste"> colecciones </span>
        </p>
        <p className="lg:self-center mt-6 text-lg text-gris font-light">
        Explorá nuestra selección de stickers que van desde personajes de
        películas hasta diseños únicos. Encontrá la combinación ideal para vos!
        </p>
      </div>
      <div className="mt-10 lg:mt-5">
        <div className="lg:flex items-end">
          {collections.map((collection, index) => (
            <CollectionCard key={index} {...collection} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Colecciones;