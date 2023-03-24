import Collections from "@/components/collections"
import CTA from "@/components/CTA"
import Hero from "@/components/hero"
import Guarantee from "@/components/guarantee"
import Layout from "@/components/layout"

export default function Home() {
    return (
        <Layout>
            <Hero />
            <CTA />
            <Collections />
            <Guarantee />
        </Layout>
    )
}