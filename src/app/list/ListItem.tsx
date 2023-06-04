'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"

type DataType = {
    posts: Record<string, string>[]
}

export default function ListItem({posts}: DataType) {
    console.log('posts', posts)
    return (
        <>
            {
                posts.map( post =>
                    <Link key={post._id} href={`/detail/${post._id}`}>
                        {
                            post.thumbnail && <Image src={post.thumbnail} alt="" width={300} height={300}/>
                        }
                        <div key={String(post._id)}>{post.title}</div>
                    </Link> 
                )
            }
        </>
    )
}