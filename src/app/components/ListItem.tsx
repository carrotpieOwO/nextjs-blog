'use client'

import { Post } from "@/util";
import PostCard from "./PostCard";

interface Props {
    posts: Post[]
}

export default function ListItem({posts}: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {
                posts.map( post =>
                   <PostCard post={post} key={post._id as string}/>
                )
            }
        </div>
    )
}