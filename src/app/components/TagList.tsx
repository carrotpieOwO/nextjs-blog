import Link from "next/link"
import Tag from "./common/Tag"
import TagBtn from "./TagBtn"

interface Props {
    tags: string[]
}
export default function TagList({ tags }:Props) {
    return (
        <div className="flex justify-center mb-10 gap-2">
            {/* <Link href='/'> */}
                {/* <Tag type="lg">All</Tag> */}
                <TagBtn url='/' text='all' />
            {/* </Link> */}
            {
                tags.map(tag => 
                    <TagBtn key={ tag } url={`/list/${tag}`} text={ tag }/>
                    // <Link key={tag} href={`/list/${tag}`}>
                    //     <Tag type="lg">{tag}</Tag>
                    // </Link>
                )
            }
        </div>
    )
}