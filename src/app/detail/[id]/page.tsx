import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Post } from "@/util"
import { connectDB } from "@/util/database"
import { ObjectId, WithId } from "mongodb"
import { getServerSession } from "next-auth"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"

type DetailProps = {
    params: { id: string }
}

export default async function Detail({params} : DetailProps) {
    let session = await getServerSession(authOptions) // 현재 접속한 세션 정보

    const db = (await connectDB).db('ha0peno')
    const result:WithId<Post> | null = await db.collection<Post>('post').findOne({ _id: new ObjectId(params.id) })
    
    
    const prevPost = await db.collection<Post>('post').findOne({ createdTime: { $lt: result!.createdTime } }, { projection: { _id: 1, title: 1 }, sort: { createdTime: -1 } });    
    const nextPost = await db.collection<Post>('post').findOne({ createdTime: { $gt: result!.createdTime } }, { projection: { _id: 1, title: 1 }, sort: { createdTime: 1 } });

    if (!result) {
        return false
    }

    return (
        <div className="p-10 md:p-20 lg:p-30 mx-auto max-w-6xl">
            <h4>{result.title}</h4>
            {
                result.tags?.map( tag =>
                    <span key={tag}>{tag}</span>
                )
            }
            <div className="flex justify-between">
                <p>{result.createdTime}</p>
                <div className="flex gap-3">
                    <p>{result.author}</p>
                    {
                        session?.user?.name === 'carrotpieOwO' &&
                        <>
                            <Link href={`/edit/${params.id}`}>수정</Link>
                            <DeleteBtn deleteId={params.id} images={result.images}/>
                        </>
                    }
                </div>
            </div>
            
            <div dangerouslySetInnerHTML={{__html: result!.content}} />
            
            <div className="flex justify-between">
                {
                    prevPost && <Link href={`/detail/${prevPost._id}`}>{ prevPost.title }</Link>
                }
                {
                    nextPost && <Link href={`/detail/${nextPost._id}`}>{ nextPost.title }</Link>
                }
            </div>
        </div>
    )
}