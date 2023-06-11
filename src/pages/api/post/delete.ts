import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'DELETE') {
        console.log('req', req.query)

        const id = req.query.id as string;

        let session = await getServerSession(req, res, authOptions) // 현재 접속한 세션 정보

        if(!session || session.user?.name !== 'carrotpieOwO') {
            return res.status(401).json('권한없음')
        } 

        try {
            const db = (await connectDB).db('ha0peno')
            
            let result = await db.collection('post').deleteOne({_id: new ObjectId(id)})    

            console.log('result', result)
            
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)  
        }
    }
}