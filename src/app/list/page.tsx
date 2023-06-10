import { connectDB } from "@/util/database"
import ListItem from "./ListItem"


export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

type Result = {
    _id: string
}
export default async function List() {
    const db = (await connectDB).db('ha0peno')
    let result = await db.collection('post').find().toArray()

    console.log('result', result)
    
    

    const newResult = result.map(r => {
        return { ...r, _id: r._id.toString() }
    })


    return (
        <>
            <ListItem posts={newResult} />
        </>
    )
}