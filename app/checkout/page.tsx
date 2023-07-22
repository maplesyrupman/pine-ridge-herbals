"use client"
import useCartStore from "@/stores/cart"
import Link from "next/link"
import CartItem from "./cartItem"
import { CartLine } from "generated/graphql"

export default function CheckOut() {
    const cart = useCartStore(state => state.cart)
    let subTotalString: string = Number(cart?.cost.subtotalAmount.amount).toFixed(2)
    const subTotal:number = Number(subTotalString)
    const shipping:number = 15
    const tax:number = Number(((shipping + subTotal)*0.13).toFixed(2))
    const total:number = Number(subTotal) + shipping + tax

    function sendToCheckout() {

    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
                    onSubmit={sendToCheckout}
                >
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {cart?.lines.edges.map(({node}, itemIdx) => (
                                <CartItem key={node.id}  item={node as CartLine} itemIdx={itemIdx} />
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">${subTotal}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    {/* <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a> */}
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    {/* <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a> */}
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">${tax}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${total}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Link
                                href={cart?.checkoutUrl || '#'}
                                className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </Link>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
