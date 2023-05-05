import Link from "next/link"
import Image from "next/image"

interface Product {
    id: number,
    name: string,
    href: string,
    imageSrc: string,
    imageAlt: string,
    price: string
}

interface Props {
    products: Product[]
}

export default function SuggestedProducts({ products }: Props) {

    return (
        <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                Customers also bought
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <div key={product.id}>
                        <Link href='#'>
                            <div className="relative">
                                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                    <Image
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <div className="relative mt-4">
                                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                </div>
                                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                    />
                                    <p className="relative text-lg font-semibold text-white">{product.price}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="mt-6">
                            <Link
                                href={product.href}
                                className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                            >
                                View<span className="sr-only">, {product.name}</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}