import { Post } from "@/util"
import { connectDB } from "@/util/database"
import { ObjectId, WithId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        const db = (await connectDB).db('ha0peno')
        const result:WithId<Post> | null = await db.collection<Post>('post').findOne({ _id: new ObjectId(req.query.id as string) })
            
        console.log('result', result)
        if(result) {
            return res.status(200).json(result)
        } else {
            return res.status(204).json('없음')
        }
        
    } catch (error) {
        return res.status(500).json('error')        
    }
}