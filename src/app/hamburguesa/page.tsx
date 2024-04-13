import { redirect } from 'next/navigation';
import Link from 'next/link';

import readUserSession from '@/lib/actions'

import Navbar from "@/components/custom/landing/navbar"
import Footer from "@/components/custom/landing/footer"

import SignOut from '@/components/custom/signOut'

export default async function Hamburguesa() {
    const { data: sessionData } = await readUserSession();
    if(!sessionData.session) return redirect('/login');

    return (
        <>
            <Navbar userSessionData={sessionData.session} isHamburguesaOpen={true}/>

            <div className='mx-10 mt-8'>
                <Link href={'/'} className='text-xl text-gris'>Home</Link>
                <hr className='my-3'/>
                <Link href={'/catalogo'} className='text-xl text-gris'>Catalogo</Link>
                <hr className='my-3'/>
                <Link href={'/order'} className='text-xl text-gris'>Mis pedidos</Link>
                <hr className='my-3'/>
                <Link href={'/carrito'} className='text-xl text-gris'>Carrito</Link>
                <hr className='mt-3 mb-5'/>
                <SignOut />
            </div>


            <Footer />
        </>
    )
}