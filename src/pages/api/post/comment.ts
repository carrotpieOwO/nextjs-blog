import { connectDB } from "@/util/database"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        if (req.body.title === '' || req.body.content === '') {
            return res.status(500).json('내용없음')
        }

        // ip 얻기

        try {
            const db = (await connectDB).db('ha0peno')
            let result = await db.collection('comment').insertOne(req.body)    

            console.log('new  id', result.insertedId)
            return res.status(200).json('success')

        } catch (error) {
            return res.status(500).json(error)  
        }
    }
}