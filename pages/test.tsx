import { GET_CATEGORIES, GET_PRODUCTS, GET_SINGLE_PRODUCT} from "@/graphql/queries"
import { useEffect, useState } from "react"
import client from "@/graphql/client"
import { ADD_TO_CART } from "@/graphql/mutations"

export default function Test() {

    //cart 
    async function addToCart(e: React.FormEvent) {
        e.preventDefault()
        const t = e.target
        const productId = t[0].value
        const variantId = t[1].value
        const quantity = Number(t[2].value)

        console.log(productId,variantId,quantity)
        try {
            const { data } = await client.mutate({
                mutation: ADD_TO_CART,
                variables: {
                        productId,
                        variantId,
                        quantity
                }
            })
            console.log(data)
        } catch (err) {

        }
    }

    async function getCart() {
        const {data} = await client.query({query: GET_SINGLE_PRODUCT, variables: {id: "gid://shopify/Product/8186010829095"}})
        console.log(data)
    }


    return (
        <div>

            <div>
                <h2>Cart</h2>
                <form onSubmit={addToCart}>
                    <div>
                        <label htmlFor="itemId">itemId:</label>
                        <input type="text" id="itemId" />
                    </div>
                    <div>
                        <label htmlFor="variantId">variantId:</label>
                        <input type="text" id="variantId" />
                    </div>
                    <div>
                        <label htmlFor="quantity">quantity:</label>
                        <input type="number" id="quantity" />
                    </div>
                    <button type="submit">
                        add to cart
                    </button>
                </form>
            </div>

            <div>
                <button onClick={getCart} >Get Cart</button>
            </div>
        </div>
    )
}