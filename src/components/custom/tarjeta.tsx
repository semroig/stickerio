import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';

export default function Tarjeta({ record }: any) {
    return (
        <Card className="m-3">
            <Link href={`/producto/${record.id}`}>
                <CardHeader>
                <CardTitle>{record.name}</CardTitle>
                <CardDescription>Deploy your new one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={record.image_url}
                        width={200}
                        height={200}
                        alt="Picture of the author"
                    />
                </CardContent>
            </Link>
        </Card>
    )
}
