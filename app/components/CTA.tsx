"use client"
import { useState } from "react"
import NewsletterSignupModal from "./newsletter-signup-confirm"
import useFormSubmit from "@/lib/utils/handleNewsletterSignup"

export default function CTA() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const handleSubmit = useFormSubmit(setModalOpen, setLoading)

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()
  //   setModalOpen(true)
  //   setLoading(true)
  //   const form = e.target as HTMLFormElement
  //   //@ts-ignore
  //   const email: string = form.children[0].children[1].value

  //   axios.post("/api/newsletter", { email })
  //   .then((response:any) => {
  //     console.log(response)
  //     setLoading(false)
  //   })



  //   //@ts-ignore
  //   e.target.reset()
  // }

  return (
    <div className="bg-secondary-light py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <h2 className="inline sm:block lg:inline xl:block">Want product news and updates?</h2>{' '}
          <p className="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
        </div>
        <form
          className="w-full max-w-md lg:col-span-5 lg:pt-2"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-primary py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-900">
            We care about your data. Read our{' '}
            <a href="#" className="font-semibold text-primary hover:underline">
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>

      <NewsletterSignupModal open={modalOpen} setOpen={setModalOpen} loading={loading}/>
    </div>
  )
}

