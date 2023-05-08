"use client"
import ProductsGrid from "@/components/product-grid"
import { useEffect, useState } from 'react'
import MobileCategoryOptions from "@/components/category-options/mobile"
import { DesktopCategoryOptions } from "@/components/category-options"
import GET_CATEGORY_PRODUCTS from '@/graphql/queries/getCategoryProducts.gql'
import Spinner from "@/components/spinner"
import { useSearchParams } from "next/navigation"
import client from "@/lib/apollo//client"

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]
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

const products = [
  {
    id: 1,
    name: 'Power Pland Aid',
    href: '/products/power-plant-aid',
    price: '$20',
    description: 'Plantain healing salve.',
    options: '2 sizes',
    imageSrc: '/salve-placeholder.png',
    imageAlt: 'place holder',
  },
  {
    id: 2,
    name: 'Saint Sunshine',
    href: '/products/saint-sunshine',
    price: '$20',
    description: 'St John\'s wort moisturizing salve.',
    options: '2 sizes',
    imageSrc: '/salve-placeholder.png',
    imageAlt: 'place holder',
  },
  // More products...
]

interface CategoryData {
  title: string,
  description: string
}
const multiCategory:CategoryData = {
  title: 'All Products',
  description: 'Shop all of our wild crafted products'
}

function getQueryString(collections: string[]) {
  return collections.map(c => `title:'${c}'`).join(' OR ')
}

export default function Category() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const query = useSearchParams()
  let params = new URLSearchParams(query?.toString());
  const collections = params.get('collection')?.split(' ')
  const queryString = getQueryString(collections as string[])
  console.log(queryString)

  const [collection, setCollection] = useState<CategoryData>(multiCategory)
  const [products, setProducts] = useState<null|any[]>(null)


  useEffect(() => {
    (async () => {
      const { data } = await client.query({ query: GET_CATEGORY_PRODUCTS, variables: { query: queryString } })
      console.log(data)
      let allProducts: any[] = []
      if (data.collections.nodes.length > 1) {
        const {title, description} = data.collections.nodes[0]
        setCollection({title, description})
      }

      data.collections.nodes.forEach((c: any) => {
        allProducts = [...allProducts, ...c.products.nodes]
      })

      
      setProducts(allProducts)
    })()
  }, [])


  return (
    <>
      <div className='pt-12' >
        {/* Mobile filter dialog */}
        <MobileCategoryOptions
          filters={filters}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />
        {/* bread crumbs */}
        {/* <div className="border-b border-gray-200">
          <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol role="list" className="flex items-center space-x-4 py-4">
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </a>
                    <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                      <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  New Arrivals
                </a>
              </li>
            </ol>
          </nav>
        </div> */}

        {!products ? <Spinner /> :
          <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
            <div className="border-b border-gray-200 pb-10 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">{collection.title}</h1>
              <p className="mt-4 text-base text-gray-500">{collection.description}</p>
            </div>

            <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">

              <DesktopCategoryOptions mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters} />
              <ProductsGrid products={products} />
            </div>
          </main>
        }
      </div>
    </>
  )
}
