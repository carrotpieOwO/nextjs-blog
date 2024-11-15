import ListItem from "@/app/components/ListItem";
import TagList from "@/app/components/TagList";
import { Post, TagObj } from "@/util";
import { connectDB } from "@/util/database"
import { Metadata } from "next";

export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

type Props = {
    params: { search: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const search = decodeURIComponent(params.search)
    return {
        title: search,
        description: `Front-end 기술블로그 검색: ${search}`,
        openGraph: {
            title: search,
            description: `Front-end 기술블로그 검색: ${search}`,
        }
    };
}

export default async function List({params}:Props) {
    const db = (await connectDB).db('ha0peno')
    const search = decodeURIComponent(params.search)
    const query = [{
        $search: {
            index: 'search',
            text: {
                query: search,
                path: ['title', 'content']
            }
        }
      },
    ];

    const posts = await db.collection<Post>('post').aggregate(query).sort({ createdTime: -1 }).toArray()

    const newResult:Post[] = posts.map(r => {
        const rest = r as Post;
        return { ...rest, _id: r._id.toString() } 
    })


    return (
        <div className="py-10 px-4 sm:p-10 md:p-20 lg:p-30 bg-pink-50 dark:bg-gray-900 min-h-[calc(100vh-66px)]">
            <div className="text-center mb-14">
                <div className="text-5xl font-extrabold mb-4">ha0 log</div>
                <p className="text-center text-gray-600">~살아남기 위한 고군분투를 기록하다~</p>
            </div>
            <div className='lg:px-20 xl:px-0 max-w-7xl mx-auto'>
                <h1 className="text-center mb-16 text-2xl sm:text-6xl text-pink-500 font-bold">&quot;{ search }&quot; ( { newResult.length } )</h1>
                {
                    newResult.length > 0 ? 
                    <ListItem posts={newResult} />
                    :
                    <div className="text-center grid h-[calc(100vh-520px)] sm:h-[calc(100vh-500px)]">
                        <div className="my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600 text-pink-200 mx-auto">
                                <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                                <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                                <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                            </svg>
                            <p className="mt-10">검색결과가 없습니다.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}