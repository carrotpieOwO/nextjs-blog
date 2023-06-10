'use client'

import Image from "next/image";
import Link from "next/link";

type DataType = {
    posts: {
        _id: string,
        title: string,
        content: string,
        thumbnail: string,
        tags: string[],
        createdTime: string
    }[]
}



export default function ListItem({posts}: DataType) {
    console.log('posts', posts)
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {
                posts.map( post =>
                    <Link key={post._id} href={`/detail/${post._id}`}>
                        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto md:max-w-lg sm:rounded-lg sm:px-10">
                            {
                                post.thumbnail && <Image src={post.thumbnail} alt="" width={300} height={300}/>
                            }
                            <div className="mx-auto max-w-md">
                                <div className="divide-y divide-gray-300/50">
                                    <div className="pt-8 text-base font-semibold leading-7">
                                        {
                                            post.tags?.map(tag => 
                                                <p key={`${post._id}-${tag}`}>{tag}</p>
                                            )
                                        }
                                        <p>{post.createdTime}</p>
                                        <p className="text-gray-900">{post.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                    </Link> 
                )
            }
        </div>
    )
}