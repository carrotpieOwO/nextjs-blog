import ListItem from "@/app/components/ListItem";
import TagList from "@/app/components/TagList";
import { Post, TagObj } from "@/util";
import { connectDB } from "@/util/database"

export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

type Props = {
    params: { search: string }
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

      
    const posts = await db.collection<Post>('post').aggregate(query).toArray()

    const newResult:Post[] = posts.map(r => {
        const rest = r as Post;
        return { ...rest, _id: r._id.toString() } 
    })


    return (
        <div className="p-4 sm:p-10 md:p-20 lg:p-30 bg-pink-50 dark:bg-gray-900 min-h-[calc(100vh-83px)]">
            <div className="text-center mb-10">
                <div className="text-5xl font-extrabold mb-4">ha0 log</div>
                <p className="text-center text-gray-600">~살아남기 위한 고군분투를 기록하다~</p>
            </div>
            <div className='lg:px-20 xl:px-0 max-w-7xl mx-auto'>
                <h1 className="text-center mb-10 text-6xl text-pink-500 font-bold">&quot;{ search }&quot;</h1>
                <ListItem posts={newResult} />
            </div>
        </div>
    )
}