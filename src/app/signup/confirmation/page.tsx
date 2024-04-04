import Link from 'next/link'

import SignUpForm from '@/components/custom/signUpForm'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

export default async function Home({ searchParams }: any) {
  const { data } = await readUserSession();
  if(data.session) return redirect('/catalogo');

  // TO DO: Falta que te redireccione a un cartel para revisar tu email
  // TO DO: Mail de redireccion con lindo template y mail de origen
  // TO DO: Guardar dato de Name en supabase

  return (
    <div className="min-h-full justify-center py-12 lg:px-8">
        <div className="mx-10">
            <Link href={"/"} className="my-auto">
                <img className="mx-auto h-10 w-auto" src="https://cdn.builder.io/api/v1/image/assets/TEMP/30921df5111aa506c586a7551e38e7484402027c4872fe944ecc79a426346910?apiKey=6c89b4a2db244c5d969134d9199949c2&" alt="Your Company" />
            </Link>
            <p className="mt-10 text-2xl font-bold text-verde">Estas a un paso de crear tu cuenta!</p>

            <p className="mt-5 text-sm text-gris">
                Te enviamos un link a <a className='font-semibold'>{searchParams.mail}</a>
                para que valides tu usuario. Por las dudas podes revisar tu casilla de spam también.
            </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="mt-10 text-center text-sm text-gray-500">
                Todavia no lo recibiste? {" "}
                <Link href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Enviar link de nuevo</Link>
            </p>
        </div>
    </div>
  )
}
