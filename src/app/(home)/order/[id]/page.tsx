import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation';

import { Button } from "@/components/ui/button"

export default async function Home({ params }: any) {
    const { data } = await readUserSession();
    if(!data.session) return redirect('/login');

    const { id } = params;
    return (
        <main>
            <h1>Order id number: { id }</h1>
        <Button>Click me</Button>
        </main>
    )
}
