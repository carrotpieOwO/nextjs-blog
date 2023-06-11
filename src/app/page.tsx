import { Post } from "@/util";
import { connectDB } from "@/util/database"
import { WithId } from "mongodb";
import ListItem from './components/ListItem';
import TagList from "./components/TagList";
export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

export default async function Home() {

  const db = (await connectDB).db('ha0peno')
  const result:WithId<Post>[] = await db.collection<Post>('post').find().toArray()
  const uniqueTags = await db.collection('post').distinct('tags');

  const newResult = result.map(r  => {
      return { ...r, _id: r._id.toString() }
  })

  return (
    <main className="p-4 sm:p-10 md:p-20 lg:p-30">
      <div className='lg:px-20 xl:px-0 max-w-7xl mx-auto'>
        <TagList tags={uniqueTags} />  
        <ListItem posts={newResult} />
      </div>
    </main>
  )
}
