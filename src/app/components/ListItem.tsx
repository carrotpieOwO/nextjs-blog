'use client'

import { Post } from "@/util";
import dayjs from "dayjs";
import Link from "next/link";
import Tag from "./common/Tag";

interface Props {
    posts: Post[]
}

function parseContentFromHTML(html:string) {
    // 태그를 제외한 컨텐트만 추출하는 정규식 패턴
    const pattern = /<[^>]*>/g;
    // HTML 문자열에서 태그를 제외한 컨텐트 추출
    const content = html.replace(pattern, '');
    return content;
}

export default function ListItem({posts}: Props) {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {
                posts.map( post =>
                    <Link key={post._id as string} href={`/detail/${post._id}`}>
                        <div className="relative bg-white dark:bg-gray-800 pb-10 shadow-md ring-1 ring-gray-900/5 sm:mx-auto md:max-w-lg sm:rounded-lg duration-300 hover:scale-105">
                            {
                                post.thumbnail && 
                                <div className="bg-cover bg-no-repeat bg-center h-64" style={{backgroundImage: `url(${post.thumbnail})`}}></div>
                            }
                            <div className="mx-auto pt-5 px-4 md:px-10 ">
                                <div className="text-base font-semibold leading-7">
                                    <div className="flex">
                                    {
                                        post.tags?.map(tag => 
                                            <Tag type="md" key={`${post._id}-${tag}`}>{tag}</Tag>
                                        )
                                    }
                                    </div>
                                    <h2 className="text-gray-900 dark:text-white text-xl my-3">{post.title}</h2>
                                    <div className="text-gray-500 font-normal mb-5 leading-normal text-ellipsis overflow-hidden line-clamp-3 h-18">
                                        {
                                            parseContentFromHTML(post.content)
                                        }
                                    </div>
                                    <p className="text-gray-500 font-light text-sm">{dayjs(post.createdTime).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                        </div>
                            
                    </Link> 
                )
            }
        </div>
    )
}