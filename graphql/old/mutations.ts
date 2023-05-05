import { gql } from "@apollo/client"

export const ADD_TO_CART = gql`
mutation addToCart(
    $productId: ID!, 
    $quantity: Int!, 
    $variantId: ID!
    ){
    addCartItem(
      input: {
        productId: $productId
        quantity: $quantity
        variantId: $variantId
      }
    ) {
      checkoutUrl
      grandTotal
      items {
        id
        quantity
        price
        discountTotal
        taxTotal
        priceTotal
        product {
          id
          name
          currency
          images{
            file {
              url
            }
            caption
          }
        }
      }
    }
  }
`