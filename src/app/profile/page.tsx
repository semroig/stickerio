import type { Metadata } from 'next'
export const metadata: Metadata = { title: "Perfil" }

import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import ProfileDataCard from "@/components/custom/profileDataCard"
import ProfileAddressCard from "@/components/custom/profileAddressCard"

export default async function Home() {
  const { data } = await readUserSession();
  if(!data.session) return redirect('/login');

  return (
    <div>
      <div className="flex flex-row justify-center px-20 mt-5">
        <div className="m-6 basis-1/3">
          <p className="font-semibold text-2xl">Mis datos</p>
          <ProfileDataCard></ProfileDataCard>
        </div>
        <div className="m-6 basis-1/3">
          <p className="font-semibold text-2xl">Dirección de envío</p>
          <ProfileAddressCard></ProfileAddressCard>
        </div>
      </div>
    </div>
  )
}
