import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GQL_URL as string,
    headers: {
        'Authorization': process.env.NEXT_PUBLIC_STORE_KEY as string
    },
    cache: new InMemoryCache()
})

export default client