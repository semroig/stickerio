import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';

export default function Tarjeta({ record }: any) {
    return (
        <Card className="m-5 lg:m-3 rounded-lg shadow-md hover:shadow-xl">
            <Link href={`/producto/${record.id}`}>
                <CardHeader>
                <CardTitle className='font-normal font-sm text-gris'>{record.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image
                        src={record.image_url}
                        width={200}
                        height={200}
                        alt="Picture of the author"
                        className='rounded-lg'
                    />
                </CardContent>
            </Link>
        </Card>
    )
}
