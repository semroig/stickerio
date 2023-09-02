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
      <div className="flex flex-row justify-center px-20 mt-5">
        <div className="m-6 basis-1/3">
          <p className="font-semibold text-2xl">Mis datos</p>
          <Card className="mt-4 pt-5">
            <CardContent>
              <p className="font-semibold text-xl">Nombre</p>
              <p className="text-lg">Sem Gabriel Roig</p>
              <p className="font-semibold text-xl mt-2">Email</p>
              <p className="text-lg">sem.roig@gmail.com</p>
              <p className="font-semibold text-xl mt-2">Teléfono</p>
              <p className="text-lg">+54 9 11 4936 0562</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Editar</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="m-6 basis-1/3">
          <p className="font-semibold text-2xl">Dirección de envío</p>
          <Card className="mt-4 pt-5">
            <CardContent>
              <p className="font-semibold text-xl">Dirección</p>
              <p className="text-lg">Maipú 233</p>
              <p className="font-semibold text-xl mt-2">Localidad</p>
              <p className="text-lg">General Pacheco</p>
              <p className="font-semibold text-xl mt-2">Provincia</p>
              <p className="text-lg">Buenos Aires</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Editar</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
