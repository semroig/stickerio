import * as React from "react";

interface SocialMediaIconProps {
  src: string;
  alt: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="shrink-0 w-8 aspect-square fill-amber-500" />
);

const Footer: React.FC = () => {
  const socialMediaIcons: SocialMediaIconProps[] = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8b1b88ab9592065e6246bb4fc55c5c52bfdd4de7b78fa53b4e25ef91765fb0a?apiKey=6c89b4a2db244c5d969134d9199949c2&", alt: "Social media icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bebda04ecc8556d160609d9aacaf9b0db148dd7dd52761c47c3d8010e3605658?apiKey=6c89b4a2db244c5d969134d9199949c2&", alt: "Social media icon 2" },
  ];

  return (
    <section className="flex justify-center items-center px-16 py-20 shadow-sm bg-zinc-100 max-md:px-5">
      <div className="justify-center mt-2.5 w-full max-w-[1078px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[16%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96a6ad3e02f7f6f9f36c5f7bb6bfa3f7e9f640d1c3498d149056388174878475?apiKey=6c89b4a2db244c5d969134d9199949c2&"
              alt="Contact us image"
              className="grow shrink-0 max-w-full aspect-[0.8] w-[159px] max-md:mt-10"
            />
          </div>
          <div className="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col justify-center self-end max-w-full w-[254px]">
                <div className="flex flex-col pl-11 max-md:pl-5">
                  <h2 className="self-start text-3xl font-bold text-neutral-700">Contactanos!</h2>
                  <div className="flex flex-col justify-center self-end mt-4 w-20">
                    <div className="flex gap-4">
                      {socialMediaIcons.map((icon, index) => (
                        <SocialMediaIcon key={index} src={icon.src} alt={icon.alt} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-center mt-4 text-base text-right text-neutral-700">
                  <p className="my-auto">CABA, Buenos Aires Arg.</p>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c0355fdda487b8bf5fc83bc8ef28dfe1d478d0e021b5ef07045cf1514163b71?apiKey=6c89b4a2db244c5d969134d9199949c2&"
                    alt="Location icon"
                    className="shrink-0 aspect-[0.71] fill-amber-500 w-[17px]"
                  />
                </div>
              </div>
              <footer className="justify-end items-end px-16 pt-4 mt-6 text-base text-stone-300 max-md:pl-5 max-md:max-w-full">
                Developed and designed by us
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;