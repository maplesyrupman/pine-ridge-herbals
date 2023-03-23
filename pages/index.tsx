import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Pine Ridge Herbals</h1>
            <button>
                <Link href='/test'>Go to Test Page</Link>
            </button>
        </div>
    )
}