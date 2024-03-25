import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import createSupabaseServerClient from "@/lib/supabase/server";

import ProgressBar from "@/components/custom/progressBar";

export default async function Home({ params }: any) {
    const { data } = await readUserSession();
    if(!data.session) return redirect('/login');

    // Obtengo id de prod y busco registro
    const { id } = params;

    // Inicializo cliente de supabase
    const supabase = await createSupabaseServerClient();
    const { data: order, error } = await supabase
        .from("Order").select().eq('id', id);

    if (order) console.log(order);
    if (error) console.error(error);

    return (
        <div>
            <div className="flex justify-center">
                <div className="mt-10">
                    <p className="font-semibold text-2xl">Mi Pedido</p>
                    <p className="font-normal text-md">(cod interno: {id})</p>
                </div>
            </div>
            <div className="mx-20 mt-10">
                <ProgressBar estado={order[0].estado} ></ProgressBar>
            </div>
        </div>
    )
}
