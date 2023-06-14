import Link from "next/link"
import Tag from "./common/Tag"

interface Props {
    tags: string[]
}
export default function TagList({ tags }:Props) {
    return (
        <div className="flex justify-center mb-10">
            <Link href='/'>
                <Tag type="lg">All</Tag>
            </Link>
            {
                tags.map(tag => 
                    <Link key={tag} href={`/list/${tag}`}>
                        <Tag type="lg">{tag}</Tag>
                    </Link>
                )
            }
        </div>
    )
}