import Image from "next/image"
import Link from "next/link"

const collections = [
    {
      name: 'Salves',
      description: 'Moisturize, heal, and protect',
      imageSrc: '/salve-placeholder.png',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      slug: 'salves',
      height: 500,
      width: 500
    },
    {
      name: 'Oils',
      description: 'Small batch extracts',
      imageSrc: '/oil-placeholder.jpeg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      slug: 'oils',
      height: 500,
      width: 500
    },
    {
      name: 'Teas',
      description: 'Herbal medicines',
      imageSrc: '/tea-placeholder.jpeg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      slug: 'teas',
      height: 500,
      width: 500
    },
  ]
  
  export default function Collections() {
    return (
      <div className="bg-primary-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {collections.map((collection) => (
                <div key={collection.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-secondary-light group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <Image
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      className="h-full w-full object-cover object-center"
                      height={collection.height}
                      width={collection.width}
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-white">
                    <Link href={`/categories/q?collections=${collection.slug}`}>
                      <span className="absolute inset-0" />
                      {collection.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{collection.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }