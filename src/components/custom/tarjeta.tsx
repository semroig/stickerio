import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Tarjeta({ record }) {
    return (
        <Card className="m-3">
            <CardHeader>
            <CardTitle>{record.name}</CardTitle>
            <CardDescription>Deploy your new one-click.</CardDescription>
            </CardHeader>
            <CardContent>
            <Image
                src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                width={200}
                height={200}
                alt="Picture of the author"
            />
            </CardContent>
        </Card>
    )
}
