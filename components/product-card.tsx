import Link from "next/link"

interface Props {
    product: {
        name: string,
        slug: string,
        description: string,
        id: string,
        images: any[],
        options: any,
        price:any
    }
}

export default function ProductCard({ product }:Props) {

    return (
        <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-background"
        >
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                    src={product.images[0].file.url}
                    alt={product.images[0].caption}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/products/${product.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </Link>
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                    <p className="text-sm italic text-gray-500">{product.options[0].values.length} {product.options[0].name}s</p>
                    <p className="text-base font-medium text-gray-900">${product.price}</p>
                </div>
            </div>
        </div>
    )
}