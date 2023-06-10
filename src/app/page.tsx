import { connectDB } from "@/util/database"
import ListItem from './components/ListItem';
export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

type Result = {
  _id: string
}
export default async function Home() {

  const db = (await connectDB).db('ha0peno')
  let result = await db.collection('post').find().toArray()

  console.log('result', result)
  
  

  const newResult = result.map(r => {
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
