import "@/globals.css";
// import { ApolloProvider } from "@apollo/client";
import client from "@/lib/graphql/client";
// import { CartProvider } from "@/lib/cartContext";
import ApolloProvider from '../lib/apollo/ApolloProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ApolloProvider>
                    {/* <CartProvider> */}
                        {children}
                    {/* </CartProvider> */}
                </ApolloProvider>
            </body>
        </html>
    );
}
