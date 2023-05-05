import { gql } from "@apollo/client"

//convert to shopify
export const GET_CATEGORIES = gql`
query getCategories {
    categories(limit: 10, page: 1) {
      results {
        name
        slug
        images {
            caption
            file {
              url
              width
              height
            }
          }
      }
    }
  }
`

export const GET_CATEGORY_PRODUCTS = gql`
query productsByCollections ($query: String!) {
  collections(first: 10, query: $query) {
    nodes {
      title
      description
      handle
      id
      products(first: 10) {
        nodes {
          description
          handle
          id
          featuredImage {
            altText
            height
            id
            url
            width
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 10) {
            nodes {
              id
              price {
                amount
              }
              title
            }
          }
        }
      }
    }
  }
}
`

//convert to shopify
export const GET_PRODUCTS = gql`
query getAllProducts {
    products(limit: 25, page: 1) {
      results {
        id
        name
        slug
        price
        currency
        options {
          id
          attributeId
          name
          inputType
          active
          required
          variant
          values {
            id
            name
            price
            description
          }
        }
      }
    }
  }
`

export const GET_SINGLE_PRODUCT = gql`
query getSingleProduct ($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    images(first: 10) {
      nodes {
        id
        height
        width
        url
        altText
      }
    }
    tags
    totalInventory
    variants(first: 10) {
      nodes {
        id
        title
        quantityAvailable
        price {
          amount
        }
      }
    }
  }
}
`

//convert to shopify
export const GET_CART = gql`
query getCart {
  cart {
    checkoutUrl
    grandTotal
    items {
      id
      quantity
      price
      discountTotal
      taxTotal
      product {
        id
        name
        currency
      }
    }
  }
}
`
