import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        if (req.body.title === '' || req.body.content === '') {
            return res.status(500).json('내용없음')
        }

        let session = await getServerSession(req, res, authOptions) // 현재 접속한 세션 정보

        if(!session || session.user?.name !== 'carrotpieOwO') {
            return res.status(401).json('권한없음')
        } else {
            req.body.author = session.user?.email
        }

        try {
            const db = (await connectDB).db('ha0peno')
            let result = await db.collection('post').updateOne(
                {_id: new ObjectId(req.body._id)}, 
                {$set: {title: req.body.title, content: req.body.content, tags: req.body.tags, thumbnail: req.body.thumbnail }}
            )    

            console.log('result', result)
            return res.status(200).json('success')

           // return

        } catch (error) {
            return res.status(500).json(error)  
        }
    }
}