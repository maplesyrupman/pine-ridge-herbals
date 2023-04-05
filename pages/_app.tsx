import "@/globals.css";
import { ApolloProvider } from "@apollo/client";
import { CartProvider } from "@/lib/cartContext";

const MyApp = ({ Component, pageProps }: any) => {
  return (
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
  );
};

export default MyApp;