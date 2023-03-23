// pages/_app.tsx
import "../globals.css";
import { ApolloProvider } from "@apollo/client";
import { CartProvider } from "../lib/cartContext";
import { apolloClient } from "../lib/shopify";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={apolloClient}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  );
};

export default MyApp;