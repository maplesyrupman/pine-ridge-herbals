import Image from "next/image"
import Link from "next/link"

interface Props {
    product: {
        title: string,
        handle: string,
        description: string,
        id: string,
        featuredImage: {
            altText: string,
            id: string,
            url: string,
            width: number, 
            height: number
        },
        variants: {
            nodes: [{
                title: string,
                price: {
                    amount: string,
                }
            }]
        },
        priceRange: {
            minVariantPrice: {
                amount: string
            }
        }
    }
}

export default function ProductCard({ product }:Props) {
    console.log(product)
    return (
        <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-secondary-light"
        >
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    height={product.featuredImage.height}
                    width={product.featuredImage.width}
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/products/${product.handle}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                    </Link>
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                    <p className="text-sm italic text-gray-500">{product.variants.nodes.length} sizes</p>
                    <p className="text-base font-medium text-gray-900">${product.priceRange.minVariantPrice.amount}</p>
                </div>
            </div>
        </div>
    )
}