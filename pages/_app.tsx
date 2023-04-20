import "@/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/graphql/client";
import { CartProvider } from "@/lib/cartContext";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  );
};

export default MyApp;