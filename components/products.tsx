interface Props {
    products: any[]
}

export default function ProductsGrid({products}:Props) {
    
    return (
        <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 id="product-heading" className="sr-only">
                Products
            </h2>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-background"
                    >
                        <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2 p-4">
                            <h3 className="text-sm font-medium text-gray-900">
                                <a href={product.href}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </a>
                            </h3>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <div className="flex flex-1 flex-col justify-end">
                                <p className="text-sm italic text-gray-500">{product.options}</p>
                                <p className="text-base font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}