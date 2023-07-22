import { BsTreeFill } from 'react-icons/bs'
import { FaHandSparkles, FaRecycle } from 'react-icons/fa'
import Image from 'next/image'

const cards = [
  {
    name: 'Wild Crafted',
    description: 'Consectetur vel non. Rerum ut consequatur nobis unde. Enim est quo corrupti consequatur.',
    icon: BsTreeFill,
  },
  {
    name: 'Hand Made',
    description: 'Quod possimus sit modi rerum exercitationem quaerat atque tenetur ullam.',
    icon: FaHandSparkles,
  },
  {
    name: 'Sustainable',
    description: 'Ratione et porro eligendi est sed ratione rerum itaque. Placeat accusantium impedit eum odit.',
    icon: FaRecycle,
  },
]

export default function AboutHeader() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <Image
        src="/about-hero.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        height={4924}
        width={3283}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-secondary sm:text-6xl">Pine Ridge Herbals</h2>
          <div className='relative'>
            <div className='absolute inset-0 opacity-70 bg-secondary z-10 rounded-xl' />
            <p className="relative mt-6 text-lg leading-8 text-black z-50 opacity-100 p-6">
              Welcome to Pine Ridge Herbals, where all our products are handcrafted and
              wildcrafted with loving intention for you to heal. Our personalized support is tailored to
              your unique needs using the incredible power of nature. We're firm believers in the
              healing powers of Mother Earth, and we're committed to serving you in every way
              possible. Let us take you on a journey back to nature!
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div key={card.name} className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
              <card.icon className="h-7 w-5 flex-none text-secondary-light" aria-hidden="true" />
              <div className="text-base leading-7">
                <h3 className="font-semibold text-secondary-light">{card.name}</h3>
                <p className="mt-2 text-white">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
