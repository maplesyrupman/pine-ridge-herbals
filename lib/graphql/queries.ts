import { gql } from "@apollo/client"

const GET_CATEGORIES = gql`
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

const GET_PRODUCTS = gql`
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
        purchaseOptions {
          standard {
            price
            sale
            salePrice
          }
          subscription {
            plans {
              id
              name
              price
              billingSchedule {
                interval
                intervalCount
              }
            }
          }
        }
      }
    }
  }
`

const GET_NAV = gql`
query getMenus {
    menuSettings {
      sections {
        id
        name
        items
      }
    }
  }
`

export {
    GET_CATEGORIES, 
    GET_PRODUCTS,
    GET_NAV
}