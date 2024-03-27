import Link from 'next/link'

import SignUpForm from '@/components/custom/signUpForm'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data } = await readUserSession();
  if(data.session) return redirect('/catalogo');

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Crear una cuenta nueva</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm></SignUpForm>

        <p className="mt-10 text-center text-sm text-gray-500">
          Ya tenés una cuenta? {" "}
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Ingresar con mi cuenta</Link>
        </p>
      </div>
    </div>
  )
}
