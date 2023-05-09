import "../globals.css"
import ApolloProvider from '../lib/apollo/ApolloProvider'
import Nav from "@/components/nav"
import Footer from '@/components/footer'

const navData = {

}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body>
                <ApolloProvider>
                    <Nav />
                        {children}
                    <Footer />
                </ApolloProvider>
            </body>
        </html>
    );
}