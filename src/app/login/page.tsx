import Link from 'next/link'

import LogInForm from '@/components/custom/logInForm'
import OAuthForm from '@/components/custom/oAuthForm';
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data } = await readUserSession();
  if(data.session) return redirect('/catalogo');

  // TO DO: Mostrar toast de error si no funciona el log in

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="lg:mx-72">
        <Link href={"/"} className="my-auto">
            <img className="mx-auto h-10 w-auto" src="https://cdn.builder.io/api/v1/image/assets/TEMP/30921df5111aa506c586a7551e38e7484402027c4872fe944ecc79a426346910?apiKey=6c89b4a2db244c5d969134d9199949c2&" alt="Your Company" />
        </Link>
      </div>

      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-verde">Ingresar a tu cuenta</h2>
      
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LogInForm></LogInForm>
        {/* <OAuthForm></OAuthForm> */}

        <p className="mt-10 text-center text-sm text-gray-500">
          No estás registrado? {" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Creá tu cuenta</Link>
        </p>
      </div>
    </div>
  )
}
