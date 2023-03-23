import { ApolloClient, InMemoryCache } from "@apollo/client";
import Client from "shopify-buy";

const apolloClient = new ApolloClient({
  uri: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2022-01/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  },
});

const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN as string,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  apiVersion: "2023-01",
});

export { apolloClient, shopifyClient };