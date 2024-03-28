import * as React from "react";

interface WhatsappChatButtonProps {
  label: string;
}

const WhatsappChatButton: React.FC<WhatsappChatButtonProps> = ({ label }) => {
  return (
    <button className="w-fit justify-center py-3 px-7 mt-6 font-semibold text-orange-50 bg-orange-600 rounded-[50px]">
      {label}
    </button>
  );
};

const Mayorista: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-32 mx-32">
      <div className="flex gap-20 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col self-stretch my-auto text-lg px-10">
            <h2 className="text-5xl font-bold tracking-tighter leading-10 text-emerald-800 max-md:max-w-full max-md:text-4xl max-md:leading-10">
              ¿Querés hacer un pedido por mayor?
            </h2>
            <p className="mt-6 text-neutral-700 max-md:max-w-full">
              Ya sea para regalar stickers a tus empleados o para tu empresa,
              un evento o emprendimiento, nosotros te armamos un presupuesto a
              medida para vos. Contactanos!{" "}
            </p>
            <WhatsappChatButton label="Chatear por Whatsapp" />
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <img
            loading="lazy"
            src="https://ujfmhfambjwfboketpby.supabase.co/storage/v1/object/public/images/landing/cuaderno.png"
            alt="mock up de cuaderno"
            className="grow w-full rounded-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Mayorista;