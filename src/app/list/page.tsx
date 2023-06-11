import { Post } from "@/util";
import { connectDB } from "@/util/database"
import ListItem from "../components/ListItem";

export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능


export default async function List(tag:string) {
    const db = (await connectDB).db('ha0peno')
    const posts = await db.collection('post').find({ tags: tag }).toArray();
      
    const newResult:Post[] = posts.map(r => {
        const rest = r as Post;
        return { ...rest, _id: r._id.toString() } 
    })


    return (
        <>
            <ListItem posts={newResult} />
        </>
    )
}