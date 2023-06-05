"use client"
import { useState, useEffect } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import {
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'
import SuggestedProducts from '@/components/suggested-products'
import Image from 'next/image'
// import { useQuery } from '@apollo/client'
// import GET_SINGLE_PRODUCT from '@/graphql/queries/getSingleProduct.gql'
import Spinner from '@/components/spinner'
import { useGetSingleProductQuery, ProductVariant } from 'generated/graphql'
import QuantityInput from '@/components/quantity-input'
import client from '@/lib/apollo/client'
import useCartStore from 'stores/cart'

const relatedProducts = [
    {
        id: 1,
        name: 'Saint Sunshine',
        color: 'White and black',
        href: '/products/saint-sunshine',
        imageSrc: '/salve-placeholder.png',
        imageAlt: 'Saint Sunshine salve',
        price: '$20',
    },
    // More products...
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Product(context:any) {
    const productHandle = context.params.product
    console.log(context)
    

    const { data, loading, error } = useGetSingleProductQuery({ variables: { handle: productHandle as string } })

    useEffect(() => {
        if (data?.product?.variants.nodes.length && !selectedVariant) {
            setSelectedVariant(data?.product?.variants.nodes[0] as ProductVariant)
        }
    })



    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
    function changeSize(value: string) {
        const variant = data?.product?.variants.nodes.find((option: any) => option.title === value) || data?.product?.variants.nodes[0]
        setSelectedVariant(variant as ProductVariant)
    }

    const [quantity, setQuantity] = useState(1)

    const addToCart = useCartStore(state => state.addToCart)
    async function handleAddToCart(e: React.FormEvent) {
        e.preventDefault()
        addToCart(selectedVariant?.id as string, quantity)
    }

    return (
        <div className="pt-24">
            {selectedVariant ?
                <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        {/* Product */}
                        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                            {/* Image gallery */}
                            <Tab.Group as="div" className="flex flex-col-reverse">
                                {/* Image selector */}
                                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                    <Tab.List className="grid grid-cols-4 gap-6">
                                        {data?.product?.images.edges.map(({ node }) => (
                                            <Tab
                                                key={node.id}
                                                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-secondary-light text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className="sr-only">{node.altText}</span>
                                                        <span className="absolute inset-0 overflow-hidden rounded-md">
                                                            <Image src={node.url} alt={node.altText as string} className="h-full w-full object-cover object-center" height={node.height as number} width={node.width as number} />
                                                        </span>
                                                        <span
                                                            className={classNames(
                                                                selected ? 'ring-primary' : 'ring-transparent',
                                                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>

                                <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                                    {data?.product?.images.edges.map(({ node }) => (
                                        <Tab.Panel key={node.id}>
                                            <Image
                                                src={node.url}
                                                alt={node.altText as string}
                                                className="h-full w-full object-cover object-center sm:rounded-lg"
                                                width={node.width as number}
                                                height={node.height as number}
                                            />
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            {/* productMOCK info */}
                            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{data?.product?.title}</h1>

                                <div className="mt-3">
                                    <h2 className="sr-only">Product information</h2>
                                    <p className="text-3xl tracking-tight text-gray-900">${selectedVariant.price.amount}</p>
                                </div>

                                <div className="mt-6">
                                    <h3 className="sr-only">Description</h3>

                                    <div
                                        className="space-y-6 text-base text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: data?.product?.description as string }}
                                    />
                                </div>

                                <form
                                    className="mt-6"
                                    onSubmit={handleAddToCart}
                                >
                                    <div>
                                        <h3 className="text-sm text-gray-600">Size</h3>

                                        <RadioGroup value={selectedVariant.title} onChange={changeSize} className="mt-2">
                                            <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {data?.product?.variants.nodes.map(({ title }) => (
                                                    <RadioGroup.Option
                                                        key={title}
                                                        value={title}
                                                        className={({ checked }) => `${checked ? 'ring-[2px]' : ''} ring-black relative -m-0.5 flex cursor-pointer items-center justify-center rounded p-0.5 focus:outline-none`}
                                                    >
                                                        <RadioGroup.Label as="span" className="sr-only">
                                                            {title}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className='h-8 w-8 flex items-center justify-center'
                                                        >{title}</span>
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className='mt-10 flex'>
                                        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                                    </div>

                                    <div className="mt-10 flex">

                                        <button
                                            type="submit"
                                            className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                        >
                                            Add to bag
                                        </button>
                                    </div>
                                </form>

                                <section aria-labelledby="details-heading" className="mt-12">
                                    <h2 id="details-heading" className="sr-only">
                                        Additional details
                                    </h2>

                                    <div className="divide-y divide-gray-200 border-t">
                                        {data?.product?.ingredients && (() => {
                                            const ingredients = JSON.parse(data?.product?.ingredients?.value as string)

                                            return (
                                                <Disclosure as="div">
                                                    {({ open }) => (
                                                        <>
                                                            <h3>
                                                                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                                                    <span
                                                                        className={classNames(
                                                                            open ? 'text-primary' : 'text-gray-900',
                                                                            'text-sm font-medium'
                                                                        )}
                                                                    >
                                                                        Ingredients
                                                                    </span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <MinusIcon
                                                                                className="block h-6 w-6 text-primary group-hover:text-primary-dark"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <PlusIcon
                                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                                <ul role="list">
                                                                    {ingredients.map((item: string) => (
                                                                        <li key={item.trim()}>{item.trim()}</li>
                                                                    ))}
                                                                </ul>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            )
                                        })()}
                                    </div>
                                </section>
                            </div>
                        </div>
                        <SuggestedProducts products={relatedProducts} />

                    </div>
                </main>
                :
                <div className="h-20 w-full flex justify-center align-center"><Spinner /></div>
            }
        </div>
    )
}