import { Post, TagObj } from "@/util";
import { connectDB } from "@/util/database";
import { WithId } from "mongodb";
import ListItem from "../components/ListItem";
import TagList from "../components/TagList";

export default async function Blog () {
    const db = (await connectDB).db('ha0peno')
    const result:WithId<Post>[] = await db.collection<Post>('post').find().toArray()
    const uniqueTags = await db.collection('post').distinct('tags');
  
    const newResult = result.map(r  => {
        return { ...r, _id: r._id.toString() }
    })  
  
    let tagObj:TagObj[] = [
      {
        name: 'All',
        length: result.length,
        url: '/blog'
      }
    ]
  
    for (const tag of uniqueTags) {
        const length = await db.collection('post').countDocuments({ tags: tag });
        tagObj.push({ name: tag, length, url:`/blog/tag/${tag}` });
    }
  
  
    return (
      <main className="py-10 px-4 sm:p-10 md:p-20 lg:p-30 bg-pink-50 dark:bg-gray-900 transition-colors duration-300 ease-out">
        <div className="text-center mb-20">
          <div className="text-5xl font-extrabold mb-4">ha0peno</div>
          <p className="text-center text-gray-600">~살아남기 위한 고군분투를 기록하다~</p>
        </div>
        <div className='lg:px-20 xl:px-0 max-w-7xl mx-auto'>
          <TagList tags={tagObj} selectedTag='All' />  
          <ListItem posts={newResult} />
        </div>
      </main>
    )
}