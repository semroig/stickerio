import Link from 'next/link'

import LogInForm from '@/components/custom/logInForm'

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ingresar a tu cuenta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LogInForm></LogInForm>

        <p className="mt-10 text-center text-sm text-gray-500">
          No estás registrado? {" "}
          <Link
            href="/sign-up"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Creá tu cuenta</Link>
        </p>
      </div>
    </div>
  )
}
