import Link from "next/link";

export default function CustomHerbsCTA() {
    return (
        <div className='flex flex-col gap-3'>
            <p>
                We make custom herbal formulas for your specific needs!
            </p>
            <button
                type="button"
                className="rounded-md bg-primary px-2.5 py-1.5 text-sm  font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <Link href="/custom-herbs">
                    Learn More
                </Link>
            </button>
        </div>
    )
}