import { Button } from "@/components/ui/button"

export default function Home({ params }: any) {
    const { id } = params;
    return (
        <div className="container mx-auto">
            <h1>Producto id { id }</h1>
            <Button>Click me</Button>
        </div>
    )
}
