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

const GET_CATEGORY_PRODUCTS = gql`
query getProductsInCategory ($category: String!) {
  categoryBySlug(slug: $category) {
    products (_currency: "CAD") {
      id
      slug
      name
      price
      currency
      images {
        file {
          url
          width
          height
        }
      }
      options {
        name
        values {
          name
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

const GET_SINGLE_PRODUCT = gql`
query getProductBySlug($slug:String) {
  productBySlug(slug: $slug) {
    id
    name
    description
    slug
    price
    currency
    images{
      id
      caption
      file{
        url
        width
        height
      }
    }
    options {
      name 
      values{
        name
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
    GET_CATEGORY_PRODUCTS,
    GET_PRODUCTS,
    GET_SINGLE_PRODUCT,
    GET_NAV
}