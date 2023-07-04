import { connectDB } from "@/util/database"
import { NextApiRequest, NextApiResponse } from "next"

const geoip = require('geoip-lite');

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    

    if(req.method === 'POST') {
        if (req.body.title === '' || req.body.content === '') {
            return res.status(500).json('내용없음')
        }

        const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.socket.remoteAddress
      
        const geo = geoip.lookup(ip);
        const countryCode = geo ? geo.country : null;
        
        console.log('ip', ip, countryCode)

        if (countryCode !== 'KR') {
            return res.status(401).json('한국아님')
        } else {
            req.body.ip = ip;
            return res.status(200).json(ip)
        }

        //return res.status(200).json('success')

        // try {
        //     const db = (await connectDB).db('ha0peno')
        //     let result = await db.collection('comment').insertOne(req.body)    

        //     console.log('new  id', result.insertedId)
        //     return res.status(200).json('success')

        // } catch (error) {
        //     return res.status(500).json(error)  
        // }
    }
}