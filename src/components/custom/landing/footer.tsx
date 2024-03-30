import * as React from "react";

import Link from 'next/link'

import { Instagram, MessageCircle, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <section className="flex justify-center items-center px-16 py-10 mt-24 shadow-2xl">
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
              <div className="flex flex-col justify-end self-end max-w-full w-[254px]">
                <div className="flex flex-col pl-11 max-md:pl-5">
                  <h2 className="text-3xl font-bold text-neutral-700">Contactanos!</h2>
                  <div className="flex justify-end mt-3">
                    <a href="https://www.instagram.com/thesticker.company/" target="_blank">
                      <Instagram color="#FFAB02" size={32}/>
                    </a>
                    <a target='_blank' href="https://api.whatsapp.com/send?phone=5491123920584&text=Hola!%20C%C3%B3mo%20est%C3%A1n%3F%0AQuiero%20hacerles%20una%20consulta%20antes%20de%20armar%20mi%20pedido">
                      <MessageCircle color="#FFAB02" size={32} className="mx-4"/>
                    </a>
                  </div>
                </div>
                <div className="flex gap-2 justify-end mt-3 text-base text-right text-neutral-700">
                  <p className="my-auto">Buenos Aires, Argentina</p>
                  <MapPin color="#FFAB02" size={20} className="mr-4"/>
                </div>
              </div>
              
              <div className="mr-5">
                <hr className="mt-5"></hr>
                <footer className="mt-1 text-end text-base text-stone-300">
                  Designed by <a href="https://www.linkedin.com/in/victoria-cabranes/">Vicky </a> 
                  and developed by <a href="https://www.linkedin.com/in/sem-gabriel-roig/">Sem</a>
                </footer>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;