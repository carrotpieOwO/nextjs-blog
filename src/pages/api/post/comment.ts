import { connectDB } from "@/util/database"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    

    if(req.method === 'POST') {
        // if (req.body.title === '' || req.body.content === '') {
        //     return res.status(500).json('내용없음')
        // }

        const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.socket.remoteAddress
      
            req.body.ip = ip;
            return res.status(200).json(ip)
        }

        //return res.status(200).json('success')

        // try {
        //     const db = (await connectDB).db('ha0peno')
        //     let result = await db.collection('guestbook').insertOne(req.body)    

        //     console.log('new  id', result.insertedId)
        //     return res.status(200).json('success')

        // } catch (error) {
        //     return res.status(500).json(error)  
        // }
    }
