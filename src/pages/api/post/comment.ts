import { connectDB } from "@/util/database"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.socket.remoteAddress
        req.body.ip = ip;

        if( ip === '::1') {
            return res.status(200).json('로컬이어서 디비에 안올릴거임')
        }

        try {
            const db = (await connectDB).db('ha0peno')
            await db.collection('guestbook').insertOne(req.body)    

            return res.status(200).json('success')

        } catch (error) {
            return res.status(500).json(error)  
        }
    }
}
