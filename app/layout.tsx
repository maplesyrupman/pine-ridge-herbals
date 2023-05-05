import "@/globals.css"
// import { ApolloProvider } from "@apollo/client"
import client from "@/graphql/client"
// import { CartProvider } from "@/lib/cartContext"
import ApolloProvider from '../lib/apollo/ApolloProvider'
import Nav from "@/components/nav"
import Footer from '@/components/footer'
// import { useEffect } from "react"
// import { useQuery } from "@apollo/client"

const navData = {

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // useEffect(() => {

    // })
    return (
        <html lang="en">
            <body>
                <ApolloProvider>
                    <Nav />
                    {/* <CartProvider> */}
                        {children}
                    {/* </CartProvider> */}
                    <Footer />
                </ApolloProvider>
            </body>
        </html>
    );
}
