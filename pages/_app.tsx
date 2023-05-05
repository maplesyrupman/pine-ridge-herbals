import "@/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;