import { Post } from "@/util";
import { connectDB } from "@/util/database"
import { WithId } from "mongodb";
import ListItem from './components/ListItem';
export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

export default async function Home() {

  const db = (await connectDB).db('ha0peno')
  const result:WithId<Post>[] = await db.collection<Post>('post').find().toArray()
  const uniqueTags = await db.collection('post').distinct('tags');
  const posts = await db.collection('post').find({ tags: 'tags' }).toArray();

  console.log('tags', uniqueTags)
  console.log('postss', posts)
  const newResult = result.map(r  => {
      return { ...r, _id: r._id.toString() }
  })

  return (
    <main className="p-10 md:p-20 lg:p-30">
      <div className='lg:px-20 xl:px-0 max-w-7xl mx-auto'>
        <ListItem posts={newResult} />
      </div>
    </main>
  )
}
