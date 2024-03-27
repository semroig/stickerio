import * as React from "react";

interface WhatsappChatButtonProps {
  label: string;
}

const WhatsappChatButton: React.FC<WhatsappChatButtonProps> = ({ label }) => {
  return (
    <button className="justify-center px-6 py-4 mt-6 font-semibold text-orange-50 bg-orange-600 rounded-[50px] max-md:px-5 max-md:max-w-full">
      {label}
    </button>
  );
};

const Mayorista: React.FC = () => {
  return (
    <div className="flex justify-center items-center px-16 py-12 bg-zinc-100 max-md:px-5">
      <div className="w-full max-w-[1082px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto text-lg max-md:mt-10 max-md:max-w-full">
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
          <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://ujfmhfambjwfboketpby.supabase.co/storage/v1/object/public/images/landing/cuaderno.png"
              alt="mock up de cuaderno"
              className="grow w-full max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mayorista;