import ListItem from "@/app/components/ListItem";
import TagList from "@/app/components/TagList";
import { Post, TagObj } from "@/util";
import { connectDB } from "@/util/database"
import { Metadata } from "next";

export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

type Props = {
    params: { tag: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
      title: params.tag,
      description: `Front-end 기술블로그 태그 검색: ${params.tag}`,
    };
}

export default async function List({params}:Props) {
    const db = (await connectDB).db('ha0peno')
    const posts = await db.collection('post').find({ tags: params.tag }).toArray();
    const uniqueTags = await db.collection('post').distinct('tags');

    const newResult:Post[] = posts.map(r => {
        const rest = r as Post;
        return { ...rest, _id: r._id.toString() } 
    })

    const totalPosts = await db.collection('post').countDocuments();
    let tagObj:TagObj[] = [
        {
        name: 'All',
        length: totalPosts,
        url: '/blog'
        }
    ]

    for (const tag of uniqueTags) {
        const length = await db.collection('post').countDocuments({ tags: tag });
        tagObj.push({ name: tag, length, url:`/blog/tag/${tag}` });
    }


    return (
        <div className="p-4 sm:p-10 md:p-20 lg:p-30 bg-pink-50 dark:bg-gray-900 min-h-[calc(100vh-74px)]">
            <div className="text-center mb-20">
                <div className="text-5xl font-extrabold mb-4">ha0 log</div>
                <p className="text-center text-gray-600">~살아남기 위한 고군분투를 기록하다~</p>
            </div>
            <div className='lg:px-20 xl:px-0 max-w-7xl mx-auto'>
                <TagList tags={tagObj} selectedTag={ params.tag } />  
                <ListItem posts={newResult} />
            </div>
        </div>
    )
}