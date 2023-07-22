import {BsTreeFill} from 'react-icons/bs'
import {FaHandSparkles, FaRecycle} from 'react-icons/fa'

const incentives = [
  {
    name: 'Wild Crafted',
    icon: BsTreeFill,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, magnam assumenda.",
  },
  {
    name: 'Handmade',
    icon: FaHandSparkles,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque assumenda veritatis quis. Voluptate, pariatur.",
  },
  {
    name: 'Low Waste',
    icon: FaRecycle,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, natus.",
  },
]

export default function Guarantee() {
  return (
    <div className="bg-secondary-light">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                We built our business on great customer service
              </h2>
              <p className="mt-4 text-gray-500">
                Pine Ridge Herbals - Experience the Power of Nature with our
                Wildcrafted Herbal Products, Expert Connections and Consultations,
                delivering holistic solutions for a healthier and happier you!
              </p>
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
              <img
                src="/guarantee-placeholder.jpeg"
                alt=""
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:flex-shrink-0">
                  <incentive.icon className="h-12 w-12 flex-none text-primary" aria-hidden="true" />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
