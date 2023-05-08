import { Transition, Popover } from "@headlessui/react"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Fragment, useEffect } from "react"
import { useQuery } from "@apollo/client"

import create from "zustand"

const products = [
    {
        id: 1,
        name: 'Saint Sunshine',
        href: '/products/saint-sunshine',
        size: '9oz',
        imageSrc: '/salve-placeholder.png',
        imageAlt: 'Saint Sunshine salve',
    },
    {
        id: 2,
        name: 'Peppermint Oil',
        href: '/products/pepermint-oil',
        size: '4oz',
        imageSrc: '/oil-placeholder.jpeg',
        imageAlt: 'Pepermint Oil extract',
    },
    // More products...
]

export default function Cart() {

    return (
        <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
            <Popover.Button className="group -m-2 flex items-center p-2 focus:outline-none">
                <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
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
                <Popover.Panel className="absolute inset-x-0 top-24 mt-px bg-background pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">Shopping Cart</h2>

                    <form className="mx-auto max-w-2xl px-4">
                        <ul role="list" className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <li key={product.id} className="flex items-center py-6">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-16 w-16 flex-none rounded-md border border-gray-200"
                                    />
                                    <div className="ml-4 flex-auto">
                                        <h3 className="font-medium text-gray-900">
                                            <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="text-gray-500">{product.size}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            Checkout
                        </button>

                        <p className="mt-6 text-center">
                            <a href="#" className="text-sm font-medium text-primary hover:text-indigo-500">
                                View Shopping Bag
                            </a>
                        </p>
                    </form>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}