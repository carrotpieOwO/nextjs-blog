import Tag from "@/app/components/common/Tag"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Post } from "@/util"
import { connectDB } from "@/util/database"
import dayjs from "dayjs"
import { ObjectId, WithId } from "mongodb"
import { getServerSession } from "next-auth"
import Link from "next/link"
import DeleteBtn from "./DeleteBtn"
import PrevNext from "./PrevNext"
import Toc from "./Toc"

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
        <div className="p-5 sm:p-10 md:p-20 lg:p-30 mx-auto max-w-6xl">
            <div className="flex items-center mb-7">
            {
                result.tags?.map( tag =>
                    <Tag key={tag} type="md">{tag}</Tag>
                )
            }
            </div>
            <h4 className="font-semibold text-4xl mb-5">{result.title}</h4>
            <div className="flex items-center justify-between pb-7 mb-16 border-b border-gray-400">
                <p className="text-sm sm:text-md text-gray-500">{dayjs(result.createdTime).format('YYYY. MM. DD.')}</p>
                <div className="flex gap-3">
                    <p className="text-sm sm:text-md text-gray-500">by. {result.author}</p>
                    {
                        session?.user?.name === 'carrotpieOwO' &&
                        <>
                            <Link href={`/edit/${params.id}`}>수정</Link>
                            <DeleteBtn deleteId={params.id} images={result.images}/>
                        </>
                    }
                </div>
            </div>
            
            {/* <Content html={result!.content}/> */}
            <div className="prose max-w-none " dangerouslySetInnerHTML={{__html: result!.content}} />
            <Toc htmlString={result!.content} />
            
            <div className="flex justify-between gap-3">
                {
                    prevPost &&  <PrevNext url={`/detail/${prevPost._id}`} content={prevPost.title} direction="left" />
                }
                {
                    nextPost &&  <PrevNext url={`/detail/${nextPost._id}`} content={nextPost.title} direction="right" />
                }
            </div>
        </div>
    )
}