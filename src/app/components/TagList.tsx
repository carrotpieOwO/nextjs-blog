import Link from "next/link"

interface Props {
    tags: string[]
}
export default function TagList({ tags }:Props) {
    return (
        <div className="flex justify-center mb-10">
            <Link href='/' className="bg-pink-100 text-pink-500 text-xs font-medium mr-2 px-3 py-1.5 rounded">All</Link>
            {
                tags.map(tag => 
                    <Link key={tag} href={`/list/${tag}`}
                        className="bg-pink-100 text-pink-500 text-xs font-medium mr-2 px-3 py-1.5 rounded"
                    >
                    {tag}
                    </Link>
                )
            }
        </div>
    )
}