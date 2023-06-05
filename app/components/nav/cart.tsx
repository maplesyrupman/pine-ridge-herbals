"use client"

import { Transition, Popover } from "@headlessui/react"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Fragment, useEffect } from "react"
import useCartStore from "@/stores/cart"
import Image from "next/image"
import Link from "next/link"

export default function Cart() {
    // const cartId = localStorage.getItem('cartId')
    // const setCartId = useCartStore(state => state)
    const cart = useCartStore(state => state.cart)
    const getCart = useCartStore(state => state.getCart)

    useEffect(() => {
        if (cart) {
            localStorage.setItem('cartId', cart.id)
        } else {
            const cartId = localStorage.getItem('cartId')
            if (cartId) {
                getCart(cartId)
            }
        }
    }, [cart])

    return (
        <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
            <Popover.Button className="group -m-2 flex items-center p-2 focus:outline-none">
                <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-secondary group-hover:text-secondary"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-secondary-light group-hover:text-secondary">{cart?.lines.edges.length}</span>
                <span className="sr-only">items in cart, view bag</span>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-secondary-light pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">Shopping Cart</h2>


                    {cart && cart?.lines.edges.length > 0 ? 
                            <form className="mx-auto max-w-2xl x-4">
                                <ul role="list" className="divide-y divide-primary-dark">
                                    {cart?.lines.edges && cart.lines.edges.map(({ node }) => (
                                        <li key={node.id} className="flex items-center py-6">
                                            <Image
                                                src={node.merchandise.product.featuredImage?.url as string}
                                                alt={node.merchandise.product.featuredImage?.altText || 'product'}
                                                width={node.merchandise.product.featuredImage?.width as number}
                                                height={node.merchandise.product.featuredImage?.height as number}
                                                className="h-16 w-16 flex-none rounded-md"
                                            />
                                            <div className="ml-4 flex-auto">
                                                <h3 className="font-medium text-gray-900">
                                                    <Link href={'#'}>{node.merchandise.product.title}</Link>
                                                </h3>
                                                <p className="text-gray-500">{node.merchandise.title}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    type="button"
                                    className="w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Checkout
                                </button>

                                <p className="mt-6 text-center">
                                    <Link href="/checkout" className="text-sm font-medium text-primary hover:text-primary-dark">
                                        View Shopping Bag
                                    </Link>
                                </p>
                            </form>
                            :
                            <p className="mt-6 text-center italic">
                                Cart is currently empty
                            </p>
                    }
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}