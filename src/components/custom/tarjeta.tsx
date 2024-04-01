import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Link from 'next/link';

export default function Tarjeta({ record }: any) {
    return (
        <Card className="w-fit m-2 lg:m-3 rounded-lg shadow-md hover:shadow-xl">
            {/* <Link href={`/producto/${record.id}`}> */}
                <CardHeader>
                <CardTitle className='font-normal font-sm text-gris'>{record.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image
                        src={record.image_url}
                        width={220}
                        height={220}
                        alt="Picture of the author"
                        className='rounded-lg'
                    />
                </CardContent>
            {/* </Link> */}
        </Card>
    )
}
