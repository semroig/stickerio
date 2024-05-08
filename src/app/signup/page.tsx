import type { Metadata } from 'next'
export const metadata: Metadata = { title: "Registrarse" }

import SignUpForm from '@/components/custom/signUpForm'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data } = await readUserSession();
  if(data.session) return redirect('/catalogo');

  // TO DO: Falta que te redireccione a un cartel para revisar tu email
  // TO DO: Mail de redireccion con lindo template y mail de origen
  // TO DO: Guardar dato de Name en supabase

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <SignUpForm />
    </div>
  )
}
