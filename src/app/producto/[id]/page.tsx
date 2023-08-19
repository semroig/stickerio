import { Button } from "@/components/ui/button"

export default function Home({ params }) {
    const { id } = params;
    return (
        <main>
            <h1>Producto id { id }</h1>
        <Button>Click me</Button>
        </main>
    )
}
