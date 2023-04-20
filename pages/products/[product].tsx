import { useEffect, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import {
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout'
import SuggestedProducts from '@/components/suggested-products'
import Image from 'next/image'

const product = {
  name: 'Power Plant Aid',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: '/salve-placeholder.png',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  variants: [
    {
      size: '4oz',
      price: '$20'
    },
    {
      size: '9oz',
      price: '$35'
    }
  ],
  description: `
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem architecto obcaecati ipsa illo veritatis facilis enim nobis accusantium repellendus. Rerum fugit nihil eum, distinctio tempora iste fuga, impedit harum sapiente debitis, optio cumque suscipit commodi sunt. Assumenda magnam labore, sequi in eligendi perferendis nobis facilis repellendus. Odio quis deleniti amet!</p>
  `,
  details: [
    {
      name: 'Ingredients',
      items: [
        'Plantain',
        'Coconut Oil',
        'Baking Soda'
      ],
    },
    // More sections...
  ],
}
const relatedProducts = [
  {
    id: 1,
    name: 'Saint Sunshine',
    color: 'White and black',
    href: '/products/saint-sunshine',
    imageSrc: '/salve-placeholder.png',
    imageAlt: 'Saint Sunshine salve',
    price: '$20',
  },
  // More products...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  function changeSize(value: string) {
    const variant = product.variants.find(variant => variant.size === value) || product.variants[0]
    setSelectedVariant(variant)
  }

  const [testState, setTestState] = useState({})

  // useEffect(() => {
  //   (async () => {
  //     const products = await Swell.products.list({
  //       limit: 10, 
  //       page: 1
  //     })
  //     setTestState(products)
  //   })()

  // },[])
  console.log(testState)
  return (
    <Layout>
      <div className='pt-32'>
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            {/* Product */}
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {product.images.map((image) => (
                      <Tab
                        key={image.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-background text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only"> {image.name} </span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <Image src={image.src} alt="" className="h-full w-full object-cover object-center" height={500} width={500} />
                            </span>
                            <span
                              className={classNames(
                                selected ? 'ring-indigo-500' : 'ring-transparent',
                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                  {product.images.map((image) => (
                    <Tab.Panel key={image.id}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                        width={500}
                        height={500}
                      />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">{selectedVariant.price}</p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                <form className="mt-6">
                  <div>
                    <h3 className="text-sm text-gray-600">Size</h3>

                    <RadioGroup value={selectedVariant.size} onChange={changeSize} className="mt-2">
                      <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.variants.map(({ size }) => (
                          <RadioGroup.Option
                            key={size}
                            value={size}
                            className={({checked }) => `${checked ? 'ring-[2px]' : ''} ring-black relative -m-0.5 flex cursor-pointer items-center justify-center rounded p-0.5 focus:outline-none`}
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {size}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className='h-8 w-8 flex items-center justify-center'
                            >{size}</span>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mt-10 flex">
                    <button
                      type="submit"
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      Add to bag
                    </button>
                  </div>
                </form>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="divide-y divide-gray-200 border-t">
                    {product.details.map((detail) => (
                      <Disclosure as="div" key={detail.name}>
                        {({ open }) => (
                          <>
                            <h3>
                              <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                <span
                                  className={classNames(
                                    open ? 'text-primary' : 'text-gray-900',
                                    'text-sm font-medium'
                                  )}
                                >
                                  {detail.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                              <ul role="list">
                                {detail.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            <SuggestedProducts products={relatedProducts} />

          </div>
        </main>
      </div>
    </Layout>
  )
}
