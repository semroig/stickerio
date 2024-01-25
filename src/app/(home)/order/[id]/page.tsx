import 'server-only'

import { Button } from "@/components/ui/button"

export default function Home({ params }: any) {
    const { id } = params;
    return (
        <main>
            <h1>Order id number: { id }</h1>
        <Button>Click me</Button>
        </main>
    )
}
