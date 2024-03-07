import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import { Button } from "@/components/ui/button"

export default async function Home() {
  const { data } = await readUserSession();
  if(!data.session) return redirect('/login');

  return (
    <main>
        <h1>Checkout</h1>
      <Button>Click me</Button>
    </main>
  )
}