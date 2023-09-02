import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="m-8">
          <p className="font-semibold text-2xl">Mis datos</p>
          <Card className="mt-3 w-[350px]">
            <CardContent>
              contentt
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Editar</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="m-8">
          <p className="font-semibold text-2xl">Mi dirección</p>
          <Card className="mt-3 w-[350px]">
            <CardContent>
              contentt
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Editar</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
