import Link from "next/link"
import Image from "next/image"
import { XMarkIcon } from '@heroicons/react/20/solid'
import { CartLine } from "generated/graphql"
import useCartStore from "@/stores/cart"
type CartLineLess = Omit<CartLine, "attributes"|"cost"|"discountAllocations"|"estimatedCost">
interface Props {
    item: CartLine
    itemIdx: number
}

export default function CartItem({item, itemIdx}: Props) {
    const removeItem = useCartStore(state => state.removeItem)
    const updateItemQuantity = useCartStore(state => state.updateItem)

    function updateQuantity(e:any) {
        console.log(typeof e.target.value)
        updateItemQuantity(item.id, Number(e.target.value))
    }

    function removeItemFromCart() {
        removeItem(item.id)
    }

    return (
        <li className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <Image
                    src={item.merchandise.product.featuredImage?.url}
                    alt={item.merchandise.product.featuredImage?.altText || 'product'}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    width={item.merchandise.product.featuredImage?.width as number}
                    height={item.merchandise.product.featuredImage?.height as number}
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className=" flex relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <Link href={`/product/${item.merchandise.product.handle}`} className="font-medium text-gray-900 hover:text-gray-800">
                                    {item.merchandise.product.title}
                                </Link>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{item.merchandise.title}</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-500">${item.cost.amountPerQuantity.amount} /unit</p>
                        <p className="mt-1 text-md font-bold text-gray-900">${item.cost.subtotalAmount.amount} total</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                            Quantity, {item.merchandise.title}
                        </label>
                        <select
                            id={`quantity-${itemIdx}`}
                            name={`quantity-${itemIdx}`}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            onChange={updateQuantity}
                            value={item.quantity}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                        </select>

                        <div className="absolute right-0 top-0">
                            <button 
                            onClick={removeItemFromCart}
                            type="button" 
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}