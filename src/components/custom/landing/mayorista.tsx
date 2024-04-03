import * as React from "react";

import { Button } from "@/components/ui/button";

interface WhatsappChatButtonProps {
  label: string;
}

const WhatsappChatButton: React.FC<WhatsappChatButtonProps> = ({ label }) => {
  return (
    <Button
      className="text-lg py-6 px-7 mt-6 font-medium text-crema bg-naranja rounded-[50px]">
      {label}
    </Button>
  );
};

const Mayorista: React.FC = () => {
  return (
    <div className="lg:flex justify-center items-center mt-20 mx-10 lg:mx-36">
      <div className="basis-1/2 lg:pr-28">
        <p className="text-4xl lg:text-5xl font-medium text-verde">
          ¿Querés hacer un pedido por<span className="highlight highlight-celeste"> mayor? </span>
        </p>
        <p className="text-lg mt-6 text-gris font-light">
          Ya sea para regalar stickers a tus empleados, un evento o
          para tu publicitar tu propio emprendimiento,
          nosotros te armamos un presupuesto a
          medida para vos. Contactanos!
        </p>
        <a
          target='_blank'
          href='https://api.whatsapp.com/send?phone=5491123920584&text=Hola!%20C%C3%B3mo%20est%C3%A1n%3F%0AQuiero%20pedir%20una%20cotizaci%C3%B3n%20para%20un%20pedido%20por%20mayor'
        >
          <WhatsappChatButton label="Chatear por Whatsapp" />
        </a>
      </div>
      <div className="basis-1/2">
        <img
          loading="lazy"
          src={"https://lh3.googleusercontent.com/d/" + "1U8nckAqt_RozK0WGDC-QCFiLnPcc77tz"}
          alt="Mock up de cuaderno"
          className="mt-10 lg:grow lg:w-full rounded-[40px]"
        />
      </div>
    </div>
  );
};

export default Mayorista;