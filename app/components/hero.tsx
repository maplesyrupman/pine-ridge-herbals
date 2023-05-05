import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {

  return (
    <div className="bg-gray-900 h-screen">

      <div className="relative isolate overflow-hidden pt-14 h-full flex items-center">
        <div className='absolute inset-0 -z-10'>
          <video
            autoPlay
            loop
            muted
            className=' w-auto min-h-screen min-w-screen max-w-none max-h-screen 2xl:w-screen'//h-screen
          >
            <source src='/trees-hero.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Coming soon: Pine Ridge University{' '}
              <a href="#" className="font-semibold text-white">
                <span className="absolute inset-0" aria-hidden="true" />
                Sign up now <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <Image src="/logo.jpg" height={100} width={300} alt='logo' />
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/categories"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get started
              </Link>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
