"use client"
import ProductsGrid from "@/components/product-grid"
import { useEffect, useState } from 'react'
import MobileCategoryOptions from "@/components/category-options/mobile"
import { DesktopCategoryOptions } from "@/components/category-options"
import Spinner from "@/components/spinner"
import client from "@/lib/apollo//client"
import { ProductsByCollectionsDocument } from "generated/graphql"
import CustomHerbsCTA from "@/components/customHerbsCTA"

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'all', label: 'All Products' },
      { value: 'salves', label: 'Salves' },
      { value: 'oils', label: 'Oils' },
      { value: 'teas', label: 'Teas' },
      { value: 'seasonal', label: 'Seasonal' },
    ],
  },
  {
    id: 'use-case',
    name: 'Use Cases',
    options: [
      { value: 'pain-relief', label: 'Pain Relief' },
      { value: 'skin-irritation', label: 'Skin Irritation' },
      { value: 'sleep', label: 'Sleep' },
      { value: 'memory', label: 'Memory' },
    ],
  },
]

interface CategoryData {
  title: string,
  description: string
}
const multiCategory: CategoryData = {
  title: 'All Products',
  description: 'Shop all of our wild crafted products'
}

function getQueryString(collections: string[]) {
  return collections.map(c => `title:'${c}'`).join(' OR ')
}


export default function Category(context: any) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const collections = context.searchParams.collections.split(' ') as string[]
  const queryString = getQueryString(collections as string[])

  const [collection, setCollection] = useState<CategoryData>(multiCategory)
  const [products, setProducts] = useState<null | any[]>(null)

  useEffect(() => {
    (async () => {
      const { data } = await client.query({ query: ProductsByCollectionsDocument, variables: { query: queryString } })
      console.log(data)
      let allProducts: any[] = []
      if (data.collections.nodes.length > 1) {
        const { title, description } = data.collections.nodes[0]
        setCollection({ title, description })
      }

      data.collections.nodes.forEach((c: any) => {
        allProducts = [...allProducts, ...c.products.nodes]
      })
      setProducts(allProducts)
    })()
  }, [queryString])


  return (
    <>
      <div>
        {/* Mobile filter dialog */}
        <MobileCategoryOptions
          filters={filters}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{collection.title}</h1>
            <p className="mt-4 text-base text-gray-500">{collection.description}</p>
          </div>

          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">

            <DesktopCategoryOptions mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters} />
            <div className="lg:hidden mt-3">
              <CustomHerbsCTA />
            </div>
            {!products ?
              <div className="h-20 w-full flex justify-center align-center"><Spinner /></div> :
              <ProductsGrid products={products} />
            }
          </div>
        </main>
      </div>
    </>
  )
}