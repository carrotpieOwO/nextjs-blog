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
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import hljs from 'highlight.js';
import 'highlight.js/styles/panda-syntax-dark.css';
import TagBtn from "@/app/components/TagBtn"
import NavigateBtn from "./NavigateBtn"
import Comment from "./Comment"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { removeHtmlTags } from "@/util/functions"

type DetailProps = {
    params: { id: string }
}
export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
    const url = 'https://ha0.work/api/get/detail?id=' + params.id;
    const data = await fetch(url).then((res) =>  res.json()).catch(err => notFound());
    
    return {
      title: data.title,
      description: removeHtmlTags(data.content).substring(0, 150),
      openGraph: {
        type: 'website',
        locale: 'ko_KR',
        siteName: 'ha0peno',
        title: data.title,
      }
    };
}

export default async function Detail({params} : DetailProps) {
    let session = await getServerSession(authOptions) // 현재 접속한 세션 정보
    const db = (await connectDB).db('ha0peno')
    let result:WithId<Post> | null;

    try {
        result = await(async () => {
            return await db.collection<Post>('post').findOne({ _id: new ObjectId(params.id) })            
        })();
        console.log('result', result)
        
        if (!result) {
            return notFound()
        }
    } catch (error) {
        return notFound()
    }


    const prevPost = await db.collection<Post>('post').findOne({ createdTime: { $lt: result!.createdTime } }, { projection: { _id: 1, title: 1 }, sort: { createdTime: -1 } });    
    const nextPost = await db.collection<Post>('post').findOne({ createdTime: { $gt: result!.createdTime } }, { projection: { _id: 1, title: 1 }, sort: { createdTime: 1 } });

    const dom = new JSDOM(result!.content);
    const { document } = dom.window;
    const headings = document.querySelectorAll("h1, h2, h3");
    document.querySelectorAll('pre').forEach((el:HTMLElement) => {
        hljs.highlightElement(el);
    });


    headings.forEach((heading: Element, index: number) => {
        heading.setAttribute("id", `heading-${index}`);

    });

    const modifiedHtmlString = dom.serialize();

    return (
        <main className="bg-pink-50 dark:bg-gray-900 sm:pt-10 pb-20 sm:px-10 h-fit">
            <div className="mt-5 py-2 px-5 sm:p-10 md:p-20 lg:p-30 mx-auto max-w-4xl h-fit relative bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <div className="hidden xl:block absolute h-[calc(100%-250px)] top-[250px] right-[-300px] max-w-xs">
                    <Toc htmlString={ modifiedHtmlString } />
                </div>
                <div className="flex gap-2 items-center mb-7">
                {
                    result!.tags?.map( tag =>
                        <TagBtn key={tag} url={`/blog/tag/${tag}`} text={ tag } />
                    )
                }
                </div>
                <h4 className="font-semibold text-4xl mb-5">{result!.title}</h4>
                <div className="flex items-center justify-between pb-7 mb-16 border-b border-gray-400">
                    <p className="text-sm sm:text-md text-gray-500">{dayjs(result!.createdTime).format('YYYY. MM. DD.')}</p>
                    <div className="flex gap-3">
                        <p className="text-sm sm:text-md text-gray-500">by. {result!.author}</p>
                        {
                            session?.user?.name === 'carrotpieOwO' &&
                            <>
                                <Link href={`/edit/${params.id}`}>수정</Link>
                                <DeleteBtn deleteId={params.id} images={result!.images}/>
                            </>
                        }
                    </div>
                </div>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pb-20 mb-20 border-b border-gray-300" dangerouslySetInnerHTML={{__html: modifiedHtmlString}} />
                <Comment />
            </div>
            <div className="w-[80%] sm:w-full mt-10 grid md:flex mx-auto max-w-4xl justify-stretch md:justify-between gap-3">
                {
                    nextPost &&  <PrevNext url={`/detail/${nextPost._id}`} content={nextPost.title} direction="left" />
                }
                {
                    prevPost &&  <PrevNext url={`/detail/${prevPost._id}`} content={prevPost.title} direction="right" />
                }
            </div>
            <div className="fixed bottom-10 hidden lg:grid 2xl:left-[calc(((100vw-1500px)/2)+1rem)] gap-5">
                <NavigateBtn type="pageUp" />
                <NavigateBtn type="back" />
            </div>
        </main>
    )
}