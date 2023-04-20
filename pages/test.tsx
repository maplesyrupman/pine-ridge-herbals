import { useQuery } from "@apollo/client"
import { GET_CATEGORIES, GET_PRODUCTS, GET_NAV } from "@/lib/graphql/queries"
import { useEffect, useState } from "react"

export default function Test() {
    const [categories, setCategories] = useState()

    const {loading, error, data} = useQuery(GET_NAV)

    useEffect(() => {
        console.log(loading)
        console.log(data)
    }, [data])

    return (
        <div>
            This is a test!
        </div>
    )
}