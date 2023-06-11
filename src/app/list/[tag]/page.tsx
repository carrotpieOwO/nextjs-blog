import ListItem from "@/app/components/ListItem";
import TagList from "@/app/components/TagList";
import { Post } from "@/util";
import { connectDB } from "@/util/database"

export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

type Props = {
    params: { tag: string }
}

export default async function List({params}:Props) {
    const db = (await connectDB).db('ha0peno')
    const posts = await db.collection('post').find({ tags: params.tag }).toArray();
    const uniqueTags = await db.collection('post').distinct('tags');

    const newResult:Post[] = posts.map(r => {
        const rest = r as Post;
        return { ...rest, _id: r._id.toString() } 
    })


    return (
        <div className="p-4 sm:p-10 md:p-20 lg:p-30">
            <div className='lg:px-20 xl:px-0 max-w-7xl mx-auto'>
                <TagList tags={uniqueTags} />  
                <ListItem posts={newResult} />
            </div>
        </div>
    )
}