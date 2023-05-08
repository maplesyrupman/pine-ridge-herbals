import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import type { DefaultOptions } from "@apollo/client"

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const httpLink = createHttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_V}/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions
})

export default client